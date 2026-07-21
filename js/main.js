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
];

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
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        return `
            <div class="product-card" data-category="${product.category}">
                <span class="product-tag ${product.tag}">${getTagLabel(product.tag)}</span>
                <div class="product-discount-badge">${discount}% Off</div>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy"
                         onerror="this.parentElement.style.background='linear-gradient(135deg, #f8f6f3, #e8e4df)'; this.style.display='none';">
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
                        <button class="product-add-btn">Add to Cart</button>
                        <button class="product-quick-view">Quick View</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add size button interactivity
    grid.querySelectorAll('.product-card').forEach(card => {
        card.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
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

// ====== PRODUCT SCROLL BUTTONS ======
function initProductScroll() {
    const grid = document.getElementById('products-grid');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');

    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
            grid.scrollBy({ left: -300, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            grid.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
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
