const carousel = document.querySelector(".single-use-carousel");

if (carousel) {
    const viewport = carousel.querySelector(".single-use-carousel__viewport");
    const cards = Array.from(carousel.querySelectorAll(".single-use-card"));
    const prevButton = carousel.querySelector(".single-use-carousel__nav--prev");
    const nextButton = carousel.querySelector(".single-use-carousel__nav--next");
    const logicalCount = cards.length;
    let activeIndex = 0;
    let wheelLocked = false;

    function wrapIndex(index) {
        const total = logicalCount;

        return ((index % total) + total) % total;
    }

    function getNormalizedOffset(itemIndex) {
        let offset = itemIndex - activeIndex;
        const half = Math.floor(logicalCount / 2);

        if (offset > half) {
            offset -= logicalCount;
        } else if (offset < -half) {
            offset += logicalCount;
        }

        return offset;
    }

    function renderCarousel() {
        cards.forEach((card, index) => {
            const itemIndex = Number(card.dataset.itemIndex || index);
            const offset = getNormalizedOffset(itemIndex);
            const absOffset = Math.abs(offset);
            const direction = offset === 0 ? 0 : Math.sign(offset);
            const isVisible = absOffset <= 2;

            card.style.setProperty("--offset", offset);
            card.style.setProperty("--abs-offset", absOffset);
            card.style.setProperty("--direction", direction);
            card.style.display = isVisible ? "block" : "none";
            card.style.pointerEvents = offset === 0 ? "auto" : "none";
            card.classList.toggle("is-active", offset === 0);
            card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
        });

        if (prevButton) {
            prevButton.disabled = false;
        }

        if (nextButton) {
            nextButton.disabled = false;
        }
    }

    function goTo(index) {
        activeIndex = wrapIndex(index);
        renderCarousel();
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => goTo(activeIndex - 1));
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => goTo(activeIndex + 1));
    }

    if (viewport) {
        viewport.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                goTo(activeIndex - 1);
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                goTo(activeIndex + 1);
            }
        });

        viewport.addEventListener("wheel", (event) => {
            if (Math.abs(event.deltaY) < 10 && Math.abs(event.deltaX) < 10) {
                return;
            }

            event.preventDefault();

            if (wheelLocked) {
                return;
            }

            wheelLocked = true;
            const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
            goTo(activeIndex + (delta > 0 ? 1 : -1));

            window.setTimeout(() => {
                wheelLocked = false;
            }, 320);
        }, { passive: false });
    }

    renderCarousel();
}
