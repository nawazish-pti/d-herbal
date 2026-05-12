class CartPopup {

  constructor() {

    this.popup =
      document.querySelector('.cart_main_popup_container');

    this.init();

  }

  init() {

    this.bindClose();

    this.productAdded();

  }

  bindClose() {

    document.addEventListener('click', (e) => {

      if (
        e.target.closest('.close_cart_popup_btn')
      ) {

        this.close();

      }

    });

  }

  open() {

    this.popup.classList.add('is-open');

  }

  close() {

    this.popup.classList.remove('is-open');

  }

  productAdded() {

    document.addEventListener(
      'product:added',
      () => {

        this.open();

      }
    );

  }

}

new CartPopup();