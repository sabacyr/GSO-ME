document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-right a").forEach(link => {
    const linkHref = link.getAttribute("href");

    if (!linkHref) return;

    const linkPage = linkHref.replace(".qmd", ".html");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
