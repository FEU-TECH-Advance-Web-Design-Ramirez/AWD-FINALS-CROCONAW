document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateHeaderForLoggedInUser(currentUser);
    }
    
    // Get project ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (projectId) {
        loadProjectDetails(projectId);
    }
    
    // Set up favorite and "I made it" buttons
    setupActionButtons();
    
    // Set up comment submission
    setupCommentSubmission();
});

function loadProjectDetails(projectId) {
    const publishedProjects = JSON.parse(localStorage.getItem('publishedProjects')) || [];
    const project = publishedProjects.find(p => p.id === projectId);
    
    if (!project) {
        // Redirect to projects page if project not found
        window.location.href = '../../../../pages/page3/index.html';
        return;
    }
    
    // Update project header
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-author').textContent = `By ${project.author}`;
    document.getElementById('project-introduction').textContent = project.introduction;
    
    // Update supplies section
    const suppliesContainer = document.getElementById('project-supplies');
    if (project.supplies) {
        // Convert supplies text to list items
        const suppliesList = document.createElement('ul');
        project.supplies.split('\n').forEach(item => {
            if (item.trim()) {
                const li = document.createElement('li');
                li.textContent = item.trim();
                suppliesList.appendChild(li);
            }
        });
        suppliesContainer.innerHTML = '';
        suppliesContainer.appendChild(suppliesList);
    }
    
    // Update project steps
    const stepsContainer = document.getElementById('project-steps');
    stepsContainer.innerHTML = '';
    
    if (project.steps && project.steps.length > 0) {
        project.steps.forEach(step => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step';
            
            stepElement.innerHTML = `
                <h2>STEP ${step.number}: ${step.title}</h2>
                <p>${step.description}</p>
            `;
            
            stepsContainer.appendChild(stepElement);
        });
    }
}

function setupActionButtons() {
    const favoriteButton = document.querySelector('.favorite-btn');
    const madeItButton = document.querySelector('.made-it-btn');
    
    if (favoriteButton) {
        favoriteButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
            this.style.color = icon.classList.contains('fa-solid') ? '#FB8143' : '#666';
        });
    }
    
    if (madeItButton) {
        madeItButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
            this.style.color = icon.classList.contains('fa-solid') ? '#FB8143' : '#666';
        });
    }
}

function setupCommentSubmission() {
    const commentForm = document.querySelector('.comment-input-area');
    const commentsList = document.getElementById('comments-list');
    
    if (commentForm) {
        const submitButton = commentForm.querySelector('.comment-btn');
        const textarea = commentForm.querySelector('textarea');
        
        submitButton.addEventListener('click', function() {
            const commentText = textarea.value.trim();
            
            if (commentText) {
                // Remove "no comments" message if it exists
                const noComments = commentsList.querySelector('.no-comments');
                if (noComments) {
                    noComments.remove();
                }
                
                // Create new comment element
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-item';
                
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                const username = currentUser ? currentUser.username : 'Anonymous';
                
                commentDiv.innerHTML = `
                    <div class="comment-info">
                        <span class="comment-author">${username}</span>
                        <span class="comment-date">${new Date().toLocaleDateString()}</span>
                    </div>
                    <div class="comment-content">${commentText}</div>
                `;
                
                commentsList.appendChild(commentDiv);
                textarea.value = '';
            }
        });
    }
}

function updateHeaderForLoggedInUser(user) {
    const navRight = document.querySelector('.nav-right');
    navRight.innerHTML = ''; // Clear default buttons

    // Create "Post" button
    const postButton = document.createElement('button');
    postButton.className = 'btn btn-primary';
    postButton.textContent = 'Post';
    postButton.onclick = function() {
        window.location.href = '../../../../pages/page4/index.html';
    };

    // Create user icon button
    const userButton = document.createElement('button');
    userButton.className = 'btn btn-secondary';
    userButton.innerHTML = '<i class="fas fa-user"></i>';
    userButton.onclick = function() {
        toggleUserMenu(user);
    };

    navRight.appendChild(postButton);
    navRight.appendChild(userButton);
}

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
    window.location.href = '../../../../pages/page5/index.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../../../../index.html';
}