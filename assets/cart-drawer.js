class CartDrawer {

  constructor() {

    this.init();

  }

  init() {

    this.bindCartIcon();

    this.bindCloseButton();

    this.bindOutsideClick();

    this.listenProductAdded();
    this.bindDrawerQuantityButtons();

  }

  /* =========================
      GET DRAWER
  ========================== */

  getDrawer() {

    return document.querySelector(
      '.cart_main_drawer_container'
    );

  }

  /* =========================
      OPEN DRAWER
  ========================== */

  open() {

    const drawer = this.getDrawer();

    if (!drawer) return;

    drawer.classList.add('is-open');

    document.body.classList.add(
      'drawer-open'
    );

  }

  /* =========================
      CLOSE DRAWER
  ========================== */

  close() {

    const drawer = this.getDrawer();

    if (!drawer) return;

    drawer.classList.remove('is-open');

    document.body.classList.remove(
      'drawer-open'
    );

  }

  /* =========================
      CART ICON CLICK
  ========================== */

  bindCartIcon() {

    document.addEventListener(
      'click',
      (e) => {

        const cartIcon =
          e.target.closest(
            '.header-cart-icon'
          );

        if (!cartIcon) return;

        e.preventDefault();

        this.open();

      }
    );

  }

  /* =========================
      CLOSE BUTTON
  ========================== */

  bindCloseButton() {

    document.addEventListener(
      'click',
      (e) => {

        const closeBtn =
          e.target.closest(
            '.close_cart_popup_btn'
          );

        if (!closeBtn) return;

        this.close();

      }
    );

  }

  /* =========================
      OUTSIDE CLICK
  ========================== */

    bindOutsideClick() {

        document.addEventListener(
            'click',
            (e) => {

            const drawer =
                this.getDrawer();

            if (!drawer) return;

            const clickedInsideDrawer =
                e.target.closest(
                '.cart_main_drawer_container'
                );

            const cartIcon =
                e.target.closest(
                '.header-cart-icon'
                );

            const isOpen =
                drawer.classList.contains(
                'is-open'
                );

            if (
                isOpen &&
                !clickedInsideDrawer &&
                !cartIcon
            ) {

                this.close();

            }

            }
        );

    }
    bindDrawerQuantityButtons() {

        document.addEventListener(
            "click",
            async (e) => {

            const btn =
                e.target.closest(
                ".cart_main_drawer_container .cart_qty_btn"
                );

            if (!btn) return;

            e.stopPropagation();

            const qtyWrapper =
                btn.closest(
                ".cart_qty_control"
                );

            const line =
                parseInt(
                qtyWrapper.dataset.line,
                10
                );

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

            if (newQty < 1) return;

            await window.GlobalCart.updateCart(
                line,
                newQty
            );

            this.open();

            }
        );

    }
    
  /* =========================
      PRODUCT ADDED EVENT
  ========================== */

  listenProductAdded() {

    document.addEventListener(
      'product:added',
      () => {

        this.open();

      }
    );

  }

}

new CartDrawer();