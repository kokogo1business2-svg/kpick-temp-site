const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
    function updateBackToTopVisibility() {
        if (window.scrollY > 260) {
            backToTopButton.classList.add("is-visible");
        } else {
            backToTopButton.classList.remove("is-visible");
        }
    }

    backToTopButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("scroll", updateBackToTopVisibility);
    window.addEventListener("resize", updateBackToTopVisibility);
    updateBackToTopVisibility();
}
