const eropProducts = [
    {
        id: "eroptix",
        page: "erop-eroptix.html",
        name: "EROPTIX",
        label: "Eroptix",
        description: "Surgery-assisted cooperative robot.",
        image: "img/eroptix1.png",
        imageClass: "erop-showcase__image--eroptix",
        specs: [
            ["ERT-012", "Cooperative Robot", "1"],
            ["ERT-011", "End-Effector", "1"],
            ["ERT-005", "Joystick", "1"],
            ["ERT-009", "Electronic Cart", "1"],
        ],
    },
    {
        id: "trocar",
        page: "erop-trocar.html",
        name: "TROCAR",
        label: "Trocar",
        description: "Disposable trocar for laparoscopy.",
        image: "img/trocar-ts11.png",
        imageClass: "erop-showcase__image--trocar",
        specs: [
            ["TS-11", "Disposable Trocar", "1"],
            ["TS-S", "Sleeve Assembly", "1"],
            ["TS-O", "Obturator", "1"],
            ["TS-V", "Valve Cap", "1"],
        ],
    },
    {
        id: "forcep",
        page: "erop-forcep.html",
        name: "FORCEP",
        label: "Forcep",
        description: "Laparoscopic surgical aid.",
        image: "img/forcep-fc-5.png",
        imageClass: "erop-showcase__image--forcep",
        specs: [
            ["FC-5", "Laparoscopic Forcep", "1"],
            ["FC-H", "Handle", "1"],
            ["FC-S", "Shaft", "1"],
            ["FC-T", "Tip Assembly", "1"],
        ],
    },
    {
        id: "dual-guard",
        page: "erop-dual-guard.html",
        name: "DUAL GUARD",
        label: "Dual Guard",
        description: "Dual port type wound protector.",
        image: "img/DualGuardDGS.png",
        imageClass: "erop-showcase__image--dual-guard",
        specs: [
            ["DGS", "Dual Guard System", "1"],
            ["DGP", "Dual Port Cap", "1"],
            ["DGW", "Wound Protector", "1"],
            ["DGA", "Access Component", "1"],
        ],
    },
    {
        id: "new-port",
        page: "erop-new-port.html",
        name: "NEW PORT",
        label: "New Port",
        description: "Disposable manual medical opening device.",
        image: "img/2port.png",
        imageClass: "erop-showcase__image--new-port",
        specs: [
            ["NP-2", "New Port Device", "1"],
            ["NP-C", "Cap Assembly", "1"],
            ["NP-V", "Valve Unit", "1"],
            ["NP-S", "Sleeve", "1"],
        ],
    },
    {
        id: "chito-block",
        page: "erop-chito-block.html",
        name: "CHITO BLOCK",
        label: "Chito Block",
        description: "Pain buster management device kit.",
        image: "img/ChitoBlockPlenty.png",
        imageClass: "erop-showcase__image--chito-block",
        specs: [
            ["CB-K", "Chito Block Kit", "1"],
            ["CB-P", "Pain Buster Pump", "1"],
            ["CB-C", "Catheter Set", "1"],
            ["CB-S", "Syringe Set", "1"],
        ],
    },
    {
        id: "t-closure",
        page: "erop-t-closure.html",
        name: "T CLOSURE",
        label: "T Closure",
        description: "Thyroid surgical instrument.",
        image: "img/T-closure.png",
        imageClass: "erop-showcase__image--t-closure",
        specs: [
            ["TC-1", "T Closure Device", "1"],
            ["TC-R", "Retraction Ring", "1"],
            ["TC-L", "Locking Part", "1"],
            ["TC-S", "Support Component", "1"],
        ],
    },
    {
        id: "s-sustener",
        page: "erop-s-sustener.html",
        name: "S-SUSTENER",
        label: "S-Sustener",
        description: "Surgical skin closure.",
        image: "img/S-sustener.png",
        imageClass: "erop-showcase__image--s-sustener",
        specs: [
            ["SS-1", "S-Sustener Closure", "1"],
            ["SS-B", "Closure Bridge", "1"],
            ["SS-P", "Skin Patch", "2"],
            ["SS-A", "Adjusting Clip", "1"],
        ],
    },
    {
        id: "new-port-pack",
        page: "erop-new-port-pack.html",
        name: "NEW PORT PACK",
        label: "New Port Pack",
        description: "Single port kit.",
        image: "img/NewPortPack.png",
        imageClass: "erop-showcase__image--new-port-pack",
        specs: [
            ["NPP", "New Port Pack", "1"],
            ["NPP-T", "Tray Set", "1"],
            ["NPP-P", "Port Device", "1"],
            ["NPP-A", "Accessory Set", "1"],
        ],
    },
];

