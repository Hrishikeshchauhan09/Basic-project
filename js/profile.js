// Profile Page JavaScript

// Load user profile data
function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Find full user data
    const user = users.find(u => u.email === currentUser.email);

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Update profile card
    document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;

    // Update statistics
    document.getElementById('totalOrders').textContent = (user.orders || []).length;
    document.getElementById('wishlistCount').textContent = (user.wishlist || []).length;

    // Format registration date
    const regDate = new Date(user.registeredAt);
    const formattedDate = regDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    document.getElementById('memberSince').textContent = formattedDate;

    // Update profile view
    document.getElementById('viewFirstName').textContent = user.firstName;
    document.getElementById('viewLastName').textContent = user.lastName;
    document.getElementById('viewEmail').textContent = user.email;
}

// Show alert message
function showProfileAlert(elementId, message, type) {
    const alertDiv = document.getElementById(elementId);
    alertDiv.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 5000);
}

// Toggle edit mode
function toggleEditMode(show) {
    const profileView = document.getElementById('profileView');
    const profileEdit = document.getElementById('profileEdit');
    const editBtn = document.getElementById('editProfileBtn');

    if (show) {
        // Load current data into edit form
        const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
        const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];
        const user = users.find(u => u.email === currentUser.email);

        if (user) {
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editEmail').value = user.email;
        }

        profileView.style.display = 'none';
        profileEdit.style.display = 'block';
        editBtn.style.display = 'none';
    } else {
        profileView.style.display = 'block';
        profileEdit.style.display = 'none';
        editBtn.style.display = 'inline-block';
    }
}

// Save profile changes
function saveProfile(e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];

    const firstName = document.getElementById('editFirstName').value.trim();
    const lastName = document.getElementById('editLastName').value.trim();
    const email = document.getElementById('editEmail').value.trim();

    // Validate
    if (!firstName || !lastName || !email) {
        alert('Please fill in all fields');
        return;
    }

    // Check if email is already taken by another user
    const emailExists = users.find(u => u.email === email && u.email !== currentUser.email);
    if (emailExists) {
        alert('This email is already in use');
        return;
    }

    // Update user data
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].firstName = firstName;
        users[userIndex].lastName = lastName;
        users[userIndex].email = email;

        // Save to localStorage
        localStorage.setItem('luxestyle_users', JSON.stringify(users));

        // Update current user session
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
        currentUser.email = email;
        localStorage.setItem('luxestyle_current_user', JSON.stringify(currentUser));

        // Reload profile
        loadProfile();
        toggleEditMode(false);

        // Show success message
        window.scrollTo(0, 0);
        setTimeout(() => {
            alert('Profile updated successfully!');
        }, 100);
    }
}

// Change password
function changePassword(e) {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];

    const user = users.find(u => u.email === currentUser.email);

    if (!user) {
        showProfileAlert('passwordAlert', 'User not found', 'danger');
        return;
    }

    // Verify current password
    if (user.password !== currentPassword) {
        showProfileAlert('passwordAlert', 'Current password is incorrect', 'danger');
        return;
    }

    // Validate new password
    if (newPassword.length < 8) {
        showProfileAlert('passwordAlert', 'New password must be at least 8 characters long', 'danger');
        return;
    }

    if (newPassword !== confirmNewPassword) {
        showProfileAlert('passwordAlert', 'New passwords do not match', 'danger');
        return;
    }

    // Update password
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('luxestyle_users', JSON.stringify(users));

        // Clear form
        document.getElementById('changePasswordForm').reset();

        showProfileAlert('passwordAlert', 'Password changed successfully!', 'success');
    }
}

// Initialize profile page
document.addEventListener('DOMContentLoaded', function () {
    loadProfile();

    // Edit profile button
    document.getElementById('editProfileBtn').addEventListener('click', function () {
        toggleEditMode(true);
    });

    // Cancel edit button
    document.getElementById('cancelEditBtn').addEventListener('click', function () {
        toggleEditMode(false);
    });

    // Save profile form
    document.getElementById('editProfileForm').addEventListener('submit', saveProfile);

    // Change password form
    document.getElementById('changePasswordForm').addEventListener('submit', changePassword);
});
