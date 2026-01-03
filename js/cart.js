const CART_KEY = "cart";

/* ====================== CART STORAGE ====================== */
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ====================== ADD TO CART ====================== */
export function addToCart(product) {
  let cart = getCart();

  const index = cart.findIndex((item) => item.name === product.name);

  if (index !== -1) {
    if (cart[index].quantity < 10) {
      cart[index].quantity += 1;
    }
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      image: product.picture,
      quantity: 1,
    });
  }

  saveCart(cart);
  renderCart();
  updateCartBadge();
}

/* ====================== RENDER CART ====================== */
export function renderCart() {
  const cart = getCart();
  const cartBody = document.querySelector(".cart-body");
  const totalEl = document.querySelector(".cart-total strong");

  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `<p class="cart-empty">Chưa có sản phẩm nào trong giỏ</p>`;
    totalEl.textContent = "0 ₫";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
  <img src="${item.image}" />

  <div class="cart-info">
    <div class="cart-info-header">
      <h6 title="${item.name}">
        ${truncateText(item.name, 45)}
      </h6>

      <button 
        class="cart-remove-item" 
        data-index="${index}"
        title="Xóa sản phẩm"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>

    <p>${item.price.toLocaleString()} ₫</p>

    <div class="cart-quantity">
      <button data-action="minus" data-index="${index}">-</button>
      <span>${item.quantity}</span>
      <button data-action="plus" data-index="${index}">+</button>
    </div>
  </div>
`;

    cartBody.appendChild(div);
  });

  updateTotal();
  updateCartBadge();
}

/* ====================== UPDATE QUANTITY ====================== */
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".cart-quantity button");
  if (!btn) return;

  const index = btn.dataset.index;
  const action = btn.dataset.action;

  let cart = getCart();

  if (action === "plus" && cart[index].quantity < 10) {
    cart[index].quantity++;
  }

  if (action === "minus" && cart[index].quantity > 1) {
    cart[index].quantity--;
  }

  saveCart(cart);
  renderCart();
  updateCartBadge();
});

/* ====================== REMOVE ITEM ====================== */
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".cart-remove-item");
  if (!btn) return;

  const index = btn.dataset.index;
  let cart = getCart();

  const isConfirm = confirm("Xóa sản phẩm này khỏi giỏ hàng?");
  if (!isConfirm) return;

  cart.splice(index, 1); // ❌ xóa item
  saveCart(cart);
  renderCart();
  updateCartBadge();
});

/* ====================== CLEAR CART ====================== */
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-clear-cart");
  if (!btn) return;

  const isConfirm = confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?");
  if (!isConfirm) return;

  saveCart([]); // clear localStorage
  renderCart();
  updateCartBadge();
});

/* ====================== TOTAL ====================== */
function updateTotal() {
  const cart = getCart();
  const totalEl = document.querySelector(".cart-total strong");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  totalEl.textContent = total.toLocaleString() + " ₫";
}

function updateCartBadge() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".cart-badge").forEach((badge) => {
    if (totalQty > 0) {
      badge.textContent = totalQty;
      badge.classList.remove("d-none");
    } else {
      badge.classList.add("d-none");
    }
  });
}

/* ====================== UTILS ====================== */
function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

/* ====================== THANK YOU MODAL ====================== */
function openThankYouModal() {
  const modal = document.querySelector(".thankyou-modal-overlay");

  modal.classList.remove("d-none");
  setTimeout(() => modal.classList.add("show"), 10);

  // AUTO CLOSE after 2s
  setTimeout(() => {
    closeThankYouModal();
  }, 3200);
}

function closeThankYouModal() {
  const modal = document.querySelector(".thankyou-modal-overlay");

  if (!modal.classList.contains("show")) return;

  modal.classList.remove("show");
  setTimeout(() => {
    modal.classList.add("d-none");
  }, 250);
}

/* ====================== CHECKOUT ====================== */
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-checkout");
  if (!btn) return;

  const cart = getCart();

  if (cart.length === 0) {
    alert("Giỏ hàng đang trống 😅");
    return;
  }

  // Clear cart
  saveCart([]);
  renderCart();
  updateCartBadge();

  // Close cart modal
  const cartOverlay = document.querySelector(".cart-modal-overlay");
  cartOverlay.classList.remove("show");
  setTimeout(() => cartOverlay.classList.add("d-none"), 250);

  // Open thank you modal
  openThankYouModal();
});

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-close-thankyou");
  if (!btn) return;

  closeThankYouModal();
});

document.addEventListener("click", function (e) {
  const overlay = e.target.closest(".thankyou-modal-overlay");
  if (!overlay) return;

  // Chỉ đóng khi click đúng overlay, không phải modal bên trong
  if (e.target === overlay) {
    closeThankYouModal();
  }
});
