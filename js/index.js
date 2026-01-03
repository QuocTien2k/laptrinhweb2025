import { initFilter } from "./filter.js";
import { renderProducts } from "./product.js";
import { filterData } from "./data.js";
import { initSearch } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  initFilter();

  // Trang chủ render 8 sản phẩm
  renderProducts(filterData, 8);

  // 🔥 Đợi header load xong rồi mới init search
  const waitHeader = setInterval(() => {
    if (initSearch()) {
      clearInterval(waitHeader);
    }
  }, 100);
});
