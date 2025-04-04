// DOM Elements
const dashboardNav = document.getElementById('dashboard-nav');
const permissionsNav = document.getElementById('permissions-nav');
const logoutNav = document.getElementById('logout-nav');
const dashboardPanel = document.getElementById('dashboard-panel');
const permissionsPanel = document.getElementById('permissions-panel');
const permissionsTableBody = document.getElementById('permissions-table-body');

// Sample permissions data
const permissionsData = [
    { id: 1, name: "User 1", title: "Admin Access", category: "System", status: "Review" },
    { id: 2, name: "User 2", title: "Content Editor", category: "Content", status: "Review" },
    { id: 3, name: "User 3", title: "Moderator", category: "Community", status: "Pending" },
    { id: 4, name: "User 4", title: "Viewer", category: "Reports", status: "Posted" }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set up navigation click events
    if (dashboardNav) {
        dashboardNav.addEventListener('click', function(e) {
            e.preventDefault();
            showDashboard();
        });
    }
    
    if (permissionsNav) {
        permissionsNav.addEventListener('click', function(e) {
            e.preventDefault();
            showPermissions();
        });
    }
    
    if (logoutNav) {
        logoutNav.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
    
    // Populate permissions table
    populatePermissionsTable();
    
    // Show permissions panel by default
    showPermissions();
});

// Show Dashboard Panel
function showDashboard() {
    // Update active navigation
    dashboardNav.classList.add('active');
    permissionsNav.classList.remove('active');
    
    // Show dashboard panel, hide permissions panel
    dashboardPanel.classList.remove('hidden');
    permissionsPanel.classList.add('hidden');
}

// Show Permissions Panel
function showPermissions() {
    // Update active navigation
    permissionsNav.classList.add('active');
    dashboardNav.classList.remove('active');
    
    // Show permissions panel, hide dashboard panel
    permissionsPanel.classList.remove('hidden');
    dashboardPanel.classList.add('hidden');
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real app, this would redirect to logout endpoint
        alert('Logout functionality will be implemented when the site is complete.');
    }
}

// Populate Permissions Table
function populatePermissionsTable() {
    if (permissionsTableBody) {
        permissionsTableBody.innerHTML = '';
        
        permissionsData.forEach(permission => {
            const row = document.createElement('tr');
            
            // Format status badge class based on status value
            const statusClass = `status-${permission.status.toLowerCase()}`;
            
            row.innerHTML = `
                <td>${permission.id}</td>
                <td>${permission.name}</td>
                <td>${permission.title}</td>
                <td>${permission.category}</td>
                <td><span class="status-badge ${statusClass}">${permission.status}</span></td>
            `;
            
            permissionsTableBody.appendChild(row);
        });
    }
}