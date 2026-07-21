// ====== iVastra Website - Main JavaScript ======

// Product Data
const products = [
    { name: "Slate Grey Cotton Kurta", price: 1499, originalPrice: 2499, tag: "bestseller", category: "topwear", image: "images/products/product-1.jpg" },
    { name: "Ivory Embroidered Sherwani", price: 6999, originalPrice: 9999, tag: "new", category: "topwear", image: "images/products/product-2.jpg" },
    { name: "Sage Green Everyday Kurta", price: 1299, originalPrice: 1999, tag: "deal", category: "topwear", image: "images/products/product-3.jpg" },
    { name: "Teal Blue Kurta Set", price: 1899, originalPrice: 2799, tag: "bestseller", category: "topwear", image: "images/products/product-4.jpg" },
    { name: "Black Sequined Festive Kurta", price: 3499, originalPrice: 4999, tag: "new", category: "topwear", image: "images/products/product-5.jpg" },
    { name: "Rose Nehru Jacket Set", price: 4499, originalPrice: 6499, tag: "bestseller", category: "outerwear", image: "images/products/product-6.jpg" },
    { name: "Golden Silk Kurta", price: 2999, originalPrice: 4499, tag: "deal", category: "topwear", image: "images/products/product-7.jpg" },
    { name: "Crimson Bandhani Kurta", price: 1799, originalPrice: 2699, tag: "new", category: "topwear", image: "images/products/product-8.jpg" },
    { name: "Copper Zari Kurta Set", price: 3299, originalPrice: 4999, tag: "bestseller", category: "topwear", image: "images/products/product-9.jpg" },
    { name: "Mustard Printed Kurta", price: 1699, originalPrice: 2499, tag: "deal", category: "topwear", image: "images/products/product-10.jpg" },
    { name: "Ivory Cotton Pyjama Set", price: 1199, originalPrice: 1799, tag: "new", category: "bottomwear", image: "images/products/product-11.jpg" },
    { name: "Brocade Waistcoat Set", price: 3999, originalPrice: 5999, tag: "bestseller", category: "outerwear", image: "images/products/product-12.jpg" },
    { name: "Crimson Bloom Festive Kurta", price: 2499, originalPrice: 3799, tag: "new", category: "topwear", image: "images/products/product-13.jpg" },
    { name: "Amber Brocade Kurta", price: 2799, originalPrice: 3999, tag: "deal", category: "topwear", image: "images/products/product-14.jpg" },
    { name: "Golden Brocade Bandhgala", price: 5499, originalPrice: 7999, tag: "bestseller", category: "outerwear", image: "images/products/product-15.jpg" },
    { name: "Navy Blue Casual Kurta", price: 1399, originalPrice: 2099, tag: "deal", category: "topwear", image: "images/products/product-16.jpg" },
    { name: "Maroon Brocade Waistcoat", price: 2799, originalPrice: 3999, tag: "new", category: "outerwear", image: "images/products/product-17.jpg" },
    { name: "Scarlet Floral Festive Kurta", price: 2599, originalPrice: 3899, tag: "bestseller", category: "topwear", image: "images/products/product-18.jpg" },
];

// Cart & Wishlist state
let cart = [];          // array of { index, qty }
let wishlist = [];      // array of product indices

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initAnnouncementBar();
    initHeroBanner();
    initMobileMenu();
    initHeader();
    renderProducts('all');
    initProductScroll();
    initShopByTabs();
    initCounterAnimation();
    initCart();
    initQuickView();
    initSearch();
    initBackToTop();
    initScrollReveal();
    initNewsletter();
});

// ====== ANNOUNCEMENT BAR ROTATION (Cava style with pause/play) ======
function initAnnouncementBar() {
    const slides = document.querySelectorAll('.announcement-slide');
    const pauseBtn = document.getElementById('announcement-pause');
    const playBtn = document.getElementById('announcement-play');
    let current = 0;
    let interval;
    let isPaused = false;

    function nextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }

    function startAutoPlay() {
        interval = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            stopAutoPlay();
            isPaused = true;
            pauseBtn.classList.add('hidden');
            playBtn.classList.remove('hidden');
        });
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            startAutoPlay();
            isPaused = false;
            playBtn.classList.add('hidden');
            pauseBtn.classList.remove('hidden');
        });
    }

    startAutoPlay();
}

// ====== HERO BANNER CAROUSEL ======
function initHeroBanner() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let current = 0;
    let interval;

    function goToSlide(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = index;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function nextSlide() {
        goToSlide((current + 1) % slides.length);
    }

    function startAutoPlay() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });

    startAutoPlay();
}

// ====== MOBILE MENU ======
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
}

