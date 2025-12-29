// Authentication System for LuxeStyle

// Initialize users from localStorage
let users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];

// Check if user is already logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    if (currentUser && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
}

// Require authentication for protected pages
function requireAuth() {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    const protectedPages = ['profile.html', 'orders.html', 'wishlist.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = 'login.html';
    }
}

// Show alert message
function showAlert(elementId, message, type) {
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

// Password visibility toggle
function setupPasswordToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);

    if (toggle && input) {
        toggle.addEventListener('click', function () {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            // Toggle icon
            this.classList.toggle('bi-eye');
            this.classList.toggle('bi-eye-slash');
        });
    }
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthIndicator = {
        text: '',
        class: ''
    };

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    // Determine strength level
    if (strength <= 2) {
        strengthIndicator.text = 'Weak password';
        strengthIndicator.class = 'weak';
    } else if (strength <= 4) {
        strengthIndicator.text = 'Medium password';
        strengthIndicator.class = 'medium';
    } else {
        strengthIndicator.text = 'Strong password';
        strengthIndicator.class = 'strong';
    }

    return strengthIndicator;
}

// Setup password strength indicator
function setupPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (passwordInput && strengthContainer) {
        passwordInput.addEventListener('input', function () {
            const password = this.value;

            if (password.length > 0) {
                strengthContainer.style.display = 'block';
                const strength = checkPasswordStrength(password);

                // Update strength bar
                strengthFill.className = 'strength-fill ' + strength.class;
                strengthText.textContent = strength.text;
            } else {
                strengthContainer.style.display = 'none';
            }
        });
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Login Form Handler
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Validate email format
            if (!isValidEmail(email)) {
                showAlert('loginAlert', 'Please enter a valid email address.', 'danger');
                return;
            }

            // Find user
            const user = users.find(u => u.email === email);

            if (!user) {
                showAlert('loginAlert', 'No account found with this email address.', 'danger');
                return;
            }

            // Check password
            if (user.password !== password) {
                showAlert('loginAlert', 'Incorrect password. Please try again.', 'danger');
                return;
            }

            // Successful login
            const currentUser = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe
            };

            localStorage.setItem('luxestyle_current_user', JSON.stringify(currentUser));

            showAlert('loginAlert', 'Login successful! Redirecting...', 'success');

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
}

// Registration Form Handler
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            // Validation
            if (!firstName || !lastName) {
                showAlert('registerAlert', 'Please enter your full name.', 'danger');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('registerAlert', 'Please enter a valid email address.', 'danger');
                return;
            }

            // Check if email already exists
            if (users.find(u => u.email === email)) {
                showAlert('registerAlert', 'An account with this email already exists.', 'danger');
                return;
            }

            // Password validation
            if (password.length < 8) {
                showAlert('registerAlert', 'Password must be at least 8 characters long.', 'danger');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('registerAlert', 'Passwords do not match.', 'danger');
                return;
            }

            if (!agreeTerms) {
                showAlert('registerAlert', 'Please agree to the Terms of Service and Privacy Policy.', 'danger');
                return;
            }

            // Create new user
            const newUser = {
                firstName,
                lastName,
                email,
                password,
                registeredAt: new Date().toISOString(),
                wishlist: [],
                orders: []
            };

            users.push(newUser);
            localStorage.setItem('luxestyle_users', JSON.stringify(users));

            showAlert('registerAlert', 'Account created successfully! Redirecting to login...', 'success');

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
}

// Logout function
function logout() {
    localStorage.removeItem('luxestyle_current_user');
    window.location.href = 'login.html';
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('luxestyle_current_user'));
}

// Update navbar with user info
function updateNavbarForUser() {
    const currentUser = getCurrentUser();
    const navbar = document.querySelector('#navbarNav .navbar-nav');

    if (currentUser && navbar) {
        // Find the admin link and replace it with user menu
        const adminLink = navbar.querySelector('a[href="admin.html"]');
        if (adminLink) {
            const parentLi = adminLink.closest('li');

            // Create user dropdown
            const userDropdown = document.createElement('li');
            userDropdown.className = 'nav-item dropdown';
            userDropdown.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="bi bi-person-circle"></i> ${currentUser.firstName}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2"></i>My Profile</a></li>
                    <li><a class="dropdown-item" href="orders.html"><i class="bi bi-bag me-2"></i>My Orders</a></li>
                    <li><a class="dropdown-item" href="wishlist.html"><i class="bi bi-heart me-2"></i>Wishlist</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="admin.html"><i class="bi bi-gear me-2"></i>Admin</a></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                </ul>
            `;

            parentLi.replaceWith(userDropdown);
        }
    }
}

// Initialize authentication system
document.addEventListener('DOMContentLoaded', function () {
    // Check authentication status
    checkAuth();
    requireAuth();

    // Setup password toggles
    setupPasswordToggle('togglePassword', 'loginPassword');
    setupPasswordToggle('togglePassword', 'registerPassword');
    setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

    // Setup password strength indicator
    setupPasswordStrength();

    // Setup forms
    setupLoginForm();
    setupRegisterForm();

    // Update navbar if user is logged in
    updateNavbarForUser();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCurrentUser,
        logout,
        updateNavbarForUser
    };
}
