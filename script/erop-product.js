const eropProducts = [
    {
        id: "eroptix",
        page: "erop-eroptix.html",
        name: "EROPTIX",
        label: "Eroptix",
        description: "Surgery-assisted cooperative robot.",
        image: "img/eroptix1.png",
        featureImage: "img/eroptixBottom.png",
        imageClass: "erop-showcase__image--eroptix",
        specSections: [
            {
                title: "SPECIFICATION",
                rows: [
                    ["ERT-012", "Cooperative Robot", "1", "img/ert012.png"],
                    ["ERT-011", "End-Effector", "1", "img/ert011.png"],
                    ["ERT-005", "Joystick", "1", "img/ert005.png"],
                    ["ERT-009", "Electronic Cart", "1", "img/ert009.png"],
                ],
            },
            {
                title: "SUPPLIES",
                rows: [
                    ["RO-01", "Drape", "4EA", "img/RO01.png"],
                    ["RO-02", "Scope Holder", "1EA", ""],
                    ["RO-03", "Trocar Holder", "1EA", ""],
                    ["TS-11R", "Robot Trocar", "3EA", "img/ts11r.png"],
                ],
            },
        ],
    },
    {
        id: "trocar",
        page: "erop-trocar.html",
        name: "TROCAR",
        label: "Trocar",
        description: "Disposable trocar for laparoscopy.",
        image: "img/trocar_ts-11.png",
        showcaseName: "TS-TROCAR",
        activeVariationIndex: 2,
        imageClass: "erop-showcase__image--trocar",
        variations: [
            {
                code: "TS-3",
                image: "img/trocar_ts-3.png",
                description: "Laparoscopic 3mm Trocar<br>Minimally Invasive Surgery System",
            },
            {
                code: "TS-5",
                image: "img/trocar_ts-5.png",
                description: "Laparoscopic 5mm Trocar<br>Minimally Invasive Surgery System",
            },
            {
                code: "TS-11",
                image: "img/trocar_ts-11.png",
                description: "Laparoscopic 11mm Trocar<br>Minimally Invasive Surgery System",
            },
            {
                code: "TS-12",
                image: "img/trocar_ts-12.png",
                description: "Laparoscopic 12mm Trocar<br>Minimally Invasive Surgery System",
            },
        ],
        specs: [
            ["TS-3", "3mm", "70mm", "img/trocar_ts-3.png"],
            ["TS-5", "5mm", "80mm", "img/trocar_ts-5.png"],
            ["TS-11", "11mm", "95mm", "img/trocar_ts-11.png"],
            ["TS-12", "12mm", "100mm", "img/trocar_ts-12.png"],
        ],
        specLayout: "trocar",
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

function renderSpecRows(rows, fallbackImage) {
    return rows.map(([code, name, qty, image]) => {
        const rowImage = image === undefined ? fallbackImage : image;
        const imageMarkup = rowImage ? `<img src="${rowImage}" alt="${name}" class="erop-spec__thumb">` : "";

        return `
        <tr>
            <td class="erop-spec__image-cell">${imageMarkup}</td>
            <td>${code}</td>
            <td>${name}</td>
            <td>${qty}</td>
        </tr>
    `;
    }).join("");
}

function renderSpecSections(product) {
    if (product.specLayout === "trocar") {
        return `
            <section class="erop-spec__group">
                <h2>SPECIFICATION</h2>
                <div class="trocar-spec">
                    <table class="trocar-spec__table">
                        <tbody>
                            <tr>
                                <th></th>
                                ${product.specs.map(([code, diameter, length, image]) => `
                                    <td>
                                        <img src="${image}" alt="${code} trocar" class="trocar-spec__image">
                                    </td>
                                `).join("")}
                            </tr>
                            <tr>
                                <th>TROCAR</th>
                                ${product.specs.map(([code]) => `<td>${code}</td>`).join("")}
                            </tr>
                            <tr>
                                <th>DIAMETER</th>
                                ${product.specs.map(([, diameter]) => `<td>${diameter}</td>`).join("")}
                            </tr>
                            <tr>
                                <th>LENGTH</th>
                                ${product.specs.map(([, , length]) => `<td>${length}</td>`).join("")}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        `;
    }

    const sections = product.specSections || [
        {
            title: "SPECIFICATION",
            rows: product.specs,
        },
    ];

    return sections.map((section) => `
        <section class="erop-spec__group">
            <h2>${section.title}</h2>
            <div class="erop-spec__table-wrap">
                <table class="erop-spec__table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Qty (EA)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderSpecRows(section.rows, product.image)}
                    </tbody>
                </table>
            </div>
        </section>
    `).join("");
}

function renderFeaturePanel(product) {
    if (!product.featureImage) {
        return "";
    }

    return `
        <section class="erop-feature-panel" aria-label="${product.label} feature overview">
            <img src="${product.featureImage}" alt="${product.label} feature overview" class="erop-feature-panel__image">
        </section>
    `;
}

function renderAfterSpecPanel(product) {
    if (product.id !== "trocar") {
        return "";
    }

    return `
        <section class="trocar-info-strip">
            <div class="trocar-info-strip__inner">
                <h2>Minimally invasive surgery</h2>
                <p>Laparoscopic surgical instruments and endoscopic cameras provide space to move in and out of the patient's body. In contrast to open a medical procedure, cameras and instruments are embedded into the midsection with little openings of 0.5 to 1.5cm, which have the advantage of minimizing skin incision, fast recuperation, generally safe of infection, and limiting scars.</p>
            </div>
        </section>

        <section class="trocar-scroll-story" aria-label="Trocar feature story">
            <div class="trocar-scroll-story__stage" aria-hidden="true">
                <span class="trocar-scroll-story__halo"></span>
                <img src="img/trocar_ts-11.png" alt="" class="trocar-scroll-story__image">
            </div>
            <div class="trocar-scroll-story__steps">
                <article class="trocar-scroll-step trocar-scroll-step--valve" data-trocar-step="0">
                    <span class="trocar-feature__icon trocar-feature__icon--spark" aria-hidden="true"></span>
                    <h2>Gas leakage prevention valve</h2>
                    <p>The aperture type valve is applied to prevent CO2 gas leakage by restoring the shape even if the surgical instrument is inserted repeatedly.</p>
                </article>
                <article class="trocar-scroll-step trocar-scroll-step--fixation" data-trocar-step="1">
                    <div>
                        <span class="trocar-feature__icon trocar-feature__icon--slash" aria-hidden="true"></span>
                        <h2>Increased fixation<br>of the cannula</h2>
                        <p>The fixed edge is erected to prevent trocar deviation during surgery to enhance the stability and convenience of the practitioner.</p>
                    </div>
                    <div>
                        <span class="trocar-feature__icon trocar-feature__icon--eye" aria-hidden="true"></span>
                        <h2>DUAL Path</h2>
                        <p>Optimized the surgical vision through a double discharge system that allows fluid and exudate of the subcutaneous fat layer or fascia to escape through the drainage window.</p>
                    </div>
                </article>
                <article class="trocar-scroll-step trocar-scroll-step--tip" data-trocar-step="2">
                    <div>
                        <span class="trocar-feature__icon trocar-feature__icon--size" aria-hidden="true"></span>
                        <h2>Minimal head size</h2>
                        <p>25% to 30% more modest head size than other companies to forestall impact between instruments during laparoscopic or robotic medical procedure to limit the burden on medical professionals.</p>
                    </div>
                    <div>
                        <span class="trocar-feature__icon trocar-feature__icon--v" aria-hidden="true"></span>
                        <h2>V-shaped tip</h2>
                        <p>Precise and sharp V-shaped tip for easy use of cannula.</p>
                    </div>
                </article>
            </div>
        </section>
    `;
}

function renderShowcaseArrow(product, direction) {
    if (!product.variations || product.variations.length < 2) {
        return "";
    }

    const label = direction === "prev" ? "Previous variation" : "Next variation";
    const arrow = direction === "prev" ? "&lt;" : "&gt;";

    return `<button class="erop-showcase__arrow erop-showcase__arrow--${direction}" type="button" aria-label="${label}">${arrow}</button>`;
}

function getInitialVariation(product) {
    if (!product.variations || product.variations.length === 0) {
        return null;
    }

    return product.variations[product.activeVariationIndex || 0] || product.variations[0];
}

function renderShowcaseIndicators(product) {
    if (!product.variations || product.variations.length < 2) {
        return "";
    }

    const activeIndex = product.activeVariationIndex || 0;

    return `
        <div class="erop-showcase__indicators" aria-label="${product.label} product variations">
            ${product.variations.map((variation, index) => `
                <button class="erop-showcase__indicator${index === activeIndex ? " is-active" : ""}" type="button" data-variation-index="${index}" aria-label="View ${variation.code}">
                    ${variation.code}
                </button>
            `).join("")}
        </div>
    `;
}

function hydrateVariationShowcase(product) {
    if (!product.variations || product.variations.length < 2) {
        return;
    }

    const showcase = document.querySelector(".erop-showcase");
    const image = document.querySelector(".erop-showcase__image");
    const title = document.querySelector(".erop-showcase__caption h1");
    const description = document.querySelector(".erop-showcase__caption p");
    const indicators = Array.from(document.querySelectorAll(".erop-showcase__indicator"));
    const prevButton = document.querySelector(".erop-showcase__arrow--prev");
    const nextButton = document.querySelector(".erop-showcase__arrow--next");
    let activeIndex = product.activeVariationIndex || 0;
    let autoTimer;
    let isAnimating = false;

    function renderVariation(nextIndex, direction) {
        if (isAnimating || nextIndex === activeIndex) {
            return;
        }

        isAnimating = true;
        const variation = product.variations[nextIndex];
        const exitClass = direction === "prev" ? "is-slide-prev" : "is-slide-next";
        const enterClass = direction === "prev" ? "is-enter-prev" : "is-enter-next";

        showcase.classList.remove("is-slide-next", "is-slide-prev", "is-enter-next", "is-enter-prev");
        showcase.classList.add(exitClass);

        window.setTimeout(() => {
            image.src = variation.image;
            image.alt = variation.code;
            title.textContent = variation.code;
            description.innerHTML = variation.description;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle("is-active", index === nextIndex);
            });

            showcase.classList.remove(exitClass);
            showcase.classList.add(enterClass);

            window.setTimeout(() => {
                showcase.classList.remove(enterClass);
                isAnimating = false;
            }, 540);
        }, 380);

        activeIndex = nextIndex;
    }

    function goToPrevious() {
        const nextIndex = (activeIndex - 1 + product.variations.length) % product.variations.length;
        renderVariation(nextIndex, "prev");
    }

    function goToNext() {
        const nextIndex = (activeIndex + 1) % product.variations.length;
        renderVariation(nextIndex, "next");
    }

    function restartAutoTimer() {
        window.clearInterval(autoTimer);
        autoTimer = window.setInterval(goToNext, 3000);
    }

    prevButton.addEventListener("click", () => {
        goToPrevious();
        restartAutoTimer();
    });

    nextButton.addEventListener("click", () => {
        goToNext();
        restartAutoTimer();
    });

    indicators.forEach((indicator) => {
        indicator.addEventListener("click", () => {
            const nextIndex = Number(indicator.dataset.variationIndex);
            const direction = nextIndex > activeIndex ? "next" : "prev";

            renderVariation(nextIndex, direction);
            restartAutoTimer();
        });
    });

    restartAutoTimer();
}

