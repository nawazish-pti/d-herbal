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

      /* RE-RENDER CART */
      await this.renderCartSection();

      /* UPDATED CART */
      const cart = await this.getCart();

      /* EVENTS */
      document.dispatchEvent(
        new CustomEvent('cart:updated', {
          detail: cart
        })
      );

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

      if (!res.ok) {
        throw new Error('Cart update failed');
      }

      const cart = await res.json();

      /* RE-RENDER */
      await this.renderCartSection();

      document.dispatchEvent(
        new CustomEvent('cart:updated', {
          detail: cart
        })
      );

      return cart;

    } catch (err) {

      console.error(err);

    }

  }

  /* =========================
      RENDER CART SECTION
  ========================== */

  async renderCartSection() {

    try {

      const res = await fetch('/?section_id=cart-popup');

      const htmlText = await res.text();

      const parser = new DOMParser();

      const doc = parser.parseFromString(htmlText, 'text/html');

      const newContent =
        doc.querySelector('.cart_main_popup_container');

      const currentContent =
        document.querySelector('.cart_main_popup_container');

      if (newContent && currentContent) {

        currentContent.innerHTML = newContent.innerHTML;

      }

    } catch (err) {

      console.error('Section render failed', err);

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
      BIND ADD TO CART
  ========================== */

  bindCartForms() {

    document.addEventListener('submit', (e) => {

      const form = e.target.closest(
        'form[action*="/cart/add"]'
      );

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

      const qtyEl =
        btn.closest('.qty_box')
        .querySelector('.cart_qty_value');

      let currentQty =
        parseInt(qtyEl.textContent, 10);

      let newQty =
        action === 'increase'
        ? currentQty + 1
        : currentQty - 1;

      if (newQty < 0) return;

      await this.updateCart(line, newQty);

    });

  }

}

window.GlobalCart = new GlobalCart();