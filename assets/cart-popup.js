class CartPopup {

  constructor() {

    console.log('==========================');
    console.log('CartPopup Constructor');
    console.log('==========================');

    this.init();

  }

  init() {

    console.log('CartPopup Initialized');

    this.bindCloseButton();

    this.bindOutsideClick();

    this.bindCartIcon();

    this.listenProductAdded();

  }

  /* =========================
      GET POPUP
  ========================== */

  getPopup() {

    return document.querySelector(
      '.cart_main_popup_container'
    );

  }

  /* =========================
      OPEN POPUP
  ========================== */

  open() {

    console.log('==========================');
    console.log('OPEN POPUP FUNCTION');
    console.log('==========================');

    const popup = this.getPopup();

    console.log(
      'Popup Before Open:',
      popup
    );

    if (!popup) {

      console.warn(
        'Popup element not found'
      );

      return;

    }

    console.log('Opening Cart Popup');

    popup.style.display = 'block';

    popup.classList.add('is-open');

    console.log(
      'Popup display:',
      popup.style.display
    );

    console.log(
      'Popup classes:',
      popup.className
    );

  }

  /* =========================
      CLOSE POPUP
  ========================== */

  close() {

    console.log('==========================');
    console.log('CLOSE POPUP FUNCTION');
    console.log('==========================');

    const popup = this.getPopup();

    if (!popup) {

      console.warn(
        'Popup element not found'
      );

      return;

    }

    console.log('Closing Cart Popup');

    popup.classList.remove('is-open');

    popup.style.display = 'none';

    console.log(
      'Popup display:',
      popup.style.display
    );

    console.log(
      'Popup classes:',
      popup.className
    );

  }

  /* =========================
      CLOSE BUTTON
  ========================== */

  bindCloseButton() {

    console.log(
      'Binding Close Button Event'
    );

    document.addEventListener('click', (e) => {

      const closeBtn =
        e.target.closest(
          '.close_cart_popup_btn'
        );

      if (!closeBtn) return;

      console.log(
        'Close Button Clicked'
      );

      this.close();

    });

  }

  /* =========================
      OUTSIDE CLICK CLOSE
  ========================== */

  bindOutsideClick() {

    console.log(
      'Binding Outside Click Event'
    );

    document.addEventListener('click', (e) => {

      const popup = this.getPopup();

      if (!popup) return;

      const popupInner =
        e.target.closest('.cart_popup_inner');

      const cartIcon =
        e.target.closest('.header-cart-icon');

      const popupOpen =
        popup.classList.contains('is-open');

      if (
        popupOpen &&
        !popupInner &&
        !cartIcon
      ) {

        console.log(
          'Outside Click Detected'
        );

        this.close();

      }

    });

  }

  /* =========================
      CART ICON CLICK
  ========================== */

  bindCartIcon() {

    console.log(
      'Binding Cart Icon Event'
    );

    document.addEventListener('click', (e) => {

      const cartIcon =
        e.target.closest(
          '.header-cart-icon'
        );

      if (!cartIcon) return;

      console.log('==========================');
      console.log('CART ICON CLICK');
      console.log('==========================');

      console.log(
        'Redirecting to cart page'
      );

      // close popup if open
      this.close();

      // no preventDefault
      // browser will redirect normally

    });

  }

  /* =========================
      PRODUCT ADDED EVENT
  ========================== */

  listenProductAdded() {

    console.log(
      'Listening product:added event'
    );

    document.addEventListener(
      'product:added',
      (event) => {

        console.log('==========================');
        console.log('PRODUCT ADDED EVENT');
        console.log('==========================');

        console.log(
          'product:added event received'
        );

        console.log(
          'Event Detail:',
          event.detail
        );

        const product = event.detail;

console.log(
  'Added Product:',
  product
);

const popupItem =
  document.querySelector(
    '.cart_popup_item'
  );

if (popupItem) {

  const image =
    popupItem.querySelector(
      '.cart-popup-item__image'
    );

  const title =
    popupItem.querySelector(
      '.cart_popup_item_title'
    );

  if (image) {

  if (product.featured_image?.url) {

    image.src =
      product.featured_image.url;

  } else if (product.image) {

    image.src = product.image;

  }

}

  if (title) {
    title.textContent = product.title;
  }

}

this.open();

      }
    );

  }

}

console.log(
  'Creating New CartPopup Instance'
);

new CartPopup();