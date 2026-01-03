import { initFilter } from "./filter.js";
import { initSearch } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  initFilter(8); // Trang chủ render 8 sản phẩm

  // 🔥 Đợi header load xong rồi mới init search
  const waitHeader = setInterval(() => {
    if (initSearch()) {
      clearInterval(waitHeader);
    }
  }, 100);
});
