class GlobalCart {

  constructor() {
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

      const res = await fetch('/cart/add.js', {
        method: 'POST',
        body: new FormData(form)
      });

      if (!res.ok) {
        throw new Error('Add to cart failed');
      }

      const product = await res.json();

      /* GET UPDATED CART */
      const cart = await this.getCart();

      /* GLOBAL EVENT */
      document.dispatchEvent(
        new CustomEvent('cart:updated', {
          detail: cart
        })
      );

      /* PRODUCT ADDED EVENT */
      document.dispatchEvent(
        new CustomEvent('product:added', {
          detail: product
        })
      );

    } catch (err) {
      console.error(err);
    }
  }

  /* =========================
      UPDATE CART
  ========================== */

  async updateCart(line, quantity) {

    try {

      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          line,
          quantity
        })
      });

      const cart = await res.json();

      document.dispatchEvent(
        new CustomEvent('cart:updated', {
          detail: cart
        })
      );

      return cart;

    } catch (err) {

      console.error('Cart update failed', err);

    }
  }

  /* =========================
      GET CART
  ========================== */

  async getCart() {

    return fetch('/cart.js')
      .then(res => res.json());

  }

  /* =========================
      CART FORM SUBMIT
  ========================== */

  bindCartForms() {

    document.addEventListener('submit', (e) => {

      const form = e.target.closest('form[action*="/cart/add"]');

      if (!form) return;

      e.preventDefault();

      this.addToCart(form);

    });

  }

  /* =========================
      QUANTITY BUTTONS
  ========================== */

  bindQuantityButtons() {

    document.addEventListener('click', async (e) => {

      const btn = e.target.closest('.cart_qty_btn');

      if (!btn) return;

      const line = parseInt(btn.dataset.line, 10);

      const action = btn.dataset.action;

      const itemEl = btn.closest('.cart_popup_item');

      const qtyEl = itemEl.querySelector('.cart_qty_value');

      let currentQty = parseInt(qtyEl.textContent, 10);

      let newQty = action === 'increase'
        ? currentQty + 1
        : currentQty - 1;

      if (newQty < 0) return;

      await this.updateCart(line, newQty);

    });

  }

}

/* INIT */
window.GlobalCart = new GlobalCart();