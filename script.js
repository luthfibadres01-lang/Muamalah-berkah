// ===== GLOBAL VARIABLES =====
const LOADING_SCREEN = document.getElementById('loadingScreen');
const THEME_TOGGLE = document.querySelector('.theme-toggle');
const NAVBAR = document.getElementById('navbar');
const PRODUCTS_GRID = document.getElementById('productsGrid');
const CART_MODAL = document.getElementById('cartModal');
const QUICK_VIEW_MODAL = document.getElementById('quickViewModal');

// ===== SAMPLE PRODUCTS DATA =====
const products = [
    {
        id: 1,
        title: "Gamis Premium Al-Madinah",
        price: 350000,
        rating: 4.9,
        reviews: 127,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
        category: "fashion",
        halal: true
    },
    {
        id: 2,
        title: "Kurma Ajwa Premium",
        price: 125000,
        rating: 5.0,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1603048297194-8f7d9e7f8e7d?w=400&h=400&fit=crop",
        category: "food",
        halal: true
    },
    {
        id: 3,
        title: "Kursus Fiqih Digital",
        price: 250000,
        rating: 4.8,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        category: "digital",
        halal: true
    },
    {
        id: 4,
        title: "Madu Sunnah Asli",
        price: 180000,
        rating: 4.9,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1611143488308-1bcef2788d22?w=400&h=400&fit=crop",
        category: "herbal",
        halal: true
    },
    {
        id: 5,
        title: "Buku Tafsir Jalalain",
        price: 95000,
        rating: 4.7,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
        category: "book",
        halal: true
    },
    {
        id: 6,
        title: "Jasa Desain Logo Syariah",
        price: 500000,
        rating: 4.9,
        reviews: 34,
        image: "https://images.unsplash.com/photo-1559028005-400f5e3d6e55?w=400&h=400&fit=crop",
        category: "service",
        halal: true
    }
];

// ===== INIT FUNCTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    initLoading();
    initTheme();
    initNavbar();
    initScrollEffects();
    initStatsCounter();
    initProducts();
    initFilters();
    initCart();
    initModals();
    initFAQ();
    initIntersectionObserver();
});

// ===== LOADING SCREEN =====
function initLoading() {
    setTimeout(() => {
        LOADING_SCREEN.style.opacity = '0';
        setTimeout(() => {
            LOADING_SCREEN.style.display = 'none';
        }, 500);
    }, 2000);
}

// ===== THEME TOGGLE =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    THEME_TOGGLE.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        THEME_TOGGLE.classList.toggle('fa-moon');
        THEME_TOGGLE.classList.toggle('fa-sun');
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            NAVBAR.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
                ? 'rgba(15, 23, 42, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            NAVBAR.style.backdropFilter = 'blur(30px)';
            NAVBAR.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        } else {
            NAVBAR.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
                ? 'rgba(15, 23, 42, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            NAVBAR.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = parseInt(stat.innerText.replace(/[^\d]/g, ''));
            const increment = target / 100;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                requestAnimationFrame(animateStats);
            } else {
                stat.innerText = target.toLocaleString();
            }
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(document.querySelector('.hero-stats'));
}

// ===== PRODUCTS =====
function initProducts() {
    renderProducts(products);
}

function renderProducts(productList) {
    PRODUCTS_GRID.innerHTML = productList.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating)).padEnd(5, '☆');
    
    return `
        <div class="product-card fade-in-up" data-category="${product.category}" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                ${product.halal ? '<div class="badge-halal"><i class="fas fa-check"></i> Halal</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">(${product.reviews})</span>
                </div>
                <div class="product-price">Rp ${product.price.toLocaleString()}</div>
                <div class="product-actions">
                    <button class="btn-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Beli
                    </button>
                    <button class="btn-wishlist" onclick="toggleWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ===== FILTERS =====
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== CART SYSTEM =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification('Ditambahkan ke keranjang!', 'success');
}

function toggleWishlist(productId) {
    const wishlistBtn = event.target.closest('.btn-wishlist');
    wishlistBtn.querySelector('i').classList.toggle('far');
    wishlistBtn.querySelector('i').classList.toggle('fas');
    wishlistBtn.querySelector('i').style.color = wishlistBtn.querySelector('i').classList.contains('fas') ? 'var(--gold)' : '';
}

function initCart() {
    updateCartCount();
    
    document.querySelector('.cart-btn').addEventListener('click', () => {
        openModal(CART_MODAL);
        renderCart();
    });
}

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBtn = document.querySelector('.cart-btn');
    const countBadge = cartBtn.querySelector('.cart-count') || document.createElement('span');
    
    if (!countBadge.classList.contains('cart-count')) {
        countBadge.className = 'cart-count';
        countBadge.style.cssText = `
            position: absolute;
            top: 4px;
            right: 4px;
            background: var(--emerald);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        `;
        cartBtn.appendChild(countBadge);
    }
    
    countBadge.textContent = cartCount > 99 ? '99+' : cartCount;
}

function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItems.innerHTML = cart.length ? cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <div class="cart-item-price">Rp ${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('') : '<p style="text-align: center; color: var(--gray-500);">Keranjang kosong</p>';
    
    document.getElementById('cartTotal').textContent = `Rp ${total.toLocaleString()}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// ===== MODALS =====
function initModals() {
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => closeAllModals());
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = '';
}

// ===== QUICK VIEW =====
document.addEventListener('click', (e) => {
    if (e.target.closest('.product-card')) {
        const productCard = e.target.closest('.product-card');
        const productId = parseInt(productCard.getAttribute('data-product-id'));
        const product = products.find(p => p.id === productId);
        showQuickView(product);
    }
});

function showQuickView(product) {
    const modalContent = QUICK_VIEW_MODAL.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.title}" class="product-detail-image">
            <div class="product-detail-info">
                <h2>${product.title}</h2>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(Math.floor(product.rating)).padEnd(5, '☆')}</div>
                    <span>(${product.reviews} ulasan)</span>
                </div>
                <div class="product-price-large">Rp ${product.price.toLocaleString()}</div>
                <div class="product-description">
                    <p>Produk 100% halal bersertifikat. Kualitas premium dengan harga terbaik.</p>
                </div>
                <div class="product-actions-large">
                    <button class="btn-cart-large" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Tambah ke Keranjang
                    </button>
                    <button class="btn-buy-now">
                        <i class="fas fa-bolt"></i>
                        Beli Sekarang
                    </button>
                </div>
            </div>
        </div>
    `;
    openModal(QUICK_VIEW_MODAL);
}

// ===== FAQ =====
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Close other FAQs
            document.querySelectorAll('.faq-answer').forEach(a => {
                if (a !== answer) {
                    a.classList.remove('active');
                    a.previousElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current
            question.classList.toggle('active');
            answer.classList.toggle('active');
            icon.style.transform = question.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.category-card, .product-card, .stat-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--emerald)' : 'var(--gold)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// ===== SEARCH FUNCTIONALITY =====
document.querySelector('.search-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection?.scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===== CATEGORY CLICK HANDLER =====
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        const filterBtn = document.querySelector(`[data-filter="${category}"]`);
        if (filterBtn) {
            filterBtn.click();
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== CHECKOUT BUTTON =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkout-btn')) {
        if (cart.length === 0) {
            showNotification('Keranjang kosong!', 'warning');
            return;
        }
        showNotification('Menuju halaman checkout...', 'success');
        closeAllModals();
        // Here you would redirect to checkout page
    }
});
