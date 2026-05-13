class GlobalCart {
  constructor() {
    this.sections = [
      {
        id: "cart-popup",
        selector: "#cart-popup-section",
      },
      {
        id: "cart-drawer",
        selector: "#cart-drawer-section",
      },
      {
        id: "cart-icon-bubble",
        selector: "#cart-icon-bubble",
      },
    ];

    this.init();
  }

  init() {
    this.bindCartForms();

    this.bindQuantityButtons();
  }

  /* =========================
      ADD TO CART
  ========================== */

  async addToCart(form) {
    try {
      const formData = new FormData(form);

      const res = await fetch("/cart/add.js", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Add to cart failed");
      }

      const product = await res.json();

      await this.renderCart();

      const cart = await this.getCart();

      document.dispatchEvent(
        new CustomEvent("cart:updated", {
          detail: cart,
        }),
      );

      document.dispatchEvent(
        new CustomEvent("product:added", {
          detail: product,
        }),
      );
    } catch (err) {
      console.error("Add To Cart Error:", err);
    }
  }

  async updateCart(line, quantity) {

    try {

      const formData =
        new FormData();

      formData.append(
        "line",
        line
      );

      formData.append(
        "quantity",
        quantity
      );

      const res = await fetch(
        "/cart/change.js",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {

        const error =
          await res.json();

        console.error(
          "Shopify Error:",
          error
        );

        throw error;

      }

      const cart =
        await res.json();

      await this.renderCart();

      document.dispatchEvent(
        new CustomEvent(
          "cart:updated",
          {
            detail: cart,
          }
        )
      );

      return cart;

    } catch (err) {

      console.error(
        "Cart Update Error:",
        err
      );

    }

  }

  async renderCart() {
    try {
      const res = await fetch("/?sections=header");

      const sections = await res.json();

      const html = sections.header;

      if (!html) {
        console.warn("No header HTML returned");

        return;
      }

      const parser = new DOMParser();

      const doc = parser.parseFromString(html, "text/html");

      /* =========================
          UPDATE MAIN CART
      ========================== */

      const newCart = doc.querySelector(".main-cart");

      const currentCart = document.querySelector(".main-cart");

      if (newCart && currentCart) {
        currentCart.innerHTML = newCart.innerHTML;
      }

      /* =========================
          UPDATE CART BUBBLE
      ========================== */

      const newIcons = doc.querySelector(".header__icons");

      const currentIcons = document.querySelector(".header__icons");

      if (newIcons && currentIcons) {
        currentIcons.innerHTML = newIcons.innerHTML;
      }
    } catch (err) {
      console.error("Cart render failed", err);
    }
  }

  async getCart() {
    const cart = await fetch("/cart.js").then((res) => res.json());

    return cart;
  }

  /* =========================
      ADD TO CART FORM
  ========================== */

  bindCartForms() {
    document.addEventListener("submit", (e) => {
      const form = e.target.closest('form[action*="/cart/add"]');

      if (!form) return;

      e.preventDefault();

      this.addToCart(form);
    });
  }

  /* =========================
      QTY BUTTONS
  ========================== */

  bindQuantityButtons() {

    document.addEventListener(
      "click",
      async (e) => {

        const btn =
          e.target.closest(
            ".cart_qty_btn"
          );

        if (!btn) return;

        const qtyWrapper =
          btn.closest(
            ".cart_qty_control"
          );

        const line =
           parseInt(qtyWrapper.dataset.line,10);
          console.log(typeof line); 
        const action =
          btn.dataset.action;

        const qtyEl =
          qtyWrapper.querySelector(
            ".cart_qty_value"
          );

        let currentQty =
          parseInt(
            qtyEl.textContent,
            10
          );

        let newQty =
          action === "increase"
            ? currentQty + 1
            : currentQty - 1;

        if (newQty < 0) return;

        const errorEl =
  qtyWrapper.parentElement.querySelector(
    ".cart_stock_error"
  );

if (errorEl) {
  errorEl.textContent = "";
}

try {

  await this.updateCart(
    line,
    newQty
  );

} catch (err) {

  if (errorEl) {

    errorEl.textContent =
      "Not in stock";

  }

}

      }
    );

  }
}

window.GlobalCart = new GlobalCart();
