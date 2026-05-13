// class CartPopup {

//   constructor() {

//     this.popup =
//       document.querySelector('.cart_main_popup_container');

//     console.log('Popup Element:', this.popup);

//     this.autoHideTimer = null;

//     this.init();

//   }

//   init() {

//     console.log('CartPopup Initialized');

//     this.bindCloseButton();

//     this.bindCartIcon();

//     this.listenProductAdded();

//   }

//   /* =========================
//       OPEN POPUP
//   ========================== */

//   open(autoHide = false) {

//     console.log('==========================');
//     console.log('OPEN POPUP FUNCTION');
//     console.log('==========================');

//     console.log(
//       'Auto Hide Enabled:',
//       autoHide
//     );

//     console.log(
//       'Popup Before Open:',
//       this.popup
//     );

//     if (!this.popup) {

//       console.warn(
//         'Popup element not found'
//       );

//       return;

//     }

//     console.log('Opening Cart Popup');

//     this.popup.style.display = 'block';

//     this.popup.classList.add('is-open');

//     console.log(
//       'Popup display:',
//       this.popup.style.display
//     );

//     console.log(
//       'Popup classes:',
//       this.popup.className
//     );

//     /* CLEAR OLD TIMER */

//     clearTimeout(this.autoHideTimer);

//     console.log(
//       'Previous auto hide timer cleared'
//     );

//     /* AUTO HIDE ONLY IF TRUE */

//     if (autoHide) {

//       console.log(
//         'Starting auto hide timer'
//       );

//       this.autoHideTimer = setTimeout(() => {

//         console.log(
//           'Auto hide timer completed'
//         );

//         this.close();

//       }, 2000);

//     } else {

//       console.log(
//         'Auto hide disabled'
//       );

//     }

//   }

//   /* =========================
//       CLOSE POPUP
//   ========================== */

//   close() {

//     console.log('==========================');
//     console.log('CLOSE POPUP FUNCTION');
//     console.log('==========================');

//     if (!this.popup) {

//       console.warn(
//         'Popup element not found'
//       );

//       return;

//     }

//     console.log('Closing Cart Popup');

//     this.popup.classList.remove('is-open');

//     this.popup.style.display = 'none';

//     console.log(
//       'Popup display:',
//       this.popup.style.display
//     );

//     console.log(
//       'Popup classes:',
//       this.popup.className
//     );

//   }

//   /* =========================
//       CLOSE BUTTON
//   ========================== */

//   bindCloseButton() {

//     console.log(
//       'Binding Close Button Event'
//     );

//     document.addEventListener('click', (e) => {

//       const closeBtn =
//         e.target.closest(
//           '.close_cart_popup_btn'
//         );

//       if (!closeBtn) return;

//       console.log(
//         'Close Button Clicked'
//       );

//       console.log(
//         'Close Button Element:',
//         closeBtn
//       );

//       this.close();

//     });

//   }

//   /* =========================
//       CART ICON CLICK
//   ========================== */

//   bindCartIcon() {

//     console.log(
//       'Binding Cart Icon Event'
//     );

//     document.addEventListener('click', (e) => {

//       const cartIcon =
//         e.target.closest('.header-cart-icon');

//       if (!cartIcon) return;

//       /* STOP CART PAGE REDIRECT */
//       e.preventDefault();

//       console.log('==========================');
//       console.log('CART ICON CLICK');
//       console.log('==========================');

//       console.log(
//         'Cart Icon Element:',
//         cartIcon
//       );

//       console.log(
//         'Default navigation prevented'
//       );

//       this.open(false);

//     });

//   }

//   /* =========================
//       PRODUCT ADDED EVENT
//   ========================= */

//   listenProductAdded() {

//     console.log(
//       'Listening product:added event'
//     );

//     document.addEventListener(
//       'product:added',
//       (event) => {

//         console.log('==========================');
//         console.log('PRODUCT ADDED EVENT');
//         console.log('==========================');

//         console.log(
//           'product:added event received'
//         );

//         console.log(
//           'Event Detail:',
//           event.detail
//         );

//         this.open(true);

//       }
//     );

//   }

// }

// console.log(
//   'Creating New CartPopup Instance'
// );

// new CartPopup();

class CartPopup {

  constructor() {

    console.log('==========================');
    console.log('CartPopup Constructor');
    console.log('==========================');

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

  open(autoHide = false) {

    console.log('==========================');
    console.log('OPEN POPUP FUNCTION');
    console.log('==========================');

    const popup = this.getPopup();

    console.log(
      'Auto Hide Enabled:',
      autoHide
    );

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

    /* CLEAR OLD TIMER */

    clearTimeout(this.autoHideTimer);

    console.log(
      'Previous auto hide timer cleared'
    );

    /* AUTO HIDE ONLY IF TRUE */

    if (autoHide) {

      console.log(
        'Starting auto hide timer'
      );

      this.autoHideTimer = setTimeout(() => {

        console.log(
          'Auto hide timer completed'
        );

        this.close();

      }, 2000);

    } else {

      console.log(
        'Auto hide disabled'
      );

    }

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

      console.log(
        'Close Button Element:',
        closeBtn
      );

      this.close();

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

      /* STOP CART PAGE REDIRECT */
      e.preventDefault();

      console.log('==========================');
      console.log('CART ICON CLICK');
      console.log('==========================');

      console.log(
        'Cart Icon Element:',
        cartIcon
      );

      console.log(
        'Default navigation prevented'
      );

      /* MANUAL OPEN */
      this.open(false);

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

        /* AUTO HIDE ENABLED */
        this.open(true);

      }
    );

  }

}

console.log(
  'Creating New CartPopup Instance'
);

new CartPopup();