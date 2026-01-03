import { initFilter } from "./filter.js";
import { initSearch } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  // Trang products → không limit → show tất cả
  initFilter();

  // Đợi header load xong rồi mới init search
  const waitHeader = setInterval(() => {
    if (initSearch()) {
      clearInterval(waitHeader);
    }
  }, 100);
});