// ====== STICKY HEADER ======
function initHeader() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ====== RENDER PRODUCTS (Cava + BlissClub style) ======
function renderProducts(category) {
    const grid = document.getElementById('products-grid');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    grid.innerHTML = filtered.map(product => {
        const idx = products.indexOf(product);
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        const wished = wishlist.includes(idx) ? 'active' : '';
        return `
            <div class="product-card" data-category="${product.category}" data-index="${idx}">
                <span class="product-tag ${product.tag}">${getTagLabel(product.tag)}</span>
                <div class="product-discount-badge">${discount}% Off</div>
                <button class="wishlist-btn ${wished}" data-index="${idx}" aria-label="Add to wishlist">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <div class="product-image" data-quickview="${idx}">
                    <img src="${product.image}" alt="${product.name}" loading="lazy"
                         onerror="this.parentElement.style.background='linear-gradient(135deg, #f8f6f3, #e8e4df)'; this.style.display='none';">
                    <span class="quick-view-hint">Quick View</span>
                </div>
                <div class="product-info">
                    <p class="product-name">${product.name}</p>
                    <div class="product-price">
                        <span class="price-original">MRP ₹${product.originalPrice.toLocaleString()}</span>
                        <span class="price-current">₹${product.price.toLocaleString()}</span>
                    </div>
                    <div class="product-sizes">
                        <button class="size-btn">S</button>
                        <button class="size-btn">M</button>
                        <button class="size-btn active">L</button>
                        <button class="size-btn">XL</button>
                        <button class="size-btn">XXL</button>
                    </div>
                    <div class="product-actions">
                        <button class="product-add-btn" data-index="${idx}">Add to Cart</button>
                        <button class="product-quick-view" data-quickview="${idx}">Quick View</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    wireProductCards(grid);
}

// Wire up interactivity on rendered product cards
function wireProductCards(grid) {
    grid.querySelectorAll('.product-card').forEach(card => {
        // size selection
        card.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });
    // add to cart
    grid.querySelectorAll('.product-add-btn').forEach(btn => {
        btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.index)));
    });
    // quick view (image or button)
    grid.querySelectorAll('[data-quickview]').forEach(el => {
        el.addEventListener('click', () => openQuickView(parseInt(el.dataset.quickview)));
    });
    // wishlist
    grid.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(parseInt(btn.dataset.index), btn);
        });
    });
}

function getTagLabel(tag) {
    const labels = {
        'new': 'New Drop',
        'bestseller': 'Bestseller',
        'deal': 'Grab the Deal',
        'sold-out': 'Sold Out'
    };
    return labels[tag] || tag;
}

// ====== PRODUCT SCROLL BUTTONS (handles all product carousels) ======
function initProductScroll() {
    document.querySelectorAll('.products-scroll-container').forEach(container => {
        const grid = container.querySelector('.products-grid');
        const leftBtn = container.querySelector('.scroll-left');
        const rightBtn = container.querySelector('.scroll-right');
        if (grid && leftBtn && rightBtn) {
            leftBtn.addEventListener('click', () => grid.scrollBy({ left: -300, behavior: 'smooth' }));
            rightBtn.addEventListener('click', () => grid.scrollBy({ left: 300, behavior: 'smooth' }));
        }
    });
}

// ====== SHOP BY TABS ======
function initShopByTabs() {
    const tabs = document.querySelectorAll('.shop-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProducts(tab.dataset.tab);
        });
    });
}

// ====== COUNTER ANIMATION (Numerical Facts) ======
function initCounterAnimation() {
    const factNumbers = document.querySelectorAll('.fact-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    factNumbers.forEach(num => observer.observe(num));
}

function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();
    const isDecimal = target < 10;

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        if (isDecimal) {
            el.textContent = current.toFixed(1);
        } else if (target >= 100000) {
            el.textContent = Math.floor(current / 1000) + 'K';
        } else {
            el.textContent = Math.floor(current).toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isDecimal) {
                el.textContent = target.toFixed(1);
            } else if (target >= 100000) {
                el.textContent = '1 Lakh';
            } else {
                el.textContent = Math.floor(target).toLocaleString();
            }
        }
    }

    requestAnimationFrame(update);
}


// ====== TOAST NOTIFICATION ======
let toastTimer;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ====== CART ======
function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('cart-close');
    const overlay = document.getElementById('drawer-overlay');

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);
    renderCart();
}

function addToCart(index) {
    const existing = cart.find(item => item.index === index);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ index, qty: 1 });
    }
    renderCart();
    showToast(`${products[index].name} added to bag`);
    // pulse the cart count
    const count = document.querySelector('.cart-count');
    if (count) { count.classList.remove('pulse'); void count.offsetWidth; count.classList.add('pulse'); }
}

function removeFromCart(index) {
    cart = cart.filter(item => item.index !== index);
    renderCart();
}

function changeQty(index, delta) {
    const item = cart.find(i => i.index === index);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(index);
    else renderCart();
}

function renderCart() {
    const totalItems = cart.reduce((s, i) => s + i.qty, 0);
    const subtotal = cart.reduce((s, i) => s + products[i.index].price * i.qty, 0);

    document.querySelectorAll('.cart-count').forEach(el => el.textContent = totalItems);
    const drawerCount = document.getElementById('cart-drawer-count');
    if (drawerCount) drawerCount.textContent = totalItems;
    const sub = document.getElementById('cart-subtotal');
    if (sub) sub.textContent = '₹' + subtotal.toLocaleString();

    const body = document.getElementById('cart-drawer-body');
    if (!body) return;
    if (cart.length === 0) {
        body.innerHTML = '<p class="cart-empty">Your bag is empty.</p>';
        return;
    }
    body.innerHTML = cart.map(item => {
        const p = products[item.index];
        return `
            <div class="cart-item">
                <img src="${p.image}" alt="${p.name}" onerror="this.style.background='#e8e4df'">
                <div class="cart-item-info">
                    <p class="cart-item-name">${p.name}</p>
                    <p class="cart-item-price">₹${p.price.toLocaleString()}</p>
                    <div class="cart-qty">
                        <button class="qty-btn" data-dec="${item.index}">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" data-inc="${item.index}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-remove="${item.index}" aria-label="Remove">&times;</button>
            </div>
        `;
    }).join('');

    body.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => changeQty(parseInt(b.dataset.inc), 1)));
    body.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => changeQty(parseInt(b.dataset.dec), -1)));
    body.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => removeFromCart(parseInt(b.dataset.remove))));
}

function openCart() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('drawer-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('drawer-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ====== WISHLIST ======
function toggleWishlist(index, btn) {
    const pos = wishlist.indexOf(index);
    if (pos === -1) {
        wishlist.push(index);
        btn.classList.add('active');
        showToast(`${products[index].name} added to wishlist`);
    } else {
        wishlist.splice(pos, 1);
        btn.classList.remove('active');
        showToast('Removed from wishlist');
    }
}

// ====== QUICK VIEW MODAL ======
function initQuickView() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeQuickView(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeQuickView(); closeSearch(); } });
}

function openQuickView(index) {
    const p = products[index];
    const discount = Math.round((1 - p.price / p.originalPrice) * 100);
    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-img').alt = p.name;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-price').textContent = '₹' + p.price.toLocaleString();
    document.getElementById('modal-original').textContent = 'MRP ₹' + p.originalPrice.toLocaleString();
    document.getElementById('modal-discount').textContent = discount + '% off';
    const tag = document.getElementById('modal-tag');
    tag.textContent = getTagLabel(p.tag);
    tag.className = 'modal-tag product-tag ' + p.tag;

    const sizes = document.getElementById('modal-sizes');
    sizes.innerHTML = ['S','M','L','XL','XXL'].map((s, i) =>
        `<button class="size-btn ${i===2?'active':''}">${s}</button>`).join('');
    sizes.querySelectorAll('.size-btn').forEach(b => b.addEventListener('click', () => {
        sizes.querySelectorAll('.size-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
    }));

    const addBtn = document.getElementById('modal-add');
    addBtn.onclick = () => { addToCart(index); closeQuickView(); };

    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeQuickView() {
    const o = document.getElementById('modal-overlay');
    if (o) o.classList.remove('active');
    if (!document.getElementById('cart-drawer').classList.contains('open')) document.body.style.overflow = '';
}

// ====== SEARCH ======
function initSearch() {
    const btn = document.getElementById('search-btn');
    const close = document.getElementById('search-close');
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');

    if (btn) btn.addEventListener('click', openSearch);
    if (close) close.addEventListener('click', closeSearch);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    if (input) input.addEventListener('input', () => renderSearchResults(input.value));
}

function openSearch() {
    document.getElementById('search-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('search-input').focus(), 100);
    renderSearchResults('');
}
function closeSearch() {
    const o = document.getElementById('search-overlay');
    if (o) o.classList.remove('active');
    if (!document.getElementById('cart-drawer').classList.contains('open')) document.body.style.overflow = '';
}

function renderSearchResults(query) {
    const box = document.getElementById('search-results');
    if (!box) return;
    const q = query.trim().toLowerCase();
    const matches = q === '' ? products.slice(0, 4)
        : products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    if (matches.length === 0) {
        box.innerHTML = '<p class="search-empty">No products found. Try "kurta", "sherwani" or "jacket".</p>';
        return;
    }
    box.innerHTML = matches.map(p => {
        const idx = products.indexOf(p);
        return `
            <div class="search-result-item" data-search="${idx}">
                <img src="${p.image}" alt="${p.name}" onerror="this.style.background='#e8e4df'">
                <div>
                    <p class="search-result-name">${p.name}</p>
                    <p class="search-result-price">₹${p.price.toLocaleString()}</p>
                </div>
            </div>`;
    }).join('');
    box.querySelectorAll('[data-search]').forEach(el => {
        el.addEventListener('click', () => { closeSearch(); openQuickView(parseInt(el.dataset.search)); });
    });
}

// ====== BACK TO TOP ======
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ====== SCROLL REVEAL ======
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .categories-section, .products-section, .lookbook-section, .testimonials-section, .why-section, .facts-section');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    els.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

// ====== NEWSLETTER ======
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const email = input.value.trim();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            input.value = '';
            showToast('Thanks for subscribing! 🎉');
        } else {
            showToast('Please enter a valid email address');
        }
    });
}
