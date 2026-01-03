// Load tất cả components
$(document).ready(function () {
  $("#header-component").load("components/header.html", function () {
    handleAuthHeader();
    initCartModal();
    initMobileMenu();
    handleResponsiveReset();

    // render lại cart + badge
    import("./cart.js").then((m) => m.renderCart());
  });
  $("#slideshow-component").load("components/slideshow.html");
  $("#brand-component").load("components/brand.html");
  $("#partner-component").load("components/partner.html");
  // $("#footer-component").load("components/footer.html");
});

//đăng nhập
function handleAuthHeader() {
  const user = JSON.parse(localStorage.getItem("userLogin"));

  if (user && user.email) {
    $(".auth-guest").addClass("d-none");
    $(".auth-user").removeClass("d-none");

    const shortEmail = truncateEmail(user.email, 18);

    $(".user-email").text(shortEmail).attr("title", user.email);

    $(".btn-logout").on("click", handleLogout);

    // Mobile
    $(".mobile-guest").addClass("d-none");
    $(".mobile-user").removeClass("d-none");
    $(".mobile-email").text(user.email);
    $(".mobile-logout").on("click", handleLogout);
  }
}

//đăng xuất
function handleLogout() {
  const isConfirm = confirm("Bạn có chắc chắn muốn đăng xuất không?");

  if (!isConfirm) return;

  localStorage.removeItem("userLogin");
  // Clear cart
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

//ngắt email nếu quá dài
function truncateEmail(email, maxLength) {
  if (email.length <= maxLength) return email;
  return email.slice(0, maxLength - 3) + "...";
}

//đóng-mở modal
function initCartModal() {
  const $overlay = $(".cart-modal-overlay");

  // MỞ MODAL (DESKTOP + MOBILE)
  $(document).on("click", ".header-cart, .mobile-cart", function (e) {
    e.preventDefault();

    $overlay.removeClass("d-none");
    setTimeout(() => {
      $overlay.addClass("show");
    }, 10);

    // đóng mobile menu nếu đang mở
    $(".mobile-menu-overlay").removeClass("show");
    $("body").removeClass("overflow-hidden");
  });

  // ĐÓNG MODAL
  function closeModal() {
    $overlay.removeClass("show");
    setTimeout(() => {
      $overlay.addClass("d-none");
    }, 250);
  }

  $(document).on("click", ".cart-close", closeModal);

  $overlay.on("click", function (e) {
    if ($(e.target).is(".cart-modal-overlay")) {
      closeModal();
    }
  });
}

// MOBILE MENU
function initMobileMenu() {
  const $overlay = $(".mobile-menu-overlay");

  // MỞ MENU
  $(document).on("click", ".header-menu-btn", function () {
    $overlay.addClass("show");
    $("body").addClass("overflow-hidden");
  });

  // ĐÓNG MENU
  $(document).on(
    "click",
    ".mobile-menu-close, .mobile-menu-overlay",
    function (e) {
      if ($(e.target).closest(".mobile-menu").length === 0) {
        closeMobileMenu();
      }
    }
  );

  function closeMobileMenu() {
    $overlay.removeClass("show");
    $("body").removeClass("overflow-hidden");
  }
}

function handleResponsiveReset() {
  const breakpoint = 768;

  $(window).on("resize", function () {
    if (window.innerWidth > breakpoint) {
      // Đóng mobile menu nếu đang mở
      $(".mobile-menu-overlay").removeClass("show");
      $("body").removeClass("overflow-hidden");
    }
  });
}
