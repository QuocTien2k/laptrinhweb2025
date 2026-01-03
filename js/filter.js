import { filterData } from "./data.js";
import { renderProducts } from "./product.js";
import { renderEmptyProduct } from "./empty.js";

let currentData = [...filterData];
let currentLimit = null;

export function initFilter(limit = null) {
  currentLimit = limit; // 🔥 LƯU LIMIT
  renderBrandFilter();
  renderProducts(filterData, currentLimit);

  document
    .getElementById("filter-price")
    .addEventListener("change", applyFilter);

  document
    .getElementById("reset-filter")
    .addEventListener("click", resetFilter);
}

function renderBrandFilter() {
  const brands = [...new Set(filterData.map((item) => item.type))];
  const brandContainer = document.getElementById("filter-brand");

  brandContainer.innerHTML = brands
    .map(
      (brand) => `
      <div class="form-check">
        <input class="form-check-input brand-checkbox" 
               type="checkbox" 
               value="${brand}">
        <label class="form-check-label">${brand.toUpperCase()}</label>
      </div>
    `
    )
    .join("");

  document
    .querySelectorAll(".brand-checkbox")
    .forEach((cb) => cb.addEventListener("change", applyFilter));
}

function applyFilter() {
  const selectedBrands = Array.from(
    document.querySelectorAll(".brand-checkbox:checked")
  ).map((cb) => cb.value);

  const priceValue = document.getElementById("filter-price").value;

  currentData = filterData.filter((item) => {
    const matchBrand =
      selectedBrands.length === 0 || selectedBrands.includes(item.type);

    let matchPrice = true;
    if (priceValue) {
      const [min, max] = priceValue.split("-").map(Number);
      matchPrice = item.price >= min && item.price <= max;
    }

    return matchBrand && matchPrice;
  });

  if (currentData.length === 0) {
    renderEmptyProduct();
  } else {
    renderProducts(currentData, currentLimit);
  }
}

function resetFilter() {
  document
    .querySelectorAll(".brand-checkbox")
    .forEach((cb) => (cb.checked = false));

  document.getElementById("filter-price").value = "";

  currentData = [...filterData];
  renderProducts(currentData, currentLimit);
}
