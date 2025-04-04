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
    window.location.href = 'profile.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    // Optionally, redirect to the login page
    window.location.href = '../../../../index.html';
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
        window.location.href = '../../../../pages/page4/index.html';
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

// On page load, check if a user is logged in and update the header accordingly
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateHeaderForLoggedInUser(currentUser);
    }
});



// Project data
const projects = [
    {
        title: 'Stair Remodel',
        category: 'renovation',
        image: './PinoyFix-logo.png',
        description: 'by View in Home Improvement'
    },
    {
        title: 'DIY Power Room Renovation',
        category: 'renovation',
        image: './PinoyFix-logo.png',
        description: 'Description of second product'
    },
    {
        title: 'Installing Laminate Flooring',
        category: 'renovation',
        image: './PinoyFix-logo.png',
        description: 'Description of fourth product'
    },
    {
        title: 'Custom Birch Ply',
        category: 'furniture',
        image: './PinoyFix-logo.png',
        description: 'Description of third product'
    },
    {
        title: 'Custom Stencil',
        category: 'furniture',
        image: './PinoyFix-logo.png',
        description: 'Description of fifth product'
    },
    {
        title: 'Renew Teak Garden',
        category: 'furniture',
        image: './PinoyFix-logo.png',
        description: 'Description of third product'
    },
    {
        title: 'A Quick Battery Holder',
        category: 'electrical',
        image: './PinoyFix-logo.png',
        description: 'Description of sixth product'
    },
    {
        title: 'Awesome Electrical Figthing Helicopter',
        category: 'electrical',
        image: './PinoyFix-logo.png',
        description: 'Description of sixth product'
    },
    {
        title: 'Fake Electrical Outlet',
        category: 'electrical',
        image: './PinoyFix-logo.png',
        description: 'Description of sixth product'
    },
];

// Function to render projects
function renderProjects(filter = 'all') {
    const projectGrid = document.getElementById('projectGrid');
    projectGrid.innerHTML = ''; // Clear existing projects

    // Filter projects
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);

    // Create project cards
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });
}

// Function to handle category filtering
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter category and render projects
            const filter = button.dataset.filter;
            renderProjects(filter);
        });
    });
}

// Function to handle search
function searchProjects() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(searchInput) || 
        project.description.toLowerCase().includes(searchInput)
    );

    const projectGrid = document.getElementById('projectGrid');
    projectGrid.innerHTML = ''; // Clear existing projects

    // Create project cards for filtered projects
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(); // Initial render of all projects
    setupCategoryFilters(); // Set up category filter event listeners
});