function hydrateTrocarScrollStory() {
    const story = document.querySelector(".trocar-scroll-story");

    if (!story) {
        return;
    }

    const steps = Array.from(story.querySelectorAll(".trocar-scroll-step"));

    function setActiveStep(activeIndex) {
        story.classList.toggle("is-step-1", activeIndex === 1);
        story.classList.toggle("is-step-2", activeIndex === 2);
        steps.forEach((step, index) => {
            step.classList.toggle("is-active", index === activeIndex);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        const activeEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!activeEntry) {
            return;
        }

        setActiveStep(Number(activeEntry.target.dataset.trocarStep));
    }, {
        threshold: [0.35, 0.5, 0.65],
    });

    steps.forEach((step) => observer.observe(step));
    setActiveStep(0);
}

if (root) {
    const initialVariation = getInitialVariation(currentProduct);
    const showcaseLabel = currentProduct.showcaseName || currentProduct.name;
    const showcaseImage = initialVariation ? initialVariation.image : currentProduct.image;
    const showcaseTitle = initialVariation ? initialVariation.code : currentProduct.label;
    const showcaseDescription = initialVariation ? initialVariation.description : currentProduct.description;

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
            <section class="erop-showcase${currentProduct.variations ? " erop-showcase--variations" : ""}" aria-label="${currentProduct.label} product showcase">
                ${renderShowcaseArrow(currentProduct, "prev")}
                <div class="erop-showcase__stage">
                    <div class="erop-showcase__orb"></div>
                    <p class="erop-showcase__word" aria-hidden="true">${showcaseLabel}</p>
                    <img src="${showcaseImage}" alt="${showcaseTitle}" class="erop-showcase__image ${currentProduct.imageClass}">
                    <div class="erop-showcase__caption">
                        <h1>${showcaseTitle}</h1>
                        <p>${showcaseDescription}</p>
                    </div>
                </div>
                ${renderShowcaseArrow(currentProduct, "next")}
                ${renderShowcaseIndicators(currentProduct)}
            </section>

            <section class="erop-spec">
                ${renderSpecSections(currentProduct)}
            </section>

            ${renderAfterSpecPanel(currentProduct)}

            ${renderFeaturePanel(currentProduct)}

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

    hydrateVariationShowcase(currentProduct);
    hydrateTrocarScrollStory();
}
