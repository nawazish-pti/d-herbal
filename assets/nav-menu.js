document.addEventListener("DOMContentLoaded", function () {
  const dropdownGroups = document.querySelectorAll("menu-drop details");

  if (!dropdownGroups.length) return;

  dropdownGroups.forEach((drop) => {
    const summary = drop.querySelector("summary");
    const panel = drop.querySelector(".dropdown-panel");

    // Click toggle
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      toggleDropdown(drop);
    });

    // Hover open (desktop)
    summary.addEventListener("mouseenter", function () {
      if (window.innerWidth > 1024) openDropdown(drop);
    });

    // Close ONLY when leaving the whole dropdown area
    panel.addEventListener("mouseleave", function (e) {
      if (window.innerWidth > 1024) {
        const related = e.relatedTarget;

        // If mouse goes inside dropdown panel → do NOT close
        if (panel && panel.contains(related)) return;

        // If mouse goes inside summary again → do NOT close
        if (summary.contains(related)) return;

        // Otherwise, user left entire mega menu → close
        closeDropdown(drop);
      }
    });
  });

  // Click outside → close all
  document.addEventListener("click", function (e) {
    if (!e.target.closest("menu-drop")) {
      closeAllDropdowns();
    }
  });

  // Helper functions
  function toggleDropdown(target) {
    const isOpen = target.hasAttribute("open");
    closeAllDropdowns();
    if (!isOpen) openDropdown(target);
  }

  function openDropdown(el) {
    el.setAttribute("open", "");
    el.querySelector("summary").classList.add("dropdown-active");
  }

  function closeDropdown(el) {
    el.removeAttribute("open");
    el.querySelector("summary").classList.remove("dropdown-active");
  }

  function closeAllDropdowns() {
    dropdownGroups.forEach((el) => closeDropdown(el));
  }
});
