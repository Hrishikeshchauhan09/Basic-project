// Orders Page JavaScript

// Load user orders
function loadOrders() {
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

    const orders = user.orders || [];
    const ordersContainer = document.getElementById('ordersContainer');
    const emptyOrders = document.getElementById('emptyOrders');

    if (orders.length === 0) {
        ordersContainer.style.display = 'none';
        emptyOrders.style.display = 'block';
        return;
    }

    ordersContainer.style.display = 'block';
    emptyOrders.style.display = 'none';
    ordersContainer.innerHTML = '';

    // Sort orders by date (newest first)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Display orders
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersContainer.innerHTML += orderCard;
    });
}

// Create order card
function createOrderCard(order) {
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const statusColors = {
        'pending': 'warning',
        'processing': 'info',
        'shipped': 'primary',
        'delivered': 'success',
        'cancelled': 'danger'
    };

    const statusColor = statusColors[order.status] || 'secondary';

    // Get product details
    const allProducts = getAllProducts();
    let itemsHTML = '';

    order.items.forEach(item => {
        const product = allProducts.find(p => p.id === item.productId);
        if (product) {
            itemsHTML += `
                <div class="d-flex align-items-center mb-2">
                    <img src="${product.image}" alt="${product.name}" 
                         style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" class="me-3">
                    <div class="flex-grow-1">
                        <div class="fw-semibold">${product.name}</div>
                        <small class="text-muted">Qty: ${item.quantity} × $${item.price.toFixed(2)}</small>
                    </div>
                    <div class="fw-semibold">$${(item.quantity * item.price).toFixed(2)}</div>
                </div>
            `;
        }
    });

    return `
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <div class="row align-items-center mb-3">
                    <div class="col-md-6">
                        <h5 class="mb-1">Order #${order.orderId}</h5>
                        <small class="text-muted">
                            <i class="bi bi-calendar me-1"></i>${formattedDate}
                        </small>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <span class="badge bg-${statusColor} px-3 py-2">
                            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>
                </div>
                
                <hr>
                
                <div class="mb-3">
                    ${itemsHTML}
                </div>
                
                <hr>
                
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Total:</strong>
                        <span class="text-primary fs-5 ms-2">$${order.total.toFixed(2)}</span>
                    </div>
                    <div>
                        <button class="btn btn-outline-primary btn-sm" onclick="viewOrderDetails('${order.orderId}')">
                            <i class="bi bi-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// View order details (placeholder for future implementation)
function viewOrderDetails(orderId) {
    alert(`Order details for #${orderId} will be displayed here.`);
}

// Create a test order (for demonstration)
function createTestOrder() {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];

    if (!currentUser) {
        return;
    }

    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        if (!users[userIndex].orders) {
            users[userIndex].orders = [];
        }

        // Create a sample order
        const testOrder = {
            orderId: 'ORD' + Date.now(),
            date: new Date().toISOString(),
            items: [
                { productId: 1, quantity: 1, price: 299.99 },
                { productId: 2, quantity: 2, price: 149.99 }
            ],
            total: 599.97,
            status: 'processing'
        };

        users[userIndex].orders.push(testOrder);
        localStorage.setItem('luxestyle_users', JSON.stringify(users));

        loadOrders();
    }
}

// Initialize orders page
document.addEventListener('DOMContentLoaded', function () {
    loadOrders();
});
