class GlobalCart {

  constructor() {

    this.sections = [
      {
        id: 'cart-popup',
        selector: '#cart-popup-section'
      },
      {
        id: 'cart-drawer',
        selector: '#cart-drawer-section'
      },
      {
        id: 'cart-icon-bubble',
        selector: '#cart-icon-bubble'
      }
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

      const res = await fetch('/cart/add.js', {
        method: 'POST',
        body: new FormData(form)
      });

      if (!res.ok) {
        throw new Error('Add to cart failed');
      }

      const product = await res.json();

      /* GLOBAL RE-RENDER */
      await this.renderSections();

      const cart = await this.getCart();

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

      /* GLOBAL RE-RENDER */
      await this.renderSections();

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
      GLOBAL SECTION RENDER
  ========================== */

  async renderSections() {

    try {

      const sectionIds = this.sections
        .map(section => section.id)
        .join(',');

      const res = await fetch(
        `/?sections=${sectionIds}`
      );

      const sections = await res.json();

      this.sections.forEach(section => {

        const html = sections[section.id];

        if (!html) return;

        const parser = new DOMParser();

        const doc = parser.parseFromString(
          html,
          'text/html'
        );

        const newContent =
          doc.querySelector(section.selector);

        const currentContent =
          document.querySelector(section.selector);

        if (newContent && currentContent) {

          currentContent.innerHTML =
            newContent.innerHTML;

        }

      });

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
      ADD TO CART FORM
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
      QTY BUTTONS
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