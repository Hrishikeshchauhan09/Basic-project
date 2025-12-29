// Product Database
const products = [
    // Rings
    {
        id: 1,
        name: "Diamond Solitaire Ring",
        category: "rings",
        gender: "women",
        price: 299.99,
        description: "Elegant 18K white gold solitaire ring with brilliant cut diamond. Perfect for engagements or special occasions.",
        image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?w=500&h=500&fit=crop"
    },
    {
        id: 2,
        name: "Titanium Band Ring",
        category: "rings",
        gender: "men",
        price: 89.99,
        description: "Sleek titanium band with brushed finish. Durable and stylish for everyday wear.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Titanium+Ring"
    },
    {
        id: 3,
        name: "Rose Gold Eternity Ring",
        category: "rings",
        gender: "women",
        price: 199.99,
        description: "Beautiful rose gold eternity ring with continuous diamond setting. Symbol of eternal love.",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop"
    },
    {
        id: 4,
        name: "Signet Ring",
        category: "rings",
        gender: "men",
        price: 149.99,
        description: "Classic gold signet ring with customizable engraving. Timeless masculine elegance.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Signet+Ring"
    },

    // Chains
    {
        id: 5,
        name: "Cuban Link Chain",
        category: "chains",
        gender: "men",
        price: 249.99,
        description: "Bold 14K gold Cuban link chain. Statement piece for the modern gentleman.",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop"
    },
    {
        id: 6,
        name: "Pearl Necklace",
        category: "chains",
        gender: "women",
        price: 179.99,
        description: "Classic freshwater pearl necklace with sterling silver clasp. Timeless elegance.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop"
    },
    {
        id: 7,
        name: "Silver Chain Necklace",
        category: "chains",
        gender: "unisex",
        price: 79.99,
        description: "Minimalist sterling silver chain. Perfect for layering or wearing solo.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Silver+Chain"
    },
    {
        id: 8,
        name: "Pendant Chain Set",
        category: "chains",
        gender: "women",
        price: 159.99,
        description: "Delicate gold chain with heart pendant. Romantic and sophisticated.",
        image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&h=500&fit=crop"
    },

    // Bracelets
    {
        id: 9,
        name: "Leather Bracelet",
        category: "bracelets",
        gender: "men",
        price: 49.99,
        description: "Genuine leather bracelet with stainless steel clasp. Rugged and stylish.",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop"
    },
    {
        id: 10,
        name: "Tennis Bracelet",
        category: "bracelets",
        gender: "women",
        price: 399.99,
        description: "Stunning diamond tennis bracelet in white gold. Luxury at its finest.",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop"
    },
    {
        id: 11,
        name: "Charm Bracelet",
        category: "bracelets",
        gender: "women",
        price: 129.99,
        description: "Sterling silver charm bracelet with customizable charms. Tell your story.",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=500&fit=crop"
    },
    {
        id: 12,
        name: "Beaded Bracelet",
        category: "bracelets",
        gender: "unisex",
        price: 39.99,
        description: "Natural stone beaded bracelet. Bohemian style meets modern design.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Beaded+Bracelet"
    },

    // Perfumes
    {
        id: 13,
        name: "Noir Elegance",
        category: "perfumes",
        gender: "men",
        price: 89.99,
        description: "Sophisticated woody fragrance with notes of cedar, vetiver, and amber. Long-lasting and captivating.",
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=500&fit=crop"
    },
    {
        id: 14,
        name: "Rose Garden",
        category: "perfumes",
        gender: "women",
        price: 119.99,
        description: "Romantic floral perfume with rose, jasmine, and vanilla notes. Feminine and enchanting.",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop"
    },
    {
        id: 15,
        name: "Ocean Breeze",
        category: "perfumes",
        gender: "unisex",
        price: 79.99,
        description: "Fresh aquatic fragrance with citrus and marine notes. Perfect for daily wear.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Ocean+Breeze"
    },
    {
        id: 16,
        name: "Midnight Oud",
        category: "perfumes",
        gender: "men",
        price: 149.99,
        description: "Luxurious oriental fragrance with oud, saffron, and leather. Bold and mysterious.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Midnight+Oud"
    },

    // Watches
    {
        id: 17,
        name: "Chronograph Watch",
        category: "watches",
        gender: "men",
        price: 499.99,
        description: "Premium stainless steel chronograph with sapphire crystal. Swiss movement precision.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&h=500&fit=crop"
    },
    {
        id: 18,
        name: "Diamond Watch",
        category: "watches",
        gender: "women",
        price: 599.99,
        description: "Elegant rose gold watch with diamond-studded bezel. Luxury timepiece.",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&h=500&fit=crop"
    },
    {
        id: 19,
        name: "Smartwatch Elite",
        category: "watches",
        gender: "unisex",
        price: 349.99,
        description: "Advanced smartwatch with fitness tracking and notifications. Style meets technology.",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop"
    },
    {
        id: 20,
        name: "Minimalist Watch",
        category: "watches",
        gender: "unisex",
        price: 199.99,
        description: "Clean Scandinavian design with leather strap. Timeless simplicity.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
    },

    // Wallets
    {
        id: 21,
        name: "Leather Bifold Wallet",
        category: "wallets",
        gender: "men",
        price: 79.99,
        description: "Premium full-grain leather bifold wallet. Classic and durable.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop"
    },
    {
        id: 22,
        name: "Designer Clutch Wallet",
        category: "wallets",
        gender: "women",
        price: 129.99,
        description: "Elegant leather clutch wallet with gold hardware. Sophisticated style.",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&h=500&fit=crop"
    },
    {
        id: 23,
        name: "RFID Blocking Wallet",
        category: "wallets",
        gender: "unisex",
        price: 59.99,
        description: "Modern slim wallet with RFID protection. Security meets style.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=RFID+Wallet"
    },
    {
        id: 24,
        name: "Card Holder",
        category: "wallets",
        gender: "unisex",
        price: 39.99,
        description: "Minimalist leather card holder. Perfect for essentials only.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Card+Holder"
    },

    // Belts
    {
        id: 25,
        name: "Leather Dress Belt",
        category: "belts",
        gender: "men",
        price: 69.99,
        description: "Classic Italian leather belt with silver buckle. Professional elegance.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Leather+Belt"
    },
    {
        id: 26,
        name: "Designer Belt",
        category: "belts",
        gender: "women",
        price: 99.99,
        description: "Luxury leather belt with signature gold buckle. Fashion statement piece.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Designer+Belt"
    },
    {
        id: 27,
        name: "Canvas Belt",
        category: "belts",
        gender: "unisex",
        price: 29.99,
        description: "Casual canvas belt with metal buckle. Comfortable everyday wear.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Canvas+Belt"
    },
    {
        id: 28,
        name: "Reversible Belt",
        category: "belts",
        gender: "men",
        price: 89.99,
        description: "Versatile reversible leather belt. Two styles in one.",
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Reversible+Belt"
    }
];

