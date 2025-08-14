/**
 * Events Page JavaScript
 * Handles the display of upcoming and past events
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample event data - In a real app, this would come from an API
    const eventsData = {
        upcoming: [
            {
                id: 1,
                title: 'Advanced Life Support Training',
                date: '15 September 2023',
                day: '15',
                month: 'September',
                time: '10:00 AM - 2:00 PM',
                type: 'Workshop',
                typeClass: 'primary',
                description: 'Join us for a hands-on workshop on advanced life support techniques and emergency care procedures.',
                location: 'GCU Main Auditorium',
                image: 'assets/images/events/als-training.jpg'
            },
            {
                id: 2,
                title: 'Mental Health Awareness Day',
                date: '22 September 2023',
                day: '22',
                month: 'September',
                time: '9:00 AM - 4:00 PM',
                type: 'Seminar',
                typeClass: 'success',
                description: 'A day dedicated to raising awareness about mental health issues among healthcare students and professionals.',
                location: 'GCU Nursing Department',
                image: 'assets/images/events/mental-health.jpg'
            },
            {
                id: 3,
                title: 'Annual Nursing Research Conference',
                date: '05 October 2023',
                day: '05',
                month: 'October',
                time: '8:30 AM - 1:00 PM',
                type: 'Conference',
                typeClass: 'warning',
                description: 'Join leading nursing researchers and practitioners as they present groundbreaking research in healthcare.',
                location: 'GCU Conference Center',
                image: 'assets/images/events/research-conference.jpg'
            },
            {
                id: 4,
                title: 'Health Screening Camp',
                date: '18 October 2023',
                day: '18',
                month: 'October',
                time: '10:00 AM - 3:00 PM',
                type: 'Community Service',
                typeClass: 'info',
                description: 'Volunteer for our community health screening program and help provide essential healthcare services to underserved communities.',
                location: 'Kumasi Central Market',
                image: 'assets/images/events/health-camp.jpg'
            }
        ],
        past: [
            {
                id: 5,
                title: 'Pediatric Nursing Workshop',
                date: '12 August 2023',
                day: '12',
                month: 'August',
                type: 'Workshop',
                typeClass: 'primary',
                description: 'Specialized training on pediatric care and treatment procedures for nursing students.',
                location: 'GCU Nursing Skills Lab',
                image: 'assets/images/events/pediatric-workshop.jpg'
            },
            {
                id: 6,
                title: 'Nursing Leadership Summit',
                date: '28 July 2023',
                day: '28',
                month: 'July',
                type: 'Seminar',
                typeClass: 'success',
                description: 'A gathering of nursing students and professionals to discuss leadership in healthcare.',
                location: 'GCU Main Auditorium',
                image: 'assets/images/events/leadership-summit.jpg'
            }
        ]
    };

    // Function to create event card HTML
    function createEventCard(event, isPast = false) {
        const badgeClass = isPast ? 'secondary' : 'light';
        const badgeText = isPast ? 'Completed' : event.time;
        const dateBgClass = isPast ? 'bg-secondary' : 'bg-primary';
        const buttonClass = isPast ? 'btn-outline-secondary' : 'btn-outline-primary';
        const buttonText = isPast ? 'View Details' : 'Learn More';

        return `
            <div class="col-lg-6" ${!isPast ? 'data-aos="fade-up"' : ''}>
                <div class="card event-card h-100 border-0 shadow-sm">
                    <div class="row g-0 h-100">
                        <div class="col-md-5">
                            <div class="event-date ${dateBgClass} text-white text-center p-3 h-100 d-flex flex-column justify-content-center">
                                <h3 class="mb-0">${event.day}</h3>
                                <p class="mb-0">${event.month} ${event.date.split(' ')[2]}</p>
                                <div class="mt-3">
                                    <span class="badge bg-${badgeClass} text-${isPast ? 'secondary' : 'primary'}">${badgeText}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="card-body h-100 d-flex flex-column">
                                <div class="mb-2">
                                    <span class="badge bg-${event.typeClass} bg-opacity-10 text-${event.typeClass}">${event.type}</span>
                                </div>
                                <h5 class="card-title">${event.title}</h5>
                                <p class="card-text text-muted">${event.description}</p>
                                <div class="mt-auto">
                                    <div class="d-flex align-items-center mb-3">
                                        <i class="fas fa-map-marker-alt text-primary me-2"></i>
                                        <span>${event.location}</span>
                                    </div>
                                    <a href="event-details.html?id=${event.id}" class="btn ${buttonClass} btn-sm">${buttonText}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to render events
    function renderEvents() {
        const upcomingContainer = document.getElementById('events-container');
        const pastContainer = document.getElementById('past-events-container');
        
        // Clear existing content
        if (upcomingContainer) {
            upcomingContainer.innerHTML = '';
            eventsData.upcoming.forEach(event => {
                upcomingContainer.innerHTML += createEventCard(event);
            });
        }
        
        if (pastContainer) {
            pastContainer.innerHTML = '';
            eventsData.past.forEach(event => {
                pastContainer.innerHTML += createEventCard(event, true);
            });
        }
        
        // Initialize AOS after content is loaded
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }

    // Initialize the page
    renderEvents();

    // Handle window resize for AOS refresh
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 250);
    });
});
