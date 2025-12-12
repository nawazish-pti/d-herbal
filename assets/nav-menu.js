document.addEventListener("DOMContentLoaded", function () {
  const dropdownGroups = document.querySelectorAll("menu-drop details");
  const header = document.querySelector(".section-header");

  dropdownGroups.forEach((drop) => {
    const summary = drop.querySelector("summary");
    const panel = drop.querySelector(".dropdown-panel");

    // CLICK toggle
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      toggle(drop, summary);
    });

    // HOVER open (desktop)
    summary.addEventListener("mouseenter", function () {
      if (window.innerWidth > 1024) open(drop, summary);
    });

    // Keep open when moving inside panel
    panel.addEventListener("mouseenter", function () {
      if (window.innerWidth > 1024) open(drop, summary);
    });

    // Close ONLY when leaving whole mega area (panel + summary)
    drop.addEventListener("mouseleave", function (e) {
      if (window.innerWidth > 1024) {
        const to = e.relatedTarget;

        if (panel.contains(to)) return;  // still inside panel
        if (summary.contains(to)) return; // still inside summary

        close(drop, summary);
      }
    });
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest("menu-drop")) closeAll();
  });

  // ========= FUNCTIONS ========== //

  function toggle(drop, summary) {
    const isOpen = drop.hasAttribute("open");
    closeAll();
    if (!isOpen) open(drop, summary);
  }

  function open(drop, summary) {
    // Set CSS variable for menu top position (Dawn behavior)
    let headerBottom = header.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty(
      "--header-bottom-position",
      `${headerBottom}px`
    );

    drop.setAttribute("open", "");
    summary.setAttribute("aria-expanded", "true");
    summary.classList.add("dropdown-active");

    header.classList.add("menu-open");
  }

  function close(drop, summary) {
    drop.removeAttribute("open");
    summary.classList.remove("dropdown-active");
    summary.setAttribute("aria-expanded", "false");

    header.classList.remove("menu-open");
  }

  function closeAll() {
    dropdownGroups.forEach((drop) => {
      const summary = drop.querySelector("summary");
      close(drop, summary);
    });
  }
});
