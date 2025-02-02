const menuButton = document.querySelector("#menuBtn");
const navLinks = document.querySelector("nav");

function toggleMenu() {
  navLinks.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

// Make sure menu visibility adjusts on window resize
function handleResize() {
  if (window.innerWidth > 1000) {
    navLinks.classList.remove("hide");
  }
}

window.addEventListener("resize", handleResize);
handleResize();

function viewerTemplate(src, alt) {
  return `
    <div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${src}" alt="${alt}">
    </div>`;
}

function viewHandler(event) {
  if (event.target.tagName === "IMG") {
    const imgSrc = event.target.src.replace("-sm", "-full");
    const imgAlt = event.target.alt;
    document.body.insertAdjacentHTML("afterbegin", viewerTemplate(imgSrc, imgAlt));
    document.querySelector(".close-viewer").addEventListener("click", closeViewer);
  }
}

function closeViewer() {
  document.querySelector(".viewer").remove();
}

document.querySelector(".gallery").addEventListener("click", viewHandler);
