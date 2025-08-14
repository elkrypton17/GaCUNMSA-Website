// Back to Top Button
(function() {
    'use strict';

    // Configuration
    const config = {
        scrollThreshold: 300,     // Pixels to scroll before showing the button
        bottomThreshold: 100,     // Pixels from bottom to trigger pulse effect
        scrollDuration: 800,      // Duration of scroll animation in ms
        pulseDelay: 5000,         // Delay before showing pulse animation in ms
    };

    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('role', 'button');
    backToTopBtn.setAttribute('tabindex', '0');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    // Variables
    let isScrolling = false;
    let lastScrollTop = 0;
    let scrollTimeout;
    let pulseTimeout;

    // Throttle function for scroll events
    function throttle(callback, limit) {
        let waiting = false;
        return function() {
            if (!waiting) {
                callback.apply(this, arguments);
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, limit);
            }
        };
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Show/hide button on scroll
    function toggleBackToTop() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine scroll direction
        const isScrollingDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Show/hide based on scroll position
        if (scrollTop > config.scrollThreshold) {
            backToTopBtn.classList.add('visible');
            
            // Add subtle class when scrolling down
            if (isScrollingDown) {
                backToTopBtn.classList.add('scrolling-down');
            } else {
                backToTopBtn.classList.remove('scrolling-down');
            }
            
            // Add pulse animation when near the bottom of the page
            const scrollPosition = window.innerHeight + scrollTop;
            const bottomPosition = document.documentElement.scrollHeight - config.bottomThreshold;
            
            if (scrollPosition >= bottomPosition) {
                backToTopBtn.classList.add('pulse');
                // Reset pulse animation after delay
                clearTimeout(pulseTimeout);
                pulseTimeout = setTimeout(() => {
                    backToTopBtn.classList.remove('pulse');
                }, 3000);
            } else if (scrollTop < config.scrollThreshold * 2) {
                backToTopBtn.classList.remove('pulse');
            }
        } else {
            backToTopBtn.classList.remove('visible', 'pulse', 'scrolling-down');
        }

        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        // Set a new timeout to handle scroll end
        scrollTimeout = setTimeout(handleScrollEnd, 100);
    }

    // Handle scroll end
    function handleScrollEnd() {
        backToTopBtn.classList.remove('scrolling-down');
        isScrolling = false;
    }

    // Smooth scroll to top with easing
    function scrollToTop(e) {
        e.preventDefault();
        
        // Don't do anything if already at the top
        if (window.pageYOffset === 0) return;
        
        // Prevent multiple clicks
        if (isScrolling) return;
        isScrolling = true;
        
        // Add active class for click effect
        backToTopBtn.classList.add('active');
        
        // Remove pulse effect when clicked
        backToTopBtn.classList.remove('pulse');
        
        // Smooth scroll with easing
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        
        function scrollAnimation(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / config.scrollDuration, 1);
            
            // Easing function (easeInOutQuad)
            const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const scrollY = startPosition - (startPosition * easeInOutQuad(progress));
            
            window.scrollTo(0, scrollY);
            
            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            } else {
                isScrolling = false;
                backToTopBtn.classList.remove('active');
                
                // Focus management for accessibility
                backToTopBtn.blur();
                
                // Move focus to the top of the page
                const skipLink = document.querySelector('a[href="#main-content"]');
                if (skipLink) {
                    skipLink.focus();
                }
            }
        }
        
        requestAnimationFrame(scrollAnimation);
    }

    // Keyboard accessibility
    function handleKeyDown(e) {
        // Space or Enter key
        if (e.key === ' ' || e.key === 'Enter' || e.keyCode === 32 || e.keyCode === 13) {
            e.preventDefault();
            scrollToTop(e);
        }
    }

    // Initialize
    function init() {
        // Add event listeners with throttling for scroll
        window.addEventListener('scroll', throttle(toggleBackToTop, 100), { passive: true });
        
        // Click event
        backToTopBtn.addEventListener('click', scrollToTop, { passive: false });
        
        // Keyboard navigation
        backToTopBtn.addEventListener('keydown', handleKeyDown);
        
        // Initial check in case page loads with scroll position
        toggleBackToTop();
        
        // Add animation class after page load
        window.addEventListener('load', () => {
            backToTopBtn.classList.add('loaded');
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
