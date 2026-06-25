from __future__ import annotations

import json
import os
import sqlite3
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT_DIR = Path(__file__).resolve().parents[1]
BACKEND_DIR = Path(__file__).resolve().parent
DATA_DIR = BACKEND_DIR / "data"
DB_PATH = DATA_DIR / "kpick_quote.sqlite3"
LOG_PATH = DATA_DIR / "server.log"
SEED_PATH = BACKEND_DIR / "seed_products.json"
HOST = os.environ.get("KPICK_HOST", "127.0.0.1")
PORT = int(os.environ.get("KPICK_PORT", "8000"))


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    DATA_DIR.mkdir(exist_ok=True)

    with get_connection() as db:
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS products (
                sku TEXT PRIMARY KEY,
                category TEXT NOT NULL,
                name TEXT NOT NULL,
                packaging TEXT,
                carton TEXT,
                gauge TEXT,
                active INTEGER NOT NULL DEFAULT 1,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS quote_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                request_number TEXT NOT NULL UNIQUE,
                company TEXT,
                contact TEXT,
                email TEXT,
                mobile TEXT,
                notes TEXT,
                items_json TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            """
        )

    seed_products()


def write_log(message: str) -> None:
    DATA_DIR.mkdir(exist_ok=True)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with LOG_PATH.open("a", encoding="utf-8") as log_file:
        log_file.write(f"[{timestamp}] {message}\n")


def seed_products() -> None:
    if not SEED_PATH.exists():
        return

    now = datetime.now(timezone.utc).isoformat()
    categories = json.loads(SEED_PATH.read_text(encoding="utf-8-sig"))

    with get_connection() as db:
        db.execute("UPDATE products SET active = 0, updated_at = ?", (now,))
        for category in categories:
            category_name = category["category"]
            for item in category["items"]:
                db.execute(
                    """
                    INSERT INTO products (sku, category, name, packaging, carton, gauge, active, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, 1, ?)
                    ON CONFLICT(sku) DO UPDATE SET
                        category = excluded.category,
                        name = excluded.name,
                        packaging = excluded.packaging,
                        carton = excluded.carton,
                        gauge = excluded.gauge,
                        active = 1,
                        updated_at = excluded.updated_at
                    """,
                    (
                        item["sku"],
                        category_name,
                        item["name"],
                        item.get("packaging"),
                        item.get("carton"),
                        item.get("gauge"),
                        now,
                    ),
                )


def product_categories() -> list[dict]:
    with get_connection() as db:
        rows = db.execute(
            """
            SELECT sku, category, name, packaging, carton, gauge
            FROM products
            WHERE active = 1
            ORDER BY
                CASE category
                    WHEN 'Insulin Syringe' THEN 1
                    WHEN 'Single-Use Syringe' THEN 2
                    WHEN 'LDS Syringe' THEN 3
                    WHEN 'Pen Needles' THEN 4
                    ELSE 99
                END,
                name
            """
        ).fetchall()

    grouped: dict[str, list[dict]] = {}
    for row in rows:
        grouped.setdefault(row["category"], []).append(
            {
                "sku": row["sku"],
                "name": row["name"],
                "packaging": row["packaging"],
                "carton": row["carton"],
                "gauge": row["gauge"],
            }
        )

    return [
        {
            "id": slugify(category),
            "name": category,
            "items": items,
        }
        for category, items in grouped.items()
    ]


def slugify(value: str) -> str:
    return value.lower().replace(" ", "-")


def validate_quote(payload: dict) -> tuple[dict, list[dict]]:
    customer = payload.get("customer") or {}
    raw_items = payload.get("items") or []

    if not isinstance(customer, dict):
        raise ValueError("Customer details must be an object.")

    if not isinstance(raw_items, list) or not raw_items:
        raise ValueError("Select at least one product.")

    skus = [str(item.get("sku", "")).strip() for item in raw_items if isinstance(item, dict)]
    if not skus:
        raise ValueError("Selected products are missing SKU values.")

    placeholders = ",".join("?" for _ in skus)
    with get_connection() as db:
        product_rows = db.execute(
            f"SELECT sku, category, name, packaging, carton, gauge FROM products WHERE active = 1 AND sku IN ({placeholders})",
            skus,
        ).fetchall()

    products = {row["sku"]: dict(row) for row in product_rows}
    items: list[dict] = []

    for raw_item in raw_items:
        sku = str(raw_item.get("sku", "")).strip()
        product = products.get(sku)
        if not product:
            raise ValueError(f"Unknown product SKU: {sku}")

        try:
            quantity = int(raw_item.get("quantity", 1))
        except (TypeError, ValueError):
            quantity = 1

        items.append({**product, "quantity": max(1, quantity)})

    clean_customer = {
        "company": str(customer.get("company", "")).strip(),
        "contact": str(customer.get("contact", "")).strip(),
        "email": str(customer.get("email", "")).strip(),
        "mobile": str(customer.get("mobile", "")).strip(),
        "notes": str(customer.get("notes", "")).strip(),
    }

    return clean_customer, items


def create_quote(payload: dict) -> dict:
    customer, items = validate_quote(payload)
    created_at = datetime.now(timezone.utc).isoformat()

    with get_connection() as db:
        cursor = db.execute(
            """
            INSERT INTO quote_requests (request_number, company, contact, email, mobile, notes, items_json, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                "pending",
                customer["company"],
                customer["contact"],
                customer["email"],
                customer["mobile"],
                customer["notes"],
                json.dumps(items),
                created_at,
            ),
        )
        request_id = cursor.lastrowid
        request_number = f"KPQ-{datetime.now().strftime('%Y%m%d')}-{request_id:04d}"
        db.execute(
            "UPDATE quote_requests SET request_number = ? WHERE id = ?",
            (request_number, request_id),
        )

    return {
        "id": request_id,
        "request_number": request_number,
        "created_at": created_at,
        "customer": customer,
        "items": items,
    }


