// Checkout Page JavaScript

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 10;
const TAX_RATE = 0.10;
let promoApplied = false;

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function () {
    // Check if cart is empty
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        showToast('Your cart is empty. Redirecting to products...', 'error');
        setTimeout(() => {
            window.location.href = 'products.html';
        }, 2000);
        return;
    }

    // Load order summary
    loadOrderSummary();

    // Check promo code status from cart
    const promoStatus = localStorage.getItem('luxestyle_promo_applied');
    if (promoStatus === 'true') {
        promoApplied = true;
        document.getElementById('promoDiscountSection').style.display = 'block';
    }

    // Check if user is logged in
    checkUserStatus();

    // Setup form handlers
    setupFormHandlers();

    // Pre-fill form if user is logged in
    prefillUserData();
});

// Check user login status
function checkUserStatus() {
    const currentUser = getCurrentUser();
    const guestNotice = document.getElementById('guestNotice');

    if (!currentUser) {
        guestNotice.style.display = 'block';
    } else {
        guestNotice.style.display = 'none';
    }
}

// Pre-fill form with user data if logged in
function prefillUserData() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.value = currentUser.email || '';
        }

        const firstNameField = document.getElementById('firstName');
        const lastNameField = document.getElementById('lastName');
        if (firstNameField && currentUser.firstName) {
            firstNameField.value = currentUser.firstName;
        }
        if (lastNameField && currentUser.lastName) {
            lastNameField.value = currentUser.lastName;
        }
    }
}

// Load order summary
function loadOrderSummary() {
    const cartItems = getCartItems();
    const orderItemsContainer = document.getElementById('orderItems');

    // Display cart items
    orderItemsContainer.innerHTML = cartItems.map(item => `
        <div class="order-summary-item mb-3">
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" 
                     style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" class="me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">Qty: ${item.quantity}</small>
                </div>
                <div class="text-end">
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            </div>
        </div>
    `).join('');

    // Update totals
    updateOrderTotals();
}

// Update order totals
function updateOrderTotals() {
    const subtotal = getCartTotal();
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = subtotal * TAX_RATE;
    let total = subtotal + shipping + tax;
    let discount = 0;

    // Apply promo discount if applicable
    if (promoApplied) {
        discount = total * 0.1;
        total -= discount;
    }

    document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summaryShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('summaryTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${total.toFixed(2)}`;

    if (promoApplied) {
        document.getElementById('summaryDiscount').textContent = `-$${discount.toFixed(2)}`;
    }
}

// Setup form handlers
function setupFormHandlers() {
    const checkoutForm = document.getElementById('checkoutForm');
    const sameAsShippingCheckbox = document.getElementById('sameAsShipping');
    const billingAddressFields = document.getElementById('billingAddressFields');

    // Toggle billing address fields
    if (sameAsShippingCheckbox) {
        sameAsShippingCheckbox.addEventListener('change', function () {
            if (this.checked) {
                billingAddressFields.style.display = 'none';
            } else {
                billingAddressFields.style.display = 'block';
            }
        });
    }

    // Format card number input
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Format expiry date input
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV input - numbers only
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // Form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
}

// Handle checkout form submission
function handleCheckoutSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateCheckoutForm()) {
        return;
    }

    // Get form data
    const formData = getFormData();

    // Create order
    const order = createOrder(formData);

    // Save order to user account if logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
        saveOrderToUser(order);
    }

    // Clear cart
    clearCart();

    // Clear promo status
    localStorage.removeItem('luxestyle_promo_applied');

    // Show success message
    showToast('Order placed successfully!', 'success');

    // Redirect to orders page or confirmation
    setTimeout(() => {
        if (currentUser) {
            window.location.href = 'orders.html';
        } else {
            // For guest users, show confirmation and redirect to home
            alert(`Thank you for your order!\n\nOrder ID: ${order.orderId}\n\nTotal: $${order.total.toFixed(2)}\n\nCreate an account to track your orders.`);
            window.location.href = 'index.html';
        }
    }, 1500);
}

