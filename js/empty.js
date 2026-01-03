export function renderEmptyProduct() {
  const productList = document.getElementById("product-list");

  productList.innerHTML = `
    <div class="empty-product">
      <div class="empty-product-box">
        <div class="empty-product-icon">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h5 class="empty-product-title">
          Không tìm thấy sản phẩm phù hợp
        </h5>
        <p class="empty-product-desc">
          Vui lòng thử lại với bộ lọc khác hoặc điều chỉnh mức giá
        </p>
      </div>
    </div>
  `;
}
