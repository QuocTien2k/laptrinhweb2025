// import { filterData } from "./data.js";
// import { renderEmptyProduct } from "./empty.js";

// const input = document.getElementById("header-search-input");
// const previewBox = document.getElementById("search-preview");

// function normalizeText(text) {
//   return text.toLowerCase();
// }

// function renderPreview(products) {
//   if (products.length === 0) {
//     previewBox.innerHTML = `
//       <div class="search-preview-empty">
//         Không tìm thấy sản phẩm phù hợp
//       </div>
//     `;
//     previewBox.classList.remove("d-none");
//     return;
//   }

//   previewBox.innerHTML = products
//     .map(
//       (item) => `
//       <div class="search-preview-item">
//         <div class="search-preview-name">${item.name}</div>
//         <div class="search-preview-price">
//           ${item.price.toLocaleString()} ₫
//         </div>
//       </div>
//     `
//     )
//     .join("");

//   previewBox.classList.remove("d-none");
// }

// input.addEventListener("input", () => {
//   const keyword = normalizeText(input.value.trim());

//   if (keyword.length === 0) {
//     previewBox.classList.add("d-none");
//     return;
//   }

//   const result = filterData.filter((item) =>
//     normalizeText(item.name).includes(keyword)
//   );

//   renderPreview(result);
// });

// /* Click ra ngoài thì ẩn */
// document.addEventListener("click", (e) => {
//   if (!e.target.closest(".header-search")) {
//     previewBox.classList.add("d-none");
//   }
// });

import { filterData } from "./data.js";

/* Cắt tên dài */
function truncateText(text, maxLength = 45) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function initSearch() {
  const input = document.getElementById("header-search-input");
  const previewBox = document.getElementById("search-preview");

  if (!input || !previewBox) return false;

  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase();

    if (!keyword) {
      previewBox.classList.add("d-none");
      previewBox.innerHTML = "";
      return;
    }

    const result = filterData
      .filter((item) => item.name.toLowerCase().includes(keyword))
      .slice(0, 6); // giới hạn 6 item cho UX đẹp

    previewBox.innerHTML = result.length
      ? result
          .map(
            (item) => `
            <div class="search-preview-item">
              <div class="search-preview-thumb">
                <img src="${item.picture}" alt="${item.name}" />
              </div>

              <div class="search-preview-info">
                <div class="search-preview-name">
                  ${truncateText(item.name)}
                </div>

                <div class="search-preview-price">
                  ${item.price.toLocaleString()} ₫
                </div>
              </div>
            </div>
          `
          )
          .join("")
      : `<div class="search-preview-empty">
          Không tìm thấy sản phẩm phù hợp
        </div>`;

    previewBox.classList.remove("d-none");
  });

  return true;
}
