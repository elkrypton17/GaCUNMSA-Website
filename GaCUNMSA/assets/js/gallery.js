// Gallery Data with real images from assets folder
const galleryItems = [
    {
        id: 1,
        title: 'Campus Life',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/1.jpg',
        thumb: 'assets/images/1.jpg'
    },
    {
        id: 2,
        title: 'Student Activities',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/2.jpg',
        thumb: 'assets/images/2.jpg'
    },
    {
        id: 3,
        title: 'Academic Excellence',
        category: 'awards',
        date: '14 August 2025',
        image: 'assets/images/3.jpg',
        thumb: 'assets/images/3.jpg'
    },
    {
        id: 4,
        title: 'Clinical Training',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/4.jpg',
        thumb: 'assets/images/4.jpg'
    },
    {
        id: 5,
        title: 'Campus Events',
        category: 'events',
        date: '14 August 2025',
        image: 'assets/images/5.jpg',
        thumb: 'assets/images/5.jpg'
    },
    {
        id: 6,
        title: 'Student Life',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/6.jpg',
        thumb: 'assets/images/6.jpg'
    },
    {
        id: 7,
        title: 'Workshop Session',
        category: 'workshops',
        date: '14 August 2025',
        image: 'assets/images/7.jpg',
        thumb: 'assets/images/7.jpg'
    },
    {
        id: 8,
        title: 'Graduation Ceremony',
        category: 'events',
        date: '14 August 2025',
        image: 'assets/images/8.jpg',
        thumb: 'assets/images/8.jpg'
    },
    {
        id: 9,
        title: 'Campus Grounds',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/9.jpg',
        thumb: 'assets/images/9.jpg'
    },
    {
        id: 10,
        title: 'Student Gathering',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/22.jpg',
        thumb: 'assets/images/22.jpg'
    },
    {
        id: 11,
        title: 'Laboratory Session',
        category: 'workshops',
        date: '14 August 2025',
        image: 'assets/images/33.jpg',
        thumb: 'assets/images/33.jpg'
    },
    {
        id: 12,
        title: 'Award Ceremony',
        category: 'awards',
        date: '14 August 2025',
        image: 'assets/images/44.jpg',
        thumb: 'assets/images/44.jpg'
    },
    {
        id: 13,
        title: 'Group Photo',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/66.jpg',
        thumb: 'assets/images/66.jpg'
    },
    {
        id: 14,
        title: 'Campus Building',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/header1.jpg',
        thumb: 'assets/images/header1.jpg'
    },
    {
        id: 15,
        title: 'University Grounds',
        category: 'activities',
        date: '14 August 2025',
        image: 'assets/images/header2.jpg',
        thumb: 'assets/images/header2.jpg'
    }
];

// DOM Elements
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.btn-filter');
const loadMoreBtn = document.getElementById('load-more');

// Variables
let currentFilter = 'all';
let visibleItems = 6; // Number of items to show initially
const itemsPerLoad = 3; // Number of items to load on "Load More" click

// Initialize the gallery
function initGallery() {
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update current filter
            currentFilter = button.dataset.filter;
            // Reset visible items
            visibleItems = 6;
            // Filter and display gallery items
            filterGallery();
        });
    });

    // Add event listener to load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreItems);
    }

    // Initial display of gallery items
    displayGalleryItems();
}

// Filter gallery items based on current filter
function filterGallery() {
    // Clear the gallery grid
    galleryGrid.innerHTML = '';
    
    // Filter items based on current filter
    let filteredItems = [];
    if (currentFilter === 'all') {
        filteredItems = galleryItems;
    } else {
        filteredItems = galleryItems.filter(item => item.category === currentFilter);
    }
    
    // Update visible items count if filtered list is smaller
    if (filteredItems.length < visibleItems) {
        visibleItems = filteredItems.length;
    }
    
    // Display filtered items
    displayGalleryItems(filteredItems);
    
    // Show/hide load more button
    toggleLoadMoreButton(filteredItems);
}

// Display gallery items
function displayGalleryItems(items = galleryItems) {
    // Clear the gallery grid
    galleryGrid.innerHTML = '';
    
    // Get items to display
    const itemsToDisplay = items.slice(0, visibleItems);
    
    // Create gallery items
    itemsToDisplay.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });
    
    // Initialize lightbox
    initLightbox();
}

// Create a gallery item element
function createGalleryItem(item) {
    const categoryNames = {
        'events': 'Event',
        'workshops': 'Workshop',
        'activities': 'Activity',
        'awards': 'Award'
    };
    
    const itemElement = document.createElement('div');
    itemElement.className = 'gallery-item';
    itemElement.setAttribute('data-category', item.category);
    
    itemElement.innerHTML = `
        <div class="gallery-img-container">
            <img src="${item.thumb || item.image}" alt="${item.title}" class="gallery-img">
            <div class="gallery-overlay">
                <span class="gallery-category">${categoryNames[item.category] || 'Gallery'}</span>
                <h4 class="gallery-title">${item.title}</h4>
                <div class="gallery-date">
                    <i class="far fa-calendar-alt"></i> ${item.date}
                </div>
            </div>
        </div>
        <a href="${item.image}" data-lightbox="gallery" data-title="${item.title}" class="d-none"></a>
    `;
    
    return itemElement;
}

// Load more items when "Load More" button is clicked
function loadMoreItems() {
    visibleItems += itemsPerLoad;
    filterGallery();
    
    // Scroll to newly loaded items
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// Toggle visibility of load more button
function toggleLoadMoreButton(items = galleryItems) {
    if (!loadMoreBtn) return;
    
    if (visibleItems >= items.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
    
    // Hide button if no items match the filter
    if (items.length === 0) {
        loadMoreBtn.style.display = 'none';
    }
}

// Initialize lightbox with custom settings
function initLightbox() {
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': false,
            'disableScrolling': true,
            'albumLabel': 'Image %1 of %2'
        });
    }
}

// Initialize the gallery when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    
    // Add animation on scroll
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Refresh AOS on resize
        AOS.refresh();
    }, 250);
});
