const products = [
  {
    id: 1,
    name: "Anillo Halo Celestial",
    category: "anillos",
    categoryLabel: "Anillos",
    price: 135,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=85",
    hoverImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=700&q=85",
    description: "Solitario de cristal tallado en corte brillante rodeado por una aureola de micro-pavé luminoso."
  },
  {
    id: 2,
    name: "Collar Étoile Lumière",
    category: "collares",
    categoryLabel: "Collares",
    price: 145,
    badge: "Nuevo",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=700&q=85",
    hoverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=85",
    description: "Cadena delicada ajustable con dije suspendido que atrapa y refleja cada destello de luz."
  },
  {
    id: 3,
    name: "Pulsera Aurelia Charms",
    category: "pulseras",
    categoryLabel: "Pulseras & Charms",
    price: 160,
    badge: "Icónico",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=85",
    hoverImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=85",
    description: "Pulsera rígida flexible con cierre de broche grabado, lista para coleccionar tus charms favoritos."
  },
  {
    id: 4,
    name: "Aretes Lágrima de Cristal",
    category: "aretes",
    categoryLabel: "Aretes",
    price: 115,
    badge: "Edición Limitada",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=85",
    hoverImage: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=85",
    description: "Pendientes colgantes ultraligeros con cristales facetados en forma de gota etérea."
  },
  {
    id: 5,
    name: "Anillo Constelación Pavé",
    category: "anillos",
    categoryLabel: "Anillos",
    price: 120,
    badge: "",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=700&q=85",
    hoverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=85",
    description: "Banda entrelazada con engaste artesanal ideal para combinar en estilo stacking."
  },
  {
    id: 6,
    name: "Charm Corazón de Aurora",
    category: "pulseras",
    categoryLabel: "Pulseras & Charms",
    price: 78,
    badge: "Regalo Ideal",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=85",
    hoverImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=85",
    description: "Charm calado con cristal central rosado iridiscente acabado a mano."
  }
];

let state = {
  filter: "all",
  sort: "featured",
  search: "",
  wishlist: [],
  cart: []
};

// Elementos del DOM
const productsGrid = document.getElementById("productsGrid");
const filterPills = document.querySelectorAll("#filterPills .pill");
const sortSelect = document.getElementById("sortSelect");
const searchDrawer = document.getElementById("searchDrawer");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartSubtotal = document.getElementById("cartSubtotal");
const productModalBackdrop = document.getElementById("productModalBackdrop");
const productModalContent = document.getElementById("productModalContent");
const toastContainer = document.getElementById("toastContainer");

