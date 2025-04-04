// Function to toggle the user menu on the Home page
function toggleUserMenu(user) {
    const existingMenu = document.getElementById('user-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }

    const userMenu = document.createElement('div');
    userMenu.id = 'user-menu';
    
    userMenu.innerHTML = `
        <div>${user.username}</div>
        <div>${user.email}</div>
        <hr>
        <div onclick="navigateToProfile()">Profile</div>
        <div onclick="logout()">Logout</div>
    `;
    
    document.body.appendChild(userMenu);
    
    // Close the menu when clicking outside of it
    document.addEventListener('click', function closeMenu(e) {
        if (!userMenu.contains(e.target) && e.target !== document.querySelector('.nav-right .btn-secondary')) {
            userMenu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
}

// Navigation functions for the user menu
function navigateToProfile() {
    // Adjust the destination as needed
    window.location.href = '../../pages/page5/index.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    // Optionally, redirect to the login page
    window.location.href = '../../index.html';
}

// Function to update the header for a logged-in user
function updateHeaderForLoggedInUser(user) {
    const navRight = document.querySelector('.nav-right');
    navRight.innerHTML = ''; // Clear default buttons

    // Create "Post" button
    const postButton = document.createElement('button');
    postButton.className = 'btn btn-primary';
    postButton.textContent = 'Post';
    postButton.onclick = function() {
        // Navigate to your post creation page (adjust the URL as needed)
        window.location.href = '../../pages/page4/index.html';
    };

    // Create user icon button with click event to toggle the user menu
    const userButton = document.createElement('button');
    userButton.className = 'btn btn-secondary';
    userButton.innerHTML = '<i class="fas fa-user"></i>';
    userButton.onclick = function(e) {
        // Stop event propagation to avoid closing the menu immediately
        e.stopPropagation();
        toggleUserMenu(user);
    };

    navRight.appendChild(postButton);
    navRight.appendChild(userButton);
}

let currentSlide = 0;
const heroBackgrounds = [
    '../../assets/img/hero-background.png', // Use your actual image paths
    '../../assets/img/hero2.png',
    '../../assets/img/hero3.jpg',
];

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + heroBackgrounds.length) % heroBackgrounds.length;
    const heroSection = document.querySelector('.hero');
    heroSection.style.backgroundImage = `url('${heroBackgrounds[currentSlide]}')`;
}

// Add event listeners for slider arrows
document.addEventListener('DOMContentLoaded', function() {
    // Check if a user is logged in and update the header accordingly
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateHeaderForLoggedInUser(currentUser);
    }
    
    // Add event listeners for slider arrows
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => changeSlide(-1));
        rightArrow.addEventListener('click', () => changeSlide(1));
    }
    
    // Setup smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});