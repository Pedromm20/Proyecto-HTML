document.addEventListener("DOMContentLoaded", () => {
    fetch("nav.html")
      .then((response) => response.text())
      .then((data) => {
        document.body.insertAdjacentHTML("afterbegin", data);
  
        const currentPath = window.location.pathname.split("/").pop(); // 
        const navLinks = document.querySelectorAll("nav a");
  
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
          }
        });
      })
      .catch((error) => console.error("Error al cargar el navbar:", error));
  });
  