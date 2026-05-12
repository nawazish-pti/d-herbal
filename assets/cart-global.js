class GlobalCart {

  constructor() {

    console.log('GlobalCart Initialized');

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

    console.log('Registered Sections:', this.sections);

    this.init();

  }

  init() {

    console.log('Init Global Cart');

    this.bindCartForms();

    this.bindQuantityButtons();

  }

  /* =========================
      ADD TO CART
  ========================== */

  async addToCart(form) {

    try {

      console.log('Add To Cart Started');

      const formData = new FormData(form);

      for (let pair of formData.entries()) {
        console.log('FormData:', pair[0], pair[1]);
      }

      const res = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      console.log('Add To Cart Response:', res);

      if (!res.ok) {
        throw new Error('Add to cart failed');
      }

      const product = await res.json();

      console.log('Added Product:', product);

      /* GLOBAL RE-RENDER */
      console.log('Re-rendering sections...');
      await this.renderSections();

      const cart = await this.getCart();

      console.log('Updated Cart:', cart);

      document.dispatchEvent(
        new CustomEvent('cart:updated', {
          detail: cart
        })
      );

      console.log('cart:updated event dispatched');

      document.dispatchEvent(
        new CustomEvent('product:added', {
          detail: product
        })
      );

      console.log('product:added event dispatched');

    } catch (err) {

      console.error('Add To Cart Error:', err);

    }

  }

  /* =========================
      UPDATE CART
  ========================== */

  async updateCart(line, quantity) {

    try {

      console.log('Update Cart Started');
      console.log('Line:', line);
      console.log('Quantity:', quantity);

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

      console.log('Cart Change Response:', res);

      if (!res.ok) {
        throw new Error('Cart update failed');
      }

      const cart = await res.json();

      console.log('Updated Cart Data:', cart);

      /* GLOBAL RE-RENDER */
      console.log('Re-rendering sections...');
      await this.renderSections();

      document.dispatchEvent(
        new CustomEvent('cart:updated', {
          detail: cart
        })
      );

      console.log('cart:updated event dispatched');

      return cart;

    } catch (err) {

      console.error('Cart Update Error:', err);

    }

  }

  /* =========================
      GLOBAL SECTION RENDER
  ========================== */

  async renderSections() {

    try {

      console.log('Render Sections Started');

      const sectionIds = this.sections
        .map(section => section.id)
        .join(',');

      console.log('Fetching Sections:', sectionIds);

      const url = `/?sections=${sectionIds}`;

      console.log('Fetch URL:', url);

      const res = await fetch(url);

      console.log('Sections Fetch Response:', res);

      const sections = await res.json();

      console.log('Fetched Sections HTML:', sections);

      this.sections.forEach(section => {

        console.log('Processing Section:', section.id);

        const html = sections[section.id];

        if (!html) {

          console.warn(`No HTML returned for ${section.id}`);

          return;

        }

        const parser = new DOMParser();

        const doc = parser.parseFromString(
          html,
          'text/html'
        );

        const newContent =
          doc.querySelector(section.selector);

        const currentContent =
          document.querySelector(section.selector);

        console.log('New Content:', newContent);
        console.log('Current Content:', currentContent);

        if (newContent && currentContent) {

          currentContent.innerHTML =
            newContent.innerHTML;

          console.log(`${section.id} updated successfully`);

        } else {

          console.warn(
            `Selector missing for ${section.id}`
          );

        }

      });

      console.log('All Sections Rendered');

    } catch (err) {

      console.error('Section Render Failed:', err);

    }

  }

  /* =========================
      GET CART
  ========================== */

  async getCart() {

    console.log('Fetching Cart Data');

    const cart = await fetch('/cart.js')
      .then(res => res.json());

    console.log('Cart Data:', cart);

    return cart;

  }

  /* =========================
      ADD TO CART FORM
  ========================== */

  bindCartForms() {

    console.log('Binding Add To Cart Forms');

    document.addEventListener('submit', (e) => {

      const form = e.target.closest(
        'form[action*="/cart/add"]'
      );

      if (!form) return;

      console.log('Add To Cart Form Submitted');

      e.preventDefault();

      this.addToCart(form);

    });

  }

  /* =========================
      QTY BUTTONS
  ========================== */

  bindQuantityButtons() {

    console.log('Binding Quantity Buttons');

    document.addEventListener('click', async (e) => {

      const btn = e.target.closest('.cart_qty_btn');

      if (!btn) return;

      console.log('Quantity Button Clicked');

      const line = parseInt(btn.dataset.line, 10);

      const action = btn.dataset.action;

      console.log('Line:', line);
      console.log('Action:', action);

      const qtyEl =
        btn.closest('.qty_box')
        .querySelector('.cart_qty_value');

      let currentQty =
        parseInt(qtyEl.textContent, 10);

      console.log('Current Quantity:', currentQty);

      let newQty =
        action === 'increase'
        ? currentQty + 1
        : currentQty - 1;

      console.log('New Quantity:', newQty);

      if (newQty < 0) {

        console.warn('Quantity cannot be below 0');

        return;

      }

      await this.updateCart(line, newQty);

    });

  }

}

window.GlobalCart = new GlobalCart();