// Notificaciones Toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// Renderizar Catálogo
function renderProducts() {
  let filtered = products.filter((item) => {
    const matchesCat = state.filter === "all" || item.category === state.filter;
    const matchesSearch =
      item.name.toLowerCase().includes(state.search.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(state.search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (state.sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (filtered.length === 0) {
    productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#6E6A68; padding:40px 0;">No encontramos joyas con ese criterio de búsqueda.</p>`;
    return;
  }

  productsGrid.innerHTML = filtered
    .map((product) => {
      const isWished = state.wishlist.includes(product.id);
      return `
        <article class="product-card">
          <div class="product-media">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
            <button class="wish-btn ${isWished ? "active" : ""}" onclick="toggleWishlist(${product.id})" aria-label="Guardar en favoritos">
              ${isWished ? "♥" : "♡"}
            </button>
            <img src="${product.image}" alt="${product.name}" />
            <img src="${product.hoverImage}" alt="${product.name} vista alternativa" class="hover-img" />
            <button class="quick-view-trigger" onclick="openQuickView(${product.id})">Vista Rápida</button>
          </div>
          <div class="product-info">
            <span class="product-cat">${product.categoryLabel}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-bottom">
              <span class="product-price">$${product.price.toFixed(2)}</span>
              <button class="add-mini-btn" onclick="addToCart(${product.id}, 'Oro Champagne 18k')">+ Añadir</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

// Wishlist
function toggleWishlist(id) {
  const index = state.wishlist.indexOf(id);
  if (index === -1) {
    state.wishlist.push(id);
    showToast("Añadido a tu lista de deseos ✦");
  } else {
    state.wishlist.splice(index, 1);
    showToast("Eliminado de tu lista de deseos");
  }
  wishlistCount.textContent = state.wishlist.length;
  renderProducts();
}

// Vista Rápida Modal
function openQuickView(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  let selectedFinish = "Oro Champagne 18k";

  productModalContent.innerHTML = `
    <div class="modal-grid">
      <img src="${product.image}" alt="${product.name}" class="modal-img" />
      <div class="modal-details">
        <span class="eyebrow">${product.categoryLabel}</span>
        <h2 class="section-title" style="font-size:2rem;">${product.name}</h2>
        <p style="font-size:1.2rem; color:#C5A059; font-weight:600; margin:8px 0 14px;">$${product.price.toFixed(2)}</p>
        <p style="color:#6E6A68; font-size:0.92rem;">${product.description}</p>
        <div style="margin-top:18px;">
          <span style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.1em;">Acabado Noble:</span>
          <div class="finish-options" id="finishOptions">
            <button type="button" class="finish-btn active" data-finish="Oro Champagne 18k">Oro Champagne 18k</button>
            <button type="button" class="finish-btn" data-finish="Plata Esterlina 925">Plata 925</button>
            <button type="button" class="finish-btn" data-finish="Oro Rosa 18k">Oro Rosa 18k</button>
          </div>
        </div>
        <button class="btn btn-primary full-width" id="modalAddBtn">Añadir a la Bolsa</button>
      </div>
    </div>
  `;

  productModalBackdrop.classList.add("active");

  document.querySelectorAll(".finish-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".finish-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedFinish = btn.dataset.finish;
    });
  });

  document.getElementById("modalAddBtn").addEventListener("click", () => {
    addToCart(product.id, selectedFinish);
    productModalBackdrop.classList.remove("active");
  });
}

// Carrito de Compras
function addToCart(id, finish = "Oro Champagne 18k") {
  const product = products.find((p) => p.id === id);
  const existing = state.cart.find((item) => item.id === id && item.finish === finish);

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...product, finish, qty: 1 });
  }

  updateCartUI();
  showToast(`«${product.name}» añadido a tu bolsa`);
}

function updateQty(index, delta) {
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = totalItems;
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align:center; color:#6E6A68; margin-top:40px;">Tu bolsa Mon Voe está vacía.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = state.cart
    .map(
      (item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <strong style="font-family:var(--font-serif); font-size:1.1rem;">${item.name}</strong>
          <p style="font-size:0.78rem; color:#6E6A68;">Acabado: ${item.finish}</p>
          <p style="font-size:0.88rem; color:#C5A059; font-weight:600;">$${(item.price * item.qty).toFixed(2)}</p>
          <div class="qty-controls">
            <button onclick="updateQty(${idx}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${idx}, 1)">+</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Eventos de Filtros y Navegación
function setCategoryFilter(category) {
  state.filter = category;
  filterPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.filter === category);
  });
  renderProducts();
}

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => setCategoryFilter(pill.dataset.filter));
});

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    setCategoryFilter(card.dataset.category);
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    const cat = link.dataset.filter;
    if (cat) setCategoryFilter(cat);
    document.getElementById("mobileNavOverlay").classList.remove("active");
  });
});

sortSelect.addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderProducts();
});

// Buscador
document.getElementById("searchToggleBtn").addEventListener("click", () => {
  searchDrawer.classList.toggle("active");
  if (searchDrawer.classList.contains("active")) searchInput.focus();
});

document.getElementById("closeSearchBtn").addEventListener("click", () => {
  searchDrawer.classList.remove("active");
  state.search = "";
  searchInput.value = "";
  renderProducts();
});

searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderProducts();
});

// Modales y Drawers
document.getElementById("cartToggleBtn").addEventListener("click", () => {
  cartBackdrop.classList.add("active");
});

document.getElementById("closeCartBtn").addEventListener("click", () => {
  cartBackdrop.classList.remove("active");
});

cartBackdrop.addEventListener("click", (e) => {
  if (e.target === cartBackdrop) cartBackdrop.classList.remove("active");
});

document.getElementById("closeProductModal").addEventListener("click", () => {
  productModalBackdrop.classList.remove("active");
});

productModalBackdrop.addEventListener("click", (e) => {
  if (e.target === productModalBackdrop) productModalBackdrop.classList.remove("active");
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (state.cart.length === 0) {
    showToast("Añade al menos una joya a tu bolsa");
    return;
  }
  state.cart = [];
  updateCartUI();
  cartBackdrop.classList.remove("active");
  showToast("✦ ¡Gracias por tu compra en MON VOE! Confirmación enviada.");
});

// Menú Móvil
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  document.getElementById("mobileNavOverlay").classList.add("active");
});

document.getElementById("closeMobileNav").addEventListener("click", () => {
  document.getElementById("mobileNavOverlay").classList.remove("active");
});

// Newsletter
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("✦ Bienvenida al Círculo Privado MON VOE. Revisa tu correo.");
  e.target.reset();
});

// Header Scroll
window.addEventListener("scroll", () => {
  document.getElementById("siteHeader").classList.toggle("scrolled", window.scrollY > 30);
});

// Inicializar
renderProducts();
updateCartUI();