// Mobile menu and footer accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Mobile footer accordion
    const footerSections = document.querySelectorAll('.footer-links, .footer-programs, .footer-contact');
    
    if (window.innerWidth <= 767.98) {
        footerSections.forEach(section => {
            const heading = section.querySelector('h4');
            const content = section.querySelector('ul, .contact-info');
            
            if (heading && content) {
                heading.classList.add('collapsed');
                
                heading.addEventListener('click', function() {
                    this.classList.toggle('collapsed');
                    content.classList.toggle('show');
                });
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767.98) {
            // On desktop, ensure all sections are visible
            footerSections.forEach(section => {
                const content = section.querySelector('ul, .contact-info');
                if (content) {
                    content.style.display = '';
                }
            });
        } else {
            // On mobile, collapse all sections
            footerSections.forEach(section => {
                const heading = section.querySelector('h4');
                const content = section.querySelector('ul, .contact-info');
                
                if (heading && content) {
                    heading.classList.add('collapsed');
                    content.style.display = 'none';
                }
            });
        }
    });
});
