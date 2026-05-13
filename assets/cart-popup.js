class CartPopup {

  constructor() {

    this.popup =
      document.querySelector('.cart_main_popup_container');

    this.autoHideTimer = null;

    this.init();

  }

  init() {

    console.log('CartPopup Initialized');

    this.bindCloseButton();

    this.bindCartIcon();

    this.listenProductAdded();

  }

  /* =========================
      OPEN POPUP
  ========================== */

  open() {

    if (!this.popup) return;

    console.log('Opening Cart Popup');

    this.popup.style.display = 'block';

    this.popup.classList.add('is-open');

    /* AUTO HIDE */

    clearTimeout(this.autoHideTimer);

    this.autoHideTimer = setTimeout(() => {

      this.close();

    }, 2000);

  }

  /* =========================
      CLOSE POPUP
  ========================== */

  close() {

    if (!this.popup) return;

    console.log('Closing Cart Popup');

    this.popup.classList.remove('is-open');

    this.popup.style.display = 'none';

  }

  /* =========================
      CLOSE BUTTON
  ========================== */

  bindCloseButton() {

    document.addEventListener('click', (e) => {

      if (
        e.target.closest('.close_cart_popup_btn')
      ) {

        this.close();

      }

    });

  }

  /* =========================
      CART ICON CLICK
  ========================== */

  bindCartIcon() {

    document.addEventListener('click', (e) => {

      const cartIcon =
        e.target.closest('.header-cart-icon');

      if (!cartIcon) return;

      e.preventDefault();

      console.log('Cart Icon Clicked');

      this.open();

    });

  }

  /* =========================
      PRODUCT ADDED EVENT
  ========================== */

  listenProductAdded() {

    document.addEventListener(
      'product:added',
      () => {

        console.log(
          'product:added event received'
        );

        this.open();

      }
    );

  }

}

new CartPopup();