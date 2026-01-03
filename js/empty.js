export function renderEmptyProduct() {
  const productList = document.getElementById("product-list");

  productList.innerHTML = `
    <div class="col-12">
      <div class="empty-product text-center">
        <div class="empty-product-icon">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h5>Không tìm thấy sản phẩm phù hợp</h5>
        <p>Vui lòng thử lại với bộ lọc khác</p>
      </div>
    </div>
  `;
}
