class CartPopup {

  constructor() {

    this.popup = document.querySelector('.cart_main_popup_container');

    this.init();

  }

  init() {

    this.bindCloseButton();

    this.cartUpdated();

    this.productAdded();

  }

  /* =========================
      OPEN POPUP
  ========================== */

  open() {

    this.popup.style.display = 'block';

    this.popup.classList.add('is-open');

  }

  /* =========================
      CLOSE POPUP
  ========================== */

  close() {

    this.popup.style.display = 'none';

    this.popup.classList.remove('is-open');

  }

  bindCloseButton() {

    const closeBtn = document.querySelector('.close_cart_popup_btn');

    if (!closeBtn) return;

    closeBtn.addEventListener('click', () => {

      this.close();

    });

  }

  /* =========================
      PRODUCT ADDED
  ========================== */

  productAdded() {

    document.addEventListener('product:added', () => {

      this.open();

    });

  }

  /* =========================
      CART UPDATED
  ========================== */

  cartUpdated() {

    document.addEventListener('cart:updated', (e) => {

      const cart = e.detail;

      this.render(cart);

    });

  }

  /* =========================
      RENDER POPUP
  ========================== */

  render(cart) {

    const container = document.querySelector('.cart_popup_items');

    if (!container) return;

    if (cart.item_count === 0) {

      container.innerHTML =
        '<p>Your cart is currently empty.</p>';

      return;

    }

    let html = '';

    cart.items.forEach((item, index) => {

      html += `
        <div class="cart_popup_item">

          <p>${item.product_title}</p>

          <div class="qty_box">

            <button
              class="cart_qty_btn"
              data-line="${index + 1}"
              data-action="decrease"
            >
              -
            </button>

            <span class="cart_qty_value">
              ${item.quantity}
            </span>

            <button
              class="cart_qty_btn"
              data-line="${index + 1}"
              data-action="increase"
            >
              +
            </button>

          </div>

        </div>
      `;

    });

    container.innerHTML = html;

  }

}

/* INIT */
new CartPopup();