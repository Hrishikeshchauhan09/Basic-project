// Admin Page JavaScript

// Load admin dashboard
function loadAdminDashboard() {
    loadProductsTable();
    updateStats();
}

// Load products table
function loadProductsTable() {
    const productsTable = document.getElementById('productsTable');
    const allProducts = getAllProducts();

    productsTable.innerHTML = allProducts.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="table-img"></td>
            <td>${product.name}</td>
            <td><span class="badge bg-primary">${product.category}</span></td>
            <td><span class="badge bg-info">${product.gender}</span></td>
            <td>$${product.price.toFixed(2)}</td>
            <td><span class="badge bg-success">In Stock</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct(${product.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Update statistics
function updateStats() {
    const allProducts = getAllProducts();
    const totalValue = allProducts.reduce((sum, product) => sum + product.price, 0);

    document.getElementById('totalProducts').textContent = allProducts.length;
    document.getElementById('totalValue').textContent = `$${totalValue.toFixed(0)}`;
    document.getElementById('lowStock').textContent = '0';
}

// Add new product
function addNewProduct() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const gender = document.getElementById('productGender').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;
    const image = document.getElementById('productImage').value;

    if (!name || !category || !gender || !price || !description || !image) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    const newProduct = {
        id: products.length + 1,
        name,
        category,
        gender,
        price,
        description,
        image
    };

    products.push(newProduct);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    modal.hide();

    // Reset form
    document.getElementById('addProductForm').reset();

    // Reload table
    loadProductsTable();
    updateStats();

    showToast('Product added successfully!', 'success');
}

// Edit product
function editProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;

    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductGender').value = product.gender;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductImage').value = product.image;

    const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
    modal.show();
}

// Update product
function updateProductData() {
    const id = parseInt(document.getElementById('editProductId').value);
    const product = products.find(p => p.id === id);

    if (!product) return;

    product.name = document.getElementById('editProductName').value;
    product.category = document.getElementById('editProductCategory').value;
    product.gender = document.getElementById('editProductGender').value;
    product.price = parseFloat(document.getElementById('editProductPrice').value);
    product.description = document.getElementById('editProductDescription').value;
    product.image = document.getElementById('editProductImage').value;

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
    modal.hide();

    // Reload table
    loadProductsTable();

    showToast('Product updated successfully!', 'success');
}

// Delete product
function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    const index = products.findIndex(p => p.id === productId);
    if (index > -1) {
        products.splice(index, 1);
        loadProductsTable();
        updateStats();
        showToast('Product deleted successfully!', 'success');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadAdminDashboard();

    // Save product button
    const saveProductBtn = document.getElementById('saveProduct');
    if (saveProductBtn) {
        saveProductBtn.addEventListener('click', addNewProduct);
    }

    // Update product button
    const updateProductBtn = document.getElementById('updateProduct');
    if (updateProductBtn) {
        updateProductBtn.addEventListener('click', updateProductData);
    }
});
