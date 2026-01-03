import { addToCart } from "./cart.js";

export function renderProducts(products, limit = null) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  const displayProducts = limit
    ? products.slice(0, limit) // có limit → cắt
    : products; // không có → render hết

  displayProducts.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6";

    col.innerHTML = `
      <div class="product-card">
        <div class="product-image">
          <img src="${item.picture}" alt="${item.name}">
          ${
            item.discount
              ? `<span class="product-discount">${item.discount}</span>`
              : ""
          }
        </div>

        <div class="product-info">
          <h6 class="product-name">${item.name}</h6>
          <p class="product-price">${item.price.toLocaleString()} ₫</p>

          <button class="btn-add-cart">
            <i class="fa-solid fa-cart-plus"></i>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    `;

    // GẮN EVENT SAU KHI TẠO DOM
    col.querySelector(".btn-add-cart").addEventListener("click", () => {
      handleAddToCart(item);
    });

    productList.appendChild(col);
  });
}

function handleAddToCart(product) {
  const user = localStorage.getItem("userLogin");

  if (!user) {
    alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
    return;
  }

  addToCart(product);
}