// Validate checkout form
function validateCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    let isValid = true;

    // Clear previous validation states
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    // Email validation
    const email = document.getElementById('email').value.trim();
    if (!isValidEmail(email)) {
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    if (!isValidPhone(phone)) {
        document.getElementById('phone').classList.add('is-invalid');
        isValid = false;
    }

    // Required fields validation
    const requiredFields = [
        'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country',
        'cardNumber', 'cardName', 'expiryDate', 'cvv'
    ];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        }
    });

    // Card number validation
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (!isValidCardNumber(cardNumber)) {
        document.getElementById('cardNumber').classList.add('is-invalid');
        isValid = false;
    }

    // Expiry date validation
    const expiryDate = document.getElementById('expiryDate').value;
    if (!isValidExpiryDate(expiryDate)) {
        document.getElementById('expiryDate').classList.add('is-invalid');
        isValid = false;
    }

    // CVV validation
    const cvv = document.getElementById('cvv').value;
    if (!isValidCVV(cvv)) {
        document.getElementById('cvv').classList.add('is-invalid');
        isValid = false;
    }

    // ZIP code validation
    const zipCode = document.getElementById('zipCode').value;
    if (!isValidZipCode(zipCode)) {
        document.getElementById('zipCode').classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        showToast('Please fill in all required fields correctly.', 'error');
    }

    return isValid;
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidCardNumber(cardNumber) {
    // Basic validation: 13-19 digits
    return /^\d{13,19}$/.test(cardNumber);
}

function isValidExpiryDate(expiryDate) {
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        return false;
    }

    const [month, year] = expiryDate.split('/').map(num => parseInt(num));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (month < 1 || month > 12) {
        return false;
    }

    // Convert 2-digit year to full year for proper comparison
    const fullYear = year < 50 ? 2000 + year : 1900 + year;
    const currentFullYear = currentDate.getFullYear();

    // Check if the card is expired
    if (fullYear < currentFullYear || (fullYear === currentFullYear && month < currentMonth)) {
        return false;
    }

    return true;
}

function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function isValidZipCode(zipCode) {
    // Accept various zip code formats
    return /^[\d\w\s\-]{3,10}$/.test(zipCode);
}

// Get form data
function getFormData() {
    const sameAsShipping = document.getElementById('sameAsShipping').checked;

    const formData = {
        contact: {
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim()
        },
        shipping: {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            address: document.getElementById('address').value.trim(),
            apartment: document.getElementById('apartment').value.trim(),
            city: document.getElementById('city').value.trim(),
            state: document.getElementById('state').value.trim(),
            zipCode: document.getElementById('zipCode').value.trim(),
            country: document.getElementById('country').value
        },
        billing: sameAsShipping ? null : {
            firstName: document.getElementById('billingFirstName').value.trim(),
            lastName: document.getElementById('billingLastName').value.trim(),
            address: document.getElementById('billingAddress').value.trim(),
            city: document.getElementById('billingCity').value.trim(),
            state: document.getElementById('billingState').value.trim(),
            zipCode: document.getElementById('billingZipCode').value.trim()
        },
        payment: {
            cardNumber: document.getElementById('cardNumber').value.replace(/\s/g, ''),
            cardName: document.getElementById('cardName').value.trim(),
            expiryDate: document.getElementById('expiryDate').value,
            cvv: document.getElementById('cvv').value
        }
    };

    return formData;
}

// Create order object
function createOrder(formData) {
    const cartItems = getCartItems();
    const subtotal = getCartTotal();
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const tax = subtotal * TAX_RATE;
    let total = subtotal + shipping + tax;

    if (promoApplied) {
        total *= 0.9; // 10% discount
    }

    const order = {
        orderId: 'ORD' + Date.now(),
        date: new Date().toISOString(),
        items: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        })),
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
        promoApplied: promoApplied,
        status: 'processing',
        contact: formData.contact,
        shippingAddress: formData.shipping,
        billingAddress: formData.billing || formData.shipping
    };

    return order;
}

// Save order to user account
function saveOrderToUser(order) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
        if (!users[userIndex].orders) {
            users[userIndex].orders = [];
        }

        users[userIndex].orders.push(order);
        localStorage.setItem('luxestyle_users', JSON.stringify(users));
    }
}
