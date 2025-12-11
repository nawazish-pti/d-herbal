document.addEventListener("DOMContentLoaded", function () {
  const dropdownGroups = document.querySelectorAll("menu-drop details");

  if (!dropdownGroups.length) return;

  dropdownGroups.forEach((drop) => {
    const summary = drop.querySelector("summary");

    // Open/close on click
    summary.addEventListener("click", function (e) {
      e.preventDefault(); // prevents link jump
      toggleDropdown(drop);
    });

    // Optional: open on hover (Desktop only)
    summary.addEventListener("mouseenter", function () {
      if (window.innerWidth > 1024) {
        openDropdown(drop);
      }
    });

    drop.addEventListener("mouseleave", function () {
      if (window.innerWidth > 1024) {
        closeDropdown(drop);
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest("menu-drop")) {
      closeAllDropdowns();
    }
  });

  // ======= Helper Functions ======= //

  function toggleDropdown(target) {
    const isOpen = target.hasAttribute("open");

    closeAllDropdowns();

    if (!isOpen) {
      openDropdown(target);
    }
  }

  function openDropdown(el) {
    el.setAttribute("open", "");
    const summary = el.querySelector("summary");
    summary.classList.add("dropdown-active");
  }

  function closeDropdown(el) {
    el.removeAttribute("open");
    const summary = el.querySelector("summary");
    summary.classList.remove("dropdown-active");
  }

  function closeAllDropdowns() {
    dropdownGroups.forEach((el) => {
      closeDropdown(el);
    });
  }
});
