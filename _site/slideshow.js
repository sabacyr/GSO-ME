document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slideshow .slide");
  let index = 0;

  const autoInterval = 5000;   // time between slides (ms)
  const fadeDelay = 150;       // modal fade timing tweak

  let interval = setInterval(autoSlide, autoInterval);

  /* ---------------------------
     MAIN SLIDESHOW
  ----------------------------*/

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
  }

  function autoSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  /* ---------------------------
     LIGHTBOX (FULLSCREEN)
  ----------------------------*/

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  lightbox.innerHTML = `
    <button class="close">&times;</button>
    <button class="prev">&#10094;</button>
    <div class="image-wrapper">
      <img class="active">
    </div>
    <button class="next">&#10095;</button>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close");
  const nextBtn = lightbox.querySelector(".next");
  const prevBtn = lightbox.querySelector(".prev");

  function openLightbox(i) {
    clearInterval(interval);
    index = i;
    lightbox.classList.add("open");
    updateLightbox(true);
  }

  function updateLightbox(initial = false) {
    lightboxImg.classList.remove("active");

    setTimeout(() => {
      lightboxImg.src = slides[index].src;
      lightboxImg.classList.add("active");
    }, initial ? 0 : fadeDelay);
  }

  function nextImage() {
    index = (index + 1) % slides.length;
    updateLightbox();
  }

  function prevImage() {
    index = (index - 1 + slides.length) % slides.length;
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    interval = setInterval(autoSlide, autoInterval);
  }

  /* ---------------------------
     EVENTS
  ----------------------------*/

  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => openLightbox(i));
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  });

});