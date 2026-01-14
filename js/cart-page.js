// Cart Page JavaScript

let promoApplied = false;
const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 10;
const TAX_RATE = 0.10;

// Load cart items
function loadCartItems() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
    } else {
        emptyCart.style.display = 'none';
        cartItemsContainer.innerHTML = cartItems.map(item => createCartItemHTML(item)).join('');
    }

    updateOrderSummary();
}

// Create cart item HTML
function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                </div>
                <div class="col-md-4">
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="text-muted mb-0">${item.category}</p>
                </div>
                <div class="col-md-2">
                    <p class="mb-0 fw-bold">$${item.price.toFixed(2)}</p>
                </div>
                <div class="col-md-2">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">
                            <i class="bi bi-dash"></i>
                        </button>
                        <input type="number" class="form-control text-center" value="${item.quantity}" 
                               min="1" style="width: 60px;" onchange="changeQuantity(${item.id}, this.value)">
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-2 text-end">
                    <p class="mb-2 fw-bold text-primary">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeCartItem(${item.id})">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
        loadCartItems();
    }
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        updateQuantity(productId, item.quantity + 1);
        loadCartItems();
    }
}

// Change quantity
function changeQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
        updateQuantity(productId, quantity);
        loadCartItems();
    }
}

// Remove cart item
function removeCartItem(productId) {
    if (confirm('Are you sure you want to remove this item?')) {
        removeFromCart(productId);
        loadCartItems();
    }
}

// Update order summary
function updateOrderSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = subtotal * TAX_RATE;
    let total = subtotal + shipping + tax;

    // Apply promo discount if applicable
    if (promoApplied) {
        total *= 0.9; // 10% discount
    }

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
    const promoMessage = document.getElementById('promoMessage');

    if (promoCode === 'LUXE10') {
        promoApplied = true;
        promoMessage.textContent = '10% discount applied!';
        promoMessage.style.display = 'block';
        updateOrderSummary();
        showToast('Promo code applied successfully!', 'success');
    } else if (promoCode === '') {
        showToast('Please enter a promo code', 'error');
    } else {
        promoMessage.textContent = 'Invalid promo code';
        promoMessage.classList.remove('text-success');
        promoMessage.classList.add('text-danger');
        promoMessage.style.display = 'block';
        showToast('Invalid promo code', 'error');
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }

    // Save promo status for checkout page
    localStorage.setItem('luxestyle_promo_applied', promoApplied.toString());

    // Redirect to checkout page
    showToast('Redirecting to checkout...', 'success');
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadCartItems();

    // Apply promo button
    const applyPromoBtn = document.getElementById('applyPromo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    // Allow Enter key for promo code
    const promoCodeInput = document.getElementById('promoCode');
    if (promoCodeInput) {
        promoCodeInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                applyPromoCode();
            }
        });
    }
});
