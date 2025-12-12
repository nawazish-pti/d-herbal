document.addEventListener("DOMContentLoaded", function () {
  const dropdownGroups = document.querySelectorAll("menu-drop details");

  dropdownGroups.forEach((drop) => {
    const summary = drop.querySelector("summary");
    const panel = drop.querySelector(".dropdown-panel");

    // CLICK toggle handling
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      toggle(drop);
    });

    // Hover open (desktop only)
    summary.addEventListener("mouseenter", function () {
      console.log('summry')
      if (window.innerWidth > 1024) open(drop);
    });

    // also open if user hovers panel directly
    panel.addEventListener("mouseenter", function () {
      if (window.innerWidth > 1024) open(drop);
    });

    // CLOSE when mouse completely leaves both summary AND panel
    drop.addEventListener("mouseleave", function () {
      if (window.innerWidth <= 1024) return;

      setTimeout(() => {
        // Check if dropdown OR panel OR summary are still hovered
        if (!drop.matches(":hover")) {
          close(drop);
        }
      },1000);
    });
  });

  // CLICK OUTSIDE closes all
  document.addEventListener("click", function (e) {
    if (!e.target.closest("menu-drop")) closeAll();
  });

  // FUNCTIONS
  function toggle(drop) {
    const openNow = drop.hasAttribute("open");
    closeAll();
    if (!openNow) open(drop);
  }

  function open(drop) {
    drop.setAttribute("open", "");
    drop.querySelector("summary").classList.add("dropdown-active");
  }

  function close(drop) {
    drop.removeAttribute("open");
    drop.querySelector("summary").classList.remove("dropdown-active");
  }

  function closeAll() {
    dropdownGroups.forEach((d) => close(d));
  }
});
