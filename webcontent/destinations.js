// destinations.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Initialize map
    const map = L.map('map').setView([7.1688, 37.7595], 10); // Tembaro coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Destination data
    const destinations = [
        {
            id: 1,
            name: "Mountain Vista",
            coordinates: [7.1688, 37.7595],
            category: "nature",
            description: "Breathtaking mountain views...",
            activities: ["Hiking", "Photography", "Camping"],
            bestTime: "October to February",
            images: ["mountain1.jpg", "mountain2.jpg", "mountain3.jpg"]
        },
        // Add more destinations
    ];

    // Add markers to map
    destinations.forEach(dest => {
        const marker = L.marker(dest.coordinates)
            .bindPopup(`
                <h3>${dest.name}</h3>
                <p>${dest.description.substring(0, 100)}...</p>
                <button onclick="openDestinationDetails(${dest.id})">View Details</button>
            `)
            .addTo(map);
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            destinationCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        destinationCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal functionality
function openDestinationDetails(id) {
    const modal = document.getElementById('destinationModal');
    const modalContent = modal.querySelector('.modal-body');
    const destination = destinations.find(d => d.id === id);

    modalContent.innerHTML = `
        <div class="destination-details">
            <h2>${destination.name}</h2>
            <div class="image-gallery">
                ${destination.images.map(img => `
                    <img src="images/destinations/${img}" alt="${destination.name}">
                `).join('')}
            </div>
            <div class="details-content">
                <p>${destination.description}</p>
                <h3>Activities</h3>
                <ul>
                    ${destination.activities.map(activity => `
                        <li>${activity}</li>
                    `).join('')}
                </ul>
                <p><strong>Best Time to Visit:</strong> ${destination.bestTime}</p>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('destinationModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('destinationModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});