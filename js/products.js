import { filterData } from "./data.js";
import { renderProducts } from "./product.js";
import { initFilter } from "./filter.js";

document.addEventListener("DOMContentLoaded", () => {
  initFilter();

  // Render toàn bộ sản phẩm
  renderProducts(filterData, filterData.length);
});