// Get all products
function getAllProducts() {
    return products;
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Get products by category
function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// Get products by gender
function getProductsByGender(gender) {
    if (gender === 'all') return products;
    return products.filter(product => product.gender === gender);
}

// Get featured products (first 8)
function getFeaturedProducts() {
    return products.slice(0, 8);
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
}

// Filter products by price range
function filterByPrice(products, range) {
    if (range === 'all') return products;

    const [min, max] = range.split('-').map(v => v.replace('+', ''));

    return products.filter(product => {
        if (max) {
            return product.price >= parseFloat(min) && product.price <= parseFloat(max);
        } else {
            return product.price >= parseFloat(min);
        }
    });
}

// Sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// Create product card HTML
function createProductCard(product) {
    const currentUser = JSON.parse(localStorage.getItem('luxestyle_current_user'));
    let isWishlisted = false;

    if (currentUser) {
        const users = JSON.parse(localStorage.getItem('luxestyle_users')) || [];
        const user = users.find(u => u.email === currentUser.email);
        if (user && user.wishlist) {
            isWishlisted = user.wishlist.includes(product.id);
        }
    }

    const wishlistIcon = isWishlisted ? 'bi-heart-fill' : 'bi-heart';
    const wishlistColor = isWishlisted ? 'text-danger' : '';

    return `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <span class="product-badge">${product.gender}</span>
                    <button class="btn btn-sm btn-light position-absolute top-0 end-0 m-2 wishlist-btn" 
                            onclick="event.stopPropagation(); toggleWishlistUI(${product.id}, this)"
                            title="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
                        <i class="bi ${wishlistIcon} ${wishlistColor}"></i>
                    </button>
                </div>
                <div class="product-body">
                    <div class="product-category">${product.category}</div>
                    <h5 class="product-name">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="btn btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Toggle wishlist with UI update
function toggleWishlistUI(productId, button) {
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
        const icon = button.querySelector('i');

        if (wishlistIndex === -1) {
            // Add to wishlist
            users[userIndex].wishlist.push(productId);
            icon.className = 'bi bi-heart-fill text-danger';
            button.title = 'Remove from wishlist';
            showToastNotification('Added to wishlist!', 'success');
        } else {
            // Remove from wishlist
            users[userIndex].wishlist.splice(wishlistIndex, 1);
            icon.className = 'bi bi-heart';
            button.title = 'Add to wishlist';
            showToastNotification('Removed from wishlist', 'success');
        }

        localStorage.setItem('luxestyle_users', JSON.stringify(users));
    }
}

// Show toast notification
function showToastNotification(message, type) {
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
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
