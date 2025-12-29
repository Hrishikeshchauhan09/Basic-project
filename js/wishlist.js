// Wishlist Page JavaScript

// Load wishlist items
function loadWishlist() {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const user = users.find(u => u.email === currentUser.email);
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const wishlist = user.wishlist || [];
    const wishlistGrid = document.getElementById('wishlistGrid');
    const emptyWishlist = document.getElementById('emptyWishlist');

    if (wishlist.length === 0) {
        wishlistGrid.style.display = 'none';
        emptyWishlist.style.display = 'block';
        return;
    }

    wishlistGrid.style.display = 'flex';
    emptyWishlist.style.display = 'none';
    wishlistGrid.innerHTML = '';

    // Get all products
    const allProducts = getAllProducts();

    // Display wishlist items
    wishlist.forEach(productId => {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            const productCard = createWishlistCard(product);
            wishlistGrid.innerHTML += productCard;
        }
    });

    // Add event listeners
    attachWishlistEventListeners();
}

// Create wishlist product card
function createWishlistCard(product) {
    return `
        <div class="col-md-4 col-lg-3">
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" 
                            onclick="removeFromWishlist(${product.id})">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="product-body">
                    <div class="product-category">${product.category}</div>
                    <h5 class="product-name">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="btn btn-primary btn-sm" onclick="moveToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Remove from wishlist
function removeFromWishlist(productId) {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];

    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].wishlist = users[userIndex].wishlist.filter(id => id !== productId);
        localStorage.setItem('luxestyle_users', JSON.stringify(users));

        // Reload wishlist
        loadWishlist();

        // Show notification
        showToast('Removed from wishlist', 'success');
    }
}

// Move to cart
function moveToCart(productId) {
    const allProducts = getAllProducts();
    const product = allProducts.find(p => p.id === productId);

    if (product) {
        // Add to cart
        addToCart(product);

        // Remove from wishlist
        removeFromWishlist(productId);

        // Show notification
        showToast('Moved to cart!', 'success');
    }
}

// Toggle wishlist (for product pages)
function toggleWishlist(productId) {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
        if (!users[userIndex].wishlist) {
            users[userIndex].wishlist = [];
        }

        const wishlistIndex = users[userIndex].wishlist.indexOf(productId);

        if (wishlistIndex === -1) {
            // Add to wishlist
            users[userIndex].wishlist.push(productId);
            localStorage.setItem('luxestyle_users', JSON.stringify(users));
            showToast('Added to wishlist!', 'success');
            return true;
        } else {
            // Remove from wishlist
            users[userIndex].wishlist.splice(wishlistIndex, 1);
            localStorage.setItem('luxestyle_users', JSON.stringify(users));
            showToast('Removed from wishlist', 'success');
            return false;
        }
    }
}

// Check if product is in wishlist
function isInWishlist(productId) {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));

    if (!currentUser) {
        return false;
    }

    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];
    const user = users.find(u => u.email === currentUser.email);

    if (user && user.wishlist) {
        return user.wishlist.includes(productId);
    }

    return false;
}

// Show toast notification
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Attach event listeners
function attachWishlistEventListeners() {
    // Event listeners are attached via onclick in the HTML
}

// Initialize wishlist page
document.addEventListener('DOMContentLoaded', function () {
    loadWishlist();
});
