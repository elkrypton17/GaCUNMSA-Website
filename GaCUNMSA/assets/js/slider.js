document.addEventListener('DOMContentLoaded', function() {
    // Slider data - using the same images from the carousel
    const sliderData = [
        {
            image: 'assets/images/1.jpg',
            title: 'Campus Life',
            description: 'Experience the vibrant community at Garden City University',
            link: 'gallery.html?filter=campus'
        },
        {
            image: 'assets/images/2.jpg',
            title: 'Student Activities',
            description: 'Engage in various extracurricular activities',
            link: 'gallery.html?filter=activities'
        },
        {
            image: 'assets/images/3.jpg',
            title: 'Academic Excellence',
            description: 'Pursue academic success with our dedicated faculty',
            link: 'gallery.html?filter=academics'
        },
        {
            image: 'assets/images/4.jpg',
            title: 'Clinical Training',
            description: 'Hands-on experience in healthcare settings',
            link: 'gallery.html?filter=clinical'
        },
        {
            image: 'assets/images/5.jpg',
            title: 'Campus Events',
            description: 'Participate in exciting events throughout the year',
            link: 'gallery.html?filter=events'
        }
    ];

    // Initialize the slider
    function initSlider() {
        const sliderContainer = document.querySelector('.slider-container .row');
        if (!sliderContainer) return;

        // Clear existing content
        sliderContainer.innerHTML = '';

        // Create slider items
        sliderData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'col-md-4 mb-4';
            slideElement.innerHTML = `
                <div class="slider-item">
                    <img src="${slide.image}" alt="${slide.title}" class="img-fluid">
                    <div class="slider-caption">
                        <h4>${slide.title}</h4>
                        <p>${slide.description}</p>
                    </div>
                </div>
            `;
            sliderContainer.appendChild(slideElement);
        });


        // Initialize Slick Slider if available
        if (typeof $ !== 'undefined' && $.fn.slick) {
            $('.slider-container .row').slick({
                dots: true,
                infinite: true,
                speed: 800,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                pauseOnHover: false,
                pauseOnFocus: false,
                pauseOnDotsHover: false,
                fade: false,
                cssEase: 'ease-in-out',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        } else {
            // Fallback if Slick is not loaded
            const sliderItems = document.querySelectorAll('.slider-item');
            let currentSlide = 0;
            const totalSlides = sliderItems.length;

            function showSlide(index) {
                // Hide all slides
                sliderItems.forEach(item => {
                    item.style.display = 'none';
                });

                // Show current slide and next two slides
                for (let i = 0; i < 3; i++) {
                    const slideIndex = (index + i) % totalSlides;
                    if (sliderItems[slideIndex]) {
                        sliderItems[slideIndex].style.display = 'block';
                    }
                }
            }

            // Initialize first slide
            showSlide(0);

            // Auto-advance slides
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            }, 3000);
        }
    }

    // Initialize slider when DOM is loaded
    initSlider();
});
