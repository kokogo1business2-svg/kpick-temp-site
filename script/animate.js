(function () {
    'use strict';

    var VISIBLE_CLASS = 'is-visible';
    var STAGGER_STEP = 0.09; // seconds between each child

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add(VISIBLE_CLASS);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    function observeElement(el, delay) {
        if (delay) {
            el.style.setProperty('--anim-delay', delay + 's');
        }
        observer.observe(el);
    }

    function init() {
        // Observe standalone animate-in elements (not inside a stagger parent)
        document.querySelectorAll('.animate-in').forEach(function (el) {
            if (!el.closest('[data-stagger]')) {
                observeElement(el, 0);
            }
        });

        // For stagger containers: add animate-in to each child and stagger delays
        document.querySelectorAll('[data-stagger]').forEach(function (parent) {
            var children = Array.from(parent.children);
            children.forEach(function (child, index) {
                child.classList.add('animate-in');
                observeElement(child, parseFloat((index * STAGGER_STEP).toFixed(2)));
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
