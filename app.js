// ============================================
//  MAISON — App JavaScript
// ============================================

// ---- DATA ----
const PRODUCTS = [
  {
    id: 1,
    name: "Structured Wool Coat",
    category: "Outerwear",
    price: 495,
    badge: "Bestseller",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80",
    ],
    description: "A clean-lined wool-blend coat designed to anchor any wardrobe. Minimal detailing, impeccable construction. Fully lined with a subtle drop shoulder.",
    sizes: ["XS","S","M","L","XL"],
    unavailable: []
  },
  {
    id: 2,
    name: "Merino Ribbed Sweater",
    category: "Knitwear",
    price: 185,
    badge: "New",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1614159102803-5cb74b21f2da?w=800&q=80",
    ],
    description: "Extra-fine merino wool in a relaxed ribbed silhouette. Breathable, temperature-regulating, and softens with every wash.",
    sizes: ["XS","S","M","L","XL"],
    unavailable: []
  },
  {
    id: 3,
    name: "Wide-Leg Trousers",
    category: "Trousers",
    price: 225,
    badge: null,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    description: "High-rise, wide-leg silhouette in a crisp wool-cotton blend. A modern take on the tailored trouser — structured but fluid.",
    sizes: ["XS","S","M","L","XL"],
    unavailable: ["XS"]
  },
  {
    id: 4,
    name: "Organic Cotton Tee",
    category: "T-Shirts",
    price: 75,
    badge: null,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
    ],
    description: "Heavyweight 200gsm organic cotton. A relaxed boxy fit with a subtle dropped shoulder. Washes to perfection.",
    sizes: ["XS","S","M","L","XL"],
    unavailable: []
  },
  {
    id: 5,
    name: "Camel Cashmere Scarf",
    category: "Accessories",
    price: 145,
    badge: null,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    ],
    description: "Pure Grade-A cashmere, woven in Scotland. Large format, buttery soft, endlessly versatile.",
    sizes: ["One Size"],
    unavailable: []
  },
  {
    id: 6,
    name: "Linen Overshirt",
    category: "Outerwear",
    price: 195,
    badge: "New",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    description: "Stonewashed Belgian linen in a relaxed overshirt cut. Wear as a layer or alone — it works both ways.",
    sizes: ["XS","S","M","L","XL"],
    unavailable: ["XL"]
  },
  {
    id: 7,
    name: "Ribbed Wool Cardigan",
    category: "Knitwear",
    price: 220,
    badge: null,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80",
    ],
    description: "A generous, open-front cardigan in a medium-gauge wool rib. The kind you reach for on every cold morning.",
    sizes: ["XS","S","M","L","XL"],
    unavailable: []
  },
  {
    id: 8,
    name: "Tapered Chino",
    category: "Trousers",
    price: 165,
    badge: null,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    ],
    description: "Italian-milled cotton gabardine in a clean tapered cut. Minimal seaming, no pleats, no fuss.",
    sizes: ["XS","S","M","L","XL"],
    unavailable: []
  }
];

// ---- CART STATE ----
let cart = JSON.parse(localStorage.getItem('maisonCart') || '[]');
let currentProduct = null;
let selectedSize = null;
let activeFilter = 'All';
let activeSort = 'default';

// ---- SAVE CART ----
function saveCart() {
  localStorage.setItem('maisonCart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartCountMobile').textContent = count;
}

// ---- PAGE NAVIGATION ----
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'shop') renderShopGrid();
  if (id === 'home') renderFeatured();
  if (id === 'cart') renderCart();
}

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ---- MOBILE MENU ----
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ---- RENDER PRODUCT CARD ----
function createProductCard(product, delay = 0) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.style.animationDelay = `${delay}ms`;

  const badgeHtml = product.badge
    ? `<div class="product-card-badge">${product.badge}</div>` : '';

  card.innerHTML = `
    <div class="product-card-img">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy"/>
      ${badgeHtml}
      <div class="product-card-quick">
        <span>Quick View</span>
      </div>
    </div>
    <div class="product-card-category">${product.category}</div>
    <div class="product-card-name">${product.name}</div>
    <div class="product-card-price">$${product.price}</div>
  `;

  card.addEventListener('click', () => openProduct(product));
  return card;
}

// ---- FEATURED GRID ----
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const featured = PRODUCTS.filter(p => p.featured);
  featured.forEach((p, i) => grid.appendChild(createProductCard(p, i * 80)));
}

// ---- SHOP GRID ----
function renderShopGrid() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let filtered = activeFilter === 'All'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === activeFilter);

  if (activeSort === 'low')  filtered.sort((a,b) => a.price - b.price);
  if (activeSort === 'high') filtered.sort((a,b) => b.price - a.price);

  filtered.forEach((p, i) => grid.appendChild(createProductCard(p, i * 60)));
}

