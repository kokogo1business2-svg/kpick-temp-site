const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const headerLogo = document.querySelector(".header .logo img");
const navbarLogo = document.querySelector(".navbar .navlogo");
const navToggle = document.querySelector(".nav-toggle");
const navigationPanel = document.querySelector(".navigations");

function closeMobileMenu() {
    if (!navbar || !navToggle) {
        return;
    }

    navbar.classList.remove("is-menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
}

function toggleMobileMenu() {
    if (!navbar || !navToggle) {
        return;
    }

    const isOpen = navbar.classList.toggle("is-menu-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

function updateNavbarState() {
    if (!header || !navbar) {
        return;
    }

    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);

    if (headerLogo && navbarLogo) {
        const headerLogoRect = headerLogo.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
        const navbarLogoStyles = window.getComputedStyle(navbarLogo);
        const logoLeft = parseFloat(navbarLogoStyles.left) || 0;
        const targetCenterX = navbarRect.left + logoLeft + (navbarLogo.offsetWidth / 2);
        const targetCenterY = navbarRect.top + (navbarRect.height / 2);
        const sourceCenterX = headerLogoRect.left + (headerLogoRect.width / 2);
        const sourceCenterY = headerLogoRect.top + (headerLogoRect.height / 2);
        const shiftX = sourceCenterX - targetCenterX;
        const shiftY = sourceCenterY - targetCenterY;

        navbar.style.setProperty("--nav-logo-shift-x", `${shiftX}px`);
        navbar.style.setProperty("--nav-logo-shift-y", `${shiftY}px`);
    }

    const triggerPoint = Math.max(0, headerHeight - 28);

    if (window.scrollY >= triggerPoint) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
}

window.addEventListener("scroll", updateNavbarState);
window.addEventListener("resize", () => {
    updateNavbarState();

    if (window.innerWidth > 640) {
        closeMobileMenu();
    }
});

if (navToggle) {
    navToggle.addEventListener("click", toggleMobileMenu);
}

if (navigationPanel) {
    navigationPanel.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeMobileMenu();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

document.addEventListener("click", (event) => {
    if (!navbar || !navbar.classList.contains("is-menu-open")) {
        return;
    }

    if (!navbar.contains(event.target)) {
        closeMobileMenu();
    }
});

updateNavbarState();
