import { readFileSync, createWriteStream, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';

const docsDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(docsDir, 'K-Pick-Website-App-Operations-Manual.md');
const outputPath = join(docsDir, 'K-Pick-Website-App-Operations-Manual.pdf');
const logoPath = join(docsDir, '..', 'img', 'KpickLogoDark.png');

const markdown = readFileSync(sourcePath, 'utf8');
const doc = new PDFDocument({
    size: 'A4',
    margin: 48,
    bufferPages: true,
    info: {
        Title: 'K-Pick Website App Operations Manual',
        Author: 'K-Pick Trading Corp',
        Subject: 'Website app operations, deployment, troubleshooting, and handoff documentation'
    }
});

doc.pipe(createWriteStream(outputPath));

const colors = {
    ink: '#152033',
    muted: '#5b6472',
    rule: '#d9dee8',
    accent: '#0b6b78',
    codeBg: '#f5f7fa'
};

let inCode = false;
let listBuffer = [];

function ensureSpace(height = 36) {
    if (doc.y + height > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
    }
}

function flushList() {
    for (const item of listBuffer) {
        ensureSpace(24);
        doc.fillColor(colors.ink).font('Helvetica').fontSize(9.8);
        doc.text(`* ${item}`, {
            indent: 12,
            hangingIndent: 10,
            lineGap: 2
        });
    }
    if (listBuffer.length) {
        doc.moveDown(0.35);
    }
    listBuffer = [];
}

function inlineCodeText(text) {
    return text.replace(/`([^`]+)`/g, '$1');
}

function drawTitlePage() {
    if (existsSync(logoPath)) {
        doc.image(logoPath, 48, 42, { width: 165 });
        doc.moveDown(4);
    }

    doc.fillColor(colors.accent).font('Helvetica-Bold').fontSize(24)
        .text('K-Pick Website App', { lineGap: 4 });
    doc.fontSize(18).text('Operations Manual');
    doc.moveDown(0.7);
    doc.fillColor(colors.muted).font('Helvetica').fontSize(10)
        .text('Complete handoff documentation for running, troubleshooting, and maintaining the website, quote/PO workflow, staff dashboard, Railway deployment, SQLite database, inventory sync, and PDF generation.');
    doc.moveDown(1.2);
    doc.moveTo(48, doc.y).lineTo(doc.page.width - 48, doc.y).strokeColor(colors.rule).stroke();
    doc.moveDown(1);
    doc.fillColor(colors.ink).fontSize(10)
        .text('Generated: 2026-05-10')
        .text('Project folder: C:\\WebDraft')
        .text('Primary runtime: Node.js 24+');
    doc.addPage();
}

drawTitlePage();

for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
        flushList();
        inCode = !inCode;
        if (!inCode) {
            doc.moveDown(0.55);
        }
        continue;
    }

    if (inCode) {
        ensureSpace(18);
        const x = doc.x;
        const y = doc.y;
        const text = line || ' ';
        doc.roundedRect(x - 4, y - 2, doc.page.width - doc.page.margins.left - doc.page.margins.right + 8, 15, 2)
            .fill(colors.codeBg);
        doc.fillColor(colors.ink).font('Courier').fontSize(8.5).text(text, x, y, {
            lineGap: 1
        });
        continue;
    }

    if (!line.trim()) {
        flushList();
        doc.moveDown(0.25);
        continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
        flushList();
        const level = heading[1].length;
        const text = inlineCodeText(heading[2]);
        ensureSpace(level === 1 ? 80 : 44);
        if (level === 1) {
            doc.fillColor(colors.accent).font('Helvetica-Bold').fontSize(20).text(text);
            doc.moveDown(0.4);
        } else if (level === 2) {
            doc.moveDown(0.35);
            doc.fillColor(colors.accent).font('Helvetica-Bold').fontSize(14).text(text);
            doc.moveTo(48, doc.y + 2).lineTo(doc.page.width - 48, doc.y + 2).strokeColor(colors.rule).stroke();
            doc.moveDown(0.65);
        } else {
            doc.fillColor(colors.ink).font('Helvetica-Bold').fontSize(11.5).text(text);
            doc.moveDown(0.2);
        }
        continue;
    }

    const bullet = line.match(/^-\s+(.+)$/);
    if (bullet) {
        listBuffer.push(inlineCodeText(bullet[1]));
        continue;
    }

    const numbered = line.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
        listBuffer.push(inlineCodeText(numbered[1]));
        continue;
    }

    flushList();
    ensureSpace(28);
    doc.fillColor(colors.ink).font('Helvetica').fontSize(10)
        .text(inlineCodeText(line), {
            lineGap: 2.5
        });
    doc.moveDown(0.25);
}

flushList();

const pageCount = doc.bufferedPageRange().count;
for (let index = 0; index < pageCount; index += 1) {
    doc.switchToPage(index);
    const label = `K-Pick Website App Operations Manual | ${index + 1}`;
    doc.fillColor(colors.muted).font('Helvetica').fontSize(8)
        .text(label, 48, doc.page.height - 32, {
            align: 'center',
            width: doc.page.width - 96
        });
}

doc.end();