// ---- FILTER ----
function filterCategory(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-item').forEach(el => {
    el.classList.toggle('active', el.textContent.trim() === cat || (cat === 'All' && el.textContent.trim() === 'All'));
  });
  renderShopGrid();
}

// ---- SORT ----
function sortProducts(order) {
  activeSort = order;
  document.querySelectorAll('.filter-group:last-child .filter-item').forEach(el => {
    el.classList.remove('active');
  });
  event.target.classList.add('active');
  renderShopGrid();
}

// ---- PRODUCT DETAIL ----
function openProduct(product) {
  currentProduct = product;
  selectedSize = null;

  const detail = document.getElementById('productDetail');
  detail.innerHTML = `
    <div>
      <button class="back-btn" onclick="history.back()">← Back</button>
      <div class="product-detail-images">
        <div class="product-detail-main-img">
          <img src="${product.images[0]}" alt="${product.name}" id="mainImg"/>
        </div>
        <div class="product-detail-thumbs">
          ${product.images.map((img, i) => `
            <div class="product-detail-thumb ${i===0?'active':''}" onclick="switchThumb(this, '${img}')">
              <img src="${img}" alt="${product.name}" loading="lazy"/>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="product-detail-info">
      <div class="product-detail-category">${product.category}</div>
      <h1 class="product-detail-name">${product.name}</h1>
      <div class="product-detail-price">$${product.price}</div>
      <p class="product-detail-desc">${product.description}</p>
      <p class="size-label">Select Size</p>
      <div class="size-options">
        ${product.sizes.map(s => {
          const unavail = product.unavailable.includes(s);
          return `<button class="size-btn ${unavail ? 'unavailable' : ''}"
            ${unavail ? 'disabled' : ''}
            onclick="selectSize(this, '${s}')">${s}</button>`;
        }).join('')}
      </div>
      <button class="add-to-cart-btn" onclick="addToCart()">Add to Cart</button>
      <div class="product-detail-meta">
        <span>Free shipping on orders over $150</span>
        <span>30-day hassle-free returns</span>
        <span>Made in Europe from certified materials</span>
      </div>
    </div>
  `;

  // Override back button
  document.querySelector('.back-btn').onclick = () => {
    window.history.pushState({}, '', '#');
    // Go back to wherever they came from
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-shop').classList.add('active');
    renderShopGrid();
    window.scrollTo({ top: 0 });
  };

  showPage('product');
}

function switchThumb(el, src) {
  document.querySelectorAll('.product-detail-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('mainImg').src = src;
}

function selectSize(el, size) {
  document.querySelectorAll('.size-btn:not(.unavailable)').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedSize = size;
}

// ---- ADD TO CART ----
function addToCart() {
  if (!currentProduct) return;

  if (currentProduct.sizes.length > 1 && !selectedSize) {
    showToast('Please select a size first.');
    return;
  }
  const size = selectedSize || currentProduct.sizes[0];
  const key = `${currentProduct.id}-${size}`;

  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      key,
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      size,
      image: currentProduct.images[0],
      qty: 1
    });
  }
  saveCart();
  showToast(`${currentProduct.name} added to cart`);
}

// ---- RENDER CART ----
function renderCart() {
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <h3>Your cart is empty.</h3>
        <p>Explore the collection and find something you love.</p>
        <button class="btn-primary" onclick="showPage('shop')">Shop Now</button>
      </div>
    `;
    summary.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item" style="animation-delay:${idx * 60}ms">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}"/>
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Size: ${item.size}</div>
        <div class="cart-item-price">$${item.price}</div>
        <div class="cart-item-qty">
          <button onclick="updateQty('${item.key}', -1)" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--mid);padding:0 6px;">−</button>
          <span style="font-size:14px;">${item.qty}</span>
          <button onclick="updateQty('${item.key}', 1)" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--mid);padding:0 6px;">+</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
        <button class="cart-remove" onclick="removeItem('${item.key}')">Remove</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;

  summary.innerHTML = `
    <h3>Order Summary</h3>
    <div class="cart-summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="cart-summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span></div>
    ${shipping > 0 ? `<div class="cart-summary-row" style="font-size:12px;color:var(--light);"><span>Add $${(150 - subtotal).toFixed(2)} for free shipping</span></div>` : ''}
    <div class="cart-summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    <button class="btn-primary" onclick="checkout()">Proceed to Checkout</button>
    <div style="text-align:center;margin-top:16px;">
      <button class="cart-remove" onclick="clearCart()">Clear Cart</button>
    </div>
  `;
}

function updateQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
}

function removeItem(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function checkout() {
  showToast('Checkout coming soon — this is a demo store.');
}

// ---- CONTACT FORM ----
function submitForm(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('visible');
  e.target.reset();
  setTimeout(() => success.classList.remove('visible'), 5000);
}

// ---- TOAST ----
let toastTimer;
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderFeatured();
});
