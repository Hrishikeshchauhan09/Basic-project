// Order Success Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Get order data from localStorage
    const orderData = JSON.parse(localStorage.getItem('luxestyle_last_order'));

    if (!orderData) {
        // No order data found, redirect to home
        showToast('No order information found.', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }

    // Display order information
    displayOrderDetails(orderData);

    // Clear the last order from localStorage after displaying
    // (Optional: keep it if you want users to be able to refresh the page)
    // localStorage.removeItem('luxestyle_last_order');
});

function displayOrderDetails(order) {
    // Order ID and Date
    document.getElementById('orderId').textContent = order.orderId;
    document.getElementById('orderDate').textContent = formatDate(order.date);
    document.getElementById('orderTotal').textContent = `$${order.total.toFixed(2)}`;

    // Order Items
    displayOrderItems(order.items);

    // Shipping Address
    displayShippingAddress(order.shippingAddress);

    // Contact Information
    displayContactInfo(order.contact);

    // Order Summary
    displayOrderSummary(order);
}

function displayOrderItems(items) {
    const orderItemsList = document.getElementById('orderItemsList');

    // Get product details for each item
    const products = getAllProducts();

    orderItemsList.innerHTML = items.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';

        return `
            <div class="order-item mb-3">
                <div class="d-flex align-items-center">
                    <img src="${product.image}" alt="${product.name}" 
                         style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" class="me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${product.name}</h6>
                        <p class="text-muted mb-0 small">${product.category}</p>
                        <p class="mb-0">
                            <span class="text-muted">Quantity:</span> ${item.quantity} × 
                            <span class="text-muted">Price:</span> $${item.price.toFixed(2)}
                        </p>
                    </div>
                    <div class="text-end">
                        <strong class="text-primary">$${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function displayShippingAddress(address) {
    const shippingAddressDiv = document.getElementById('shippingAddress');

    shippingAddressDiv.innerHTML = `
        <p class="mb-1"><strong>${address.firstName} ${address.lastName}</strong></p>
        <p class="mb-1">${address.address}</p>
        ${address.apartment ? `<p class="mb-1">${address.apartment}</p>` : ''}
        <p class="mb-1">${address.city}, ${address.state} ${address.zipCode}</p>
        <p class="mb-0">${address.country}</p>
    `;
}

function displayContactInfo(contact) {
    const contactInfoDiv = document.getElementById('contactInfo');

    contactInfoDiv.innerHTML = `
        <p class="mb-1">
            <i class="bi bi-envelope me-2"></i>
            <strong>Email:</strong><br>
            ${contact.email}
        </p>
        <p class="mb-0 mt-2">
            <i class="bi bi-telephone me-2"></i>
            <strong>Phone:</strong><br>
            ${contact.phone}
        </p>
    `;
}

function displayOrderSummary(order) {
    document.getElementById('summarySubtotal').textContent = `$${order.subtotal.toFixed(2)}`;
    document.getElementById('summaryShipping').textContent = order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`;
    document.getElementById('summaryTax').textContent = `$${order.tax.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${order.total.toFixed(2)}`;

    if (order.promoApplied) {
        const discount = (order.subtotal + order.shipping + order.tax) * 0.1;
        document.getElementById('promoDiscountSection').style.display = 'block';
        document.getElementById('summaryDiscount').textContent = `-$${discount.toFixed(2)}`;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}
