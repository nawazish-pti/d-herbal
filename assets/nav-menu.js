document.addEventListener("DOMContentLoaded", function () {
  const dropdownGroups = document.querySelectorAll("menu-drop details");

  dropdownGroups.forEach((drop) => {
    const summary = drop.querySelector("summary");
    const panel = drop.querySelector(".dropdown-panel");

    summary.addEventListener("click", function (e) {
      e.preventDefault();
      toggleDropdown(drop, panel);
    });

    summary.addEventListener("mouseenter", function () {
      if (window.innerWidth > 1024) {
        openDropdown(drop, panel);
      }
    });

    drop.addEventListener("mouseleave", function () {
      if (window.innerWidth > 1024) {
        closeDropdown(drop, panel);
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest("menu-drop")) {
      closeAllDropdowns();
    }
  });

  // ========== Helpers ========== //

  function toggleDropdown(wrapper, panel) {
    const isOpen = wrapper.hasAttribute("open");

    closeAllDropdowns();

    if (!isOpen) {
      openDropdown(wrapper, panel);
    }
  }

  function openDropdown(wrapper, panel) {
    wrapper.setAttribute("open", "");
    panel.classList.add("panel-open");
  }

  function closeDropdown(wrapper, panel) {
    wrapper.removeAttribute("open");
    panel.classList.remove("panel-open");
  }

  function closeAllDropdowns() {
    dropdownGroups.forEach((drop) => {
      drop.removeAttribute("open");

      const pnl = drop.querySelector(".dropdown-panel");
      pnl?.classList.remove("panel-open");
    });
  }
});
