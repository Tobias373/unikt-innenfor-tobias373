document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  // Få den nåværende URL-pathen
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    // Normaliser filbanen ved å fjerne './' i href
    const linkPath = new URL(link.getAttribute("href"), window.location.origin).pathname;

    // Sjekk om href matcher nåværende URL-path
    if (linkPath === currentPath) {
      link.classList.add("active");
    }

    // Legg til klikk-event for dynamisk endring
    link.addEventListener("click", () => {
      navLinks.forEach(nav => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

