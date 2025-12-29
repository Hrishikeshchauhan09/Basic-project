// Products Page JavaScript

let currentFilters = {
    category: 'all',
    gender: 'all',
    price: 'all',
    search: '',
    sort: 'default'
};

// Load and display products
function loadProducts() {
    let filteredProducts = getAllProducts();

    // Apply category filter
    if (currentFilters.category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilters.category);
    }

    // Apply gender filter
    if (currentFilters.gender !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.gender === currentFilters.gender);
    }

    // Apply price filter
    filteredProducts = filterByPrice(filteredProducts, currentFilters.price);

    // Apply search filter
    if (currentFilters.search) {
        filteredProducts = searchProducts(currentFilters.search);
    }

    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, currentFilters.sort);

    // Display products
    displayProducts(filteredProducts);
    updateProductCount(filteredProducts.length);
}

// Display products in grid
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');

    if (products.length === 0) {
        productsGrid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        productsGrid.innerHTML = products.map(product =>
            createProductCard(product)
        ).join('');

        // Add click event to product cards to open modal
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function (e) {
                if (!e.target.closest('.btn-add-cart')) {
                    const productId = parseInt(this.dataset.productId);
                    openProductModal(productId);
                }
            });
        });
    }
}

// Update product count
function updateProductCount(count) {
    const productCount = document.getElementById('productCount');
    if (count === 0) {
        productCount.textContent = 'No products found';
    } else if (count === 1) {
        productCount.textContent = 'Showing 1 product';
    } else {
        productCount.textContent = `Showing ${count} products`;
    }
}

// Open product modal
function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalCategory').textContent = `${product.category} • ${product.gender}`;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalQuantity').value = 1;

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();

    // Set up add to cart button
    document.getElementById('modalAddToCart').onclick = function () {
        const quantity = parseInt(document.getElementById('modalQuantity').value);
        addToCart(productId, quantity);
        modal.hide();
    };
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadProducts();

    // Search filter
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        currentFilters.search = this.value;
        loadProducts();
    });

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', function () {
        currentFilters.category = this.value;
        loadProducts();
    });

    // Gender filter
    const genderFilter = document.getElementById('genderFilter');
    genderFilter.addEventListener('change', function () {
        currentFilters.gender = this.value;
        loadProducts();
    });

    // Price filter
    const priceFilter = document.getElementById('priceFilter');
    priceFilter.addEventListener('change', function () {
        currentFilters.price = this.value;
        loadProducts();
    });

    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    sortFilter.addEventListener('change', function () {
        currentFilters.sort = this.value;
        loadProducts();
    });

    // Reset filters
    const resetFilters = document.getElementById('resetFilters');
    resetFilters.addEventListener('click', function () {
        currentFilters = {
            category: 'all',
            gender: 'all',
            price: 'all',
            search: '',
            sort: 'default'
        };

        searchInput.value = '';
        categoryFilter.value = 'all';
        genderFilter.value = 'all';
        priceFilter.value = 'all';
        sortFilter.value = 'default';

        loadProducts();
    });

    // Check for category in URL query parameters or hash
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const hash = window.location.hash.substring(1);

    if (categoryParam) {
        currentFilters.category = categoryParam;
        categoryFilter.value = categoryParam;
        loadProducts();
    } else if (hash) {
        currentFilters.category = hash;
        categoryFilter.value = hash;
        loadProducts();
    }
});
