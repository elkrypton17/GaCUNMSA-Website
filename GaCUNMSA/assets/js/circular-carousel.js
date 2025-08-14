// Make the initialization function globally available for manual triggering
function initCarousel() {
    console.log('Initializing carousel...');
    const carouselContainer = document.querySelector('.carousel-container');
    const centerElement = document.querySelector('.carousel-center');
    
    if (!carouselContainer) {
        console.error('Carousel container not found!');
        return false;
    }
    if (!centerElement) {
        console.error('Center element not found!');
        return false;
    }
    
    console.log('Carousel elements found, proceeding with initialization...');
    return true;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, setting up carousel...');
    
    // Auto-initialize the carousel
    if (initCarousel()) {
        createCarouselItems();
        const initButton = document.getElementById('initCarousel');
        if (initButton) {
            initButton.textContent = 'Carousel Loaded!';
            initButton.classList.remove('btn-warning');
            initButton.classList.add('btn-success');
            initButton.disabled = true;
        }
    }
    
    // Add click handler for manual re-initialization
    const initButton = document.getElementById('initCarousel');
    if (initButton) {
        initButton.addEventListener('click', function() {
            console.log('Manual re-initialization triggered');
            if (initCarousel()) {
                // Clear existing items
                const items = document.querySelectorAll('.carousel-item');
                items.forEach(item => item.remove());
                
                // Create new items
                createCarouselItems();
                
                this.textContent = 'Carousel Re-initialized!';
                this.classList.remove('btn-warning');
                this.classList.add('btn-success');
                setTimeout(() => {
                    this.textContent = 'Re-initialize Carousel';
                    this.classList.remove('btn-success');
                    this.classList.add('btn-warning');
                }, 2000);
            } else {
                this.textContent = 'Initialization Failed!';
                this.classList.remove('btn-warning');
                this.classList.add('btn-danger');
            }
        });
    }
    
    // Carousel images - using absolute paths from the root
    const images = [
        '/assets/images/1.jpg',
        '/assets/images/2.jpg',
        '/assets/images/3.jpg',
        '/assets/images/4.jpg',
        '/assets/images/5.jpg',
        '/assets/images/6.jpg',
        '/assets/images/7.jpg',
        '/assets/images/8.jpg',
        '/assets/images/9.jpg',
        '/assets/images/22.jpg',
        '/assets/images/33.jpg',
        '/assets/images/44.jpg',
        '/assets/images/66.jpg'
    ];
    
    console.log('Carousel images to load:', images);
    
    // Create carousel items
    function createCarouselItems() {
        const totalItems = images.length;
        const angleIncrement = (2 * Math.PI) / totalItems;
        
        console.log('Creating carousel items...');
        console.log('Total images to load:', totalItems);
        
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            
            const img = new Image();
            img.onload = function() {
                console.log('Image loaded successfully:', image);
            };
            img.onerror = function() {
                console.error('Error loading image:', image);
                // Fallback to a placeholder if image fails to load
                img.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
            };
            
            img.src = image;
            img.alt = `Event ${index + 1}`;
            
            item.appendChild(img);
            carouselContainer.insertBefore(item, centerElement);
            
            // Position items in a circle
            positionItems();
            
            // Add click event to center the clicked item
            item.addEventListener('click', function() {
                centerImage(index);
            });
            
            console.log('Added image to carousel:', image);
        });
        
        // Start auto-rotation
        startAutoRotation();
    }
    
    // Position items in a circular pattern
    function positionItems() {
        const items = document.querySelectorAll('.carousel-item');
        const radius = Math.min(carouselContainer.offsetWidth, carouselContainer.offsetHeight) * 0.4;
        const centerX = carouselContainer.offsetWidth / 2;
        const centerY = carouselContainer.offsetHeight / 2;
        
        items.forEach((item, index) => {
            const angle = (index * (2 * Math.PI / items.length)) - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
            const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;
            
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            
            // Add data attributes for animation
            item.setAttribute('data-angle', angle);
            item.setAttribute('data-radius', radius);
        });
    }
    
    // Auto-rotate the carousel
    let rotationInterval;
    let currentAngle = 0;
    
    function startAutoRotation() {
        if (rotationInterval) clearInterval(rotationInterval);
        
        rotationInterval = setInterval(() => {
            currentAngle += 0.005;
            if (currentAngle >= 2 * Math.PI) currentAngle = 0;
            
            const items = document.querySelectorAll('.carousel-item');
            const centerX = carouselContainer.offsetWidth / 2;
            const centerY = carouselContainer.offsetHeight / 2;
            
            items.forEach((item, index) => {
                const radius = parseFloat(item.getAttribute('data-radius'));
                const angle = parseFloat(item.getAttribute('data-angle')) + currentAngle;
                
                const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
                const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;
                
                // Calculate scale based on position (front items are larger)
                const scale = 0.8 + 0.3 * Math.sin(angle + Math.PI/2);
                const zIndex = Math.round(scale * 10);
                const opacity = 0.7 + 0.3 * Math.sin(angle + Math.PI/2);
                
                item.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                item.style.zIndex = zIndex;
                item.style.opacity = opacity;
            });
        }, 30);
    }
    
    // Center a specific image
    function centerImage(index) {
        const items = document.querySelectorAll('.carousel-item');
        const targetAngle = -index * (2 * Math.PI / items.length) + Math.PI / 2;
        
        // Stop auto-rotation
        if (rotationInterval) clearInterval(rotationInterval);
        
        // Animate to center the selected item
        const animationDuration = 1000; // ms
        const startTime = performance.now();
        const startAngle = currentAngle;
        
        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            // Ease in-out function
            const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
            
            currentAngle = startAngle + (targetAngle - startAngle) * easeProgress;
            
            // Update positions
            const centerX = carouselContainer.offsetWidth / 2;
            const centerY = carouselContainer.offsetHeight / 2;
            
            items.forEach((item, i) => {
                const radius = parseFloat(item.getAttribute('data-radius'));
                const angle = parseFloat(item.getAttribute('data-angle')) + currentAngle;
                
                const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
                const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;
                
                const scale = 0.8 + 0.3 * Math.sin(angle + Math.PI/2);
                const zIndex = Math.round(scale * 10);
                const opacity = 0.7 + 0.3 * Math.sin(angle + Math.PI/2);
                
                item.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                item.style.zIndex = zIndex;
                item.style.opacity = opacity;
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Restart auto-rotation after a delay
                setTimeout(() => {
                    startAutoRotation();
                }, 3000);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            positionItems();
        }, 250);
    });
    
    // Initialize the carousel
    createCarouselItems();
});
