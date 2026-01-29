document.addEventListener("DOMContentLoaded", function () {
  const dropdownGroups = document.querySelectorAll("menu-drop details");
  
  dropdownGroups.forEach((drop) => {
    const summary = drop.querySelector("summary");
    const panel = drop.querySelector(".dropdown-panel");
    const caret = drop.querySelector("summary .icon_caret");

    summary.addEventListener("click", function (e) {
      e.preventDefault();
      toggleDropdown(drop, panel, caret);
    });



    // --- Sublist handling: open on hover for desktop, toggle on click for mobile ---
    const dropdownItems = drop.querySelectorAll('.dropdown-item');
    dropdownItems.forEach((item) => {
      const sublist = item.querySelector('.sublist');
      const link = item.querySelector('a');
      if (!sublist) return;

      // toggle sublist on click (all screen sizes)
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          sublist.classList.toggle('sub-open');
        });
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest("menu-drop")) {
      closeAllDropdowns();
    }
  });

  // ========== Helpers ========== //

  function toggleDropdown(wrapper, panel, svg) {
    const isOpen = wrapper.hasAttribute("open");

    closeAllDropdowns();

    if (!isOpen) {
      openDropdown(wrapper, panel, svg);
    }
  }

  function openDropdown(wrapper, panel, svg) {
    wrapper.setAttribute("open", "");
    panel.classList.add("panel-open");
    // keep caret rotated while dropdown is open
    svg?.classList.add("is-open");
  }

  function closeDropdown(wrapper, panel, svg) {
    wrapper.removeAttribute("open");
    panel.classList.remove("panel-open");
    // remove persistent open state so caret resets
    svg?.classList.remove("is-open");
  }

  function closeAllDropdowns() {
    dropdownGroups.forEach((drop) => {
      drop.removeAttribute("open");
      const caret = drop.querySelector("summary .icon_caret");
      caret?.classList.remove("is-hover");
      caret?.classList.remove("is-open");

      // close any open sublists
      const sublists = drop.querySelectorAll('.sublist');
      sublists.forEach(s => s.classList.remove('sub-open'));

      const pnl = drop.querySelector(".dropdown-panel");
      pnl?.classList.remove("panel-open");
    });
  }
});