def list_quotes() -> list[dict]:
    with get_connection() as db:
        rows = db.execute(
            """
            SELECT id, request_number, company, contact, email, mobile, notes, items_json, created_at
            FROM quote_requests
            ORDER BY id DESC
            """
        ).fetchall()

    return [
        {
            "id": row["id"],
            "request_number": row["request_number"],
            "created_at": row["created_at"],
            "customer": {
                "company": row["company"] or "",
                "contact": row["contact"] or "",
                "email": row["email"] or "",
                "mobile": row["mobile"] or "",
                "notes": row["notes"] or "",
            },
            "items": json.loads(row["items_json"]),
        }
        for row in rows
    ]


class KPickHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)

    def do_GET(self) -> None:
        path = urlparse(self.path).path

        if path == "/api/health":
            self.send_json({"ok": True, "database": str(DB_PATH)})
            return

        if path == "/api/products":
            self.send_json({"categories": product_categories()})
            return

        if path == "/api/quote-requests":
            self.send_json({"quotes": list_quotes()})
            return

        super().do_GET()

    def do_POST(self) -> None:
        path = urlparse(self.path).path

        if path == "/api/quote-requests":
            try:
                payload = self.read_json()
                quote = create_quote(payload)
            except ValueError as error:
                self.send_json({"error": str(error)}, HTTPStatus.BAD_REQUEST)
                return
            except json.JSONDecodeError:
                self.send_json({"error": "Invalid JSON body."}, HTTPStatus.BAD_REQUEST)
                return

            self.send_json({"quote": quote}, HTTPStatus.CREATED)
            return

        self.send_error(HTTPStatus.NOT_FOUND)

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def log_message(self, format: str, *args) -> None:
        write_log(f"{self.address_string()} - {format % args}")

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(length)
        return json.loads(body.decode("utf-8"))

    def send_json(self, data: dict, status: HTTPStatus = HTTPStatus.OK) -> None:
        encoded = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(encoded)


def main() -> None:
    init_db()
    server = ThreadingHTTPServer((HOST, PORT), KPickHandler)
    write_log(f"K-Pick backend running at http://{HOST}:{PORT}/request.htm")
    write_log(f"SQLite DB: {DB_PATH}")
    server.serve_forever()


if __name__ == "__main__":
    main()