const currentProductId = document.body.dataset.eropProduct;
const currentIndex = Math.max(0, eropProducts.findIndex((product) => product.id === currentProductId));
const currentProduct = eropProducts[currentIndex] || eropProducts[0];
const previousProduct = eropProducts[(currentIndex - 1 + eropProducts.length) % eropProducts.length];
const nextProduct = eropProducts[(currentIndex + 1) % eropProducts.length];
const root = document.querySelector("#erop-product-root");

function renderSpecRows(product) {
    return product.specs.map(([code, name, qty]) => `
        <tr>
            <td><img src="${product.image}" alt="${name}" class="erop-spec__thumb"></td>
            <td>${code}</td>
            <td>${name}</td>
            <td>${qty}</td>
        </tr>
    `).join("");
}

if (root) {
    root.innerHTML = `
        <section class="heading">
            <div class="header">
                <div class="header-container">
                    <div class="logo"><img src="img/KpickLogo.png" alt="K-Pick Trading Corp logo"></div>
                    <div class="email"><p class="mail">E-MAIL: kpickmedicalmarketing@gmail.com</p></div>
                </div>
            </div>

            <div class="navbar">
                <a class="navlogo" href="index.html" aria-label="K-Pick Trading Corp home">
                    <img src="img/KpickLogoDark.png" alt="K-Pick Trading Corp" class="nav-logo">
                </a>
                <button class="nav-toggle" type="button" aria-label="Open navigation menu" aria-controls="primary-navigation" aria-expanded="false"><span></span><span></span><span></span></button>
                <div class="navigations">
                    <ul class="navigation" id="primary-navigation">
                        <li class="nav home"><a href="index.html">Home</a></li>
                        <li class="nav aboutus"><a href="index.html#about">About Us</a></li>
                        <li class="nav brands"><a href="index.html#TieUps">Brands</a></li>
                        <li class="nav generatePO"><a href="request.htm">Generate Quote / PO</a></li>
                        <li class="nav contactus"><a href="contact.htm">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="erop-product-hero">
            <div class="erop-product-hero__overlay"></div>
            <img src="img/eroplogo.png" alt="EROP" class="erop-product-hero__logo">
        </section>

        <main class="erop-product-main">
            <section class="erop-showcase" aria-label="${currentProduct.label} product showcase">
                <a class="erop-showcase__arrow erop-showcase__arrow--prev" href="${previousProduct.page}" aria-label="View ${previousProduct.label}">&lt;</a>
                <div class="erop-showcase__stage">
                    <div class="erop-showcase__orb"></div>
                    <p class="erop-showcase__word" aria-hidden="true">${currentProduct.name}</p>
                    <img src="${currentProduct.image}" alt="${currentProduct.label}" class="erop-showcase__image ${currentProduct.imageClass}">
                    <div class="erop-showcase__caption">
                        <h1>${currentProduct.label}</h1>
                        <p>${currentProduct.description}</p>
                    </div>
                </div>
                <a class="erop-showcase__arrow erop-showcase__arrow--next" href="${nextProduct.page}" aria-label="View ${nextProduct.label}">&gt;</a>
            </section>

            <section class="erop-spec">
                <h2>SPECIFICATION</h2>
                <div class="erop-spec__table-wrap">
                    <table class="erop-spec__table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Qty (EA)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${renderSpecRows(currentProduct)}
                        </tbody>
                    </table>
                </div>
            </section>

            <nav class="brand-product-nav" aria-label="EROP product navigation">
                <a class="brand-product-nav__link" href="${previousProduct.page}">
                    <span>Previous</span>
                    ${previousProduct.label}
                </a>
                <a class="brand-product-nav__link" href="erop.html">
                    <span>Back</span>
                    EROP Products
                </a>
                <a class="brand-product-nav__link" href="${nextProduct.page}">
                    <span>Next</span>
                    ${nextProduct.label}
                </a>
            </nav>
        </main>

        <footer class="site-footer" id="contact">
            <div class="site-footer__top">
                <div class="site-footer__brand">
                    <img src="img/KpickLogo.png" alt="K-Pick Trading Corp." class="site-footer__logo">
                </div>
                <div class="site-footer__contact">
                    <p>Dakota Building, 555 Gen Malvar St. cor</p>
                    <p>Adriatico St. Brgy. 698 Zone 076 Malate, Manila</p>
                    <p>Mobile: +639173158420</p>
                </div>
            </div>
            <p class="site-footer__bottom">K-Pick Trading Corp. &copy; 2026 All Rights Reserved.</p>
        </footer>
        <a href="#top" class="back-to-top" aria-label="Back to top">&#8593;</a>
    `;

    window.requestAnimationFrame(() => {
        document.body.classList.add("erop-product-ready");
    });
}
