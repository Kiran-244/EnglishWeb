const split = document.querySelector(".split");
const left = document.querySelector(".split-left");
const right = document.querySelector(".split-right");
const divider = document.querySelector(".split-divider");
const cursor = document.querySelector(".cursor");

let isDragging = false;
let targetPercent = 50;
let currentPercent = 50;

/* Start drag */
divider.addEventListener("mousedown", () => {
  isDragging = true;
  document.body.style.userSelect = "none";
});

/* End drag */
window.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});

/* Track mouse */
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = split.getBoundingClientRect();
  let percent = ((e.clientX - rect.left) / rect.width) * 100;

  /* Clamp */
  percent = Math.max(25, Math.min(75, percent));
  targetPercent = percent;
});

/* Elastic animation */
function animateSplit() {
  currentPercent += (targetPercent - currentPercent) * 0.08;

  left.style.width = `${currentPercent}%`;
  right.style.width = `${100 - currentPercent}%`;

  requestAnimationFrame(animateSplit);
}

animateSplit();

/* =========================
   CURSOR (DESKTOP + MOBILE)
   ========================= */

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  mouseX = t.clientX;
  mouseY = t.clientY;
  cursor.style.opacity = "1";
});

document.addEventListener("touchmove", (e) => {
  const t = e.touches[0];
  mouseX = t.clientX;
  mouseY = t.clientY;
});

document.addEventListener("touchend", () => {
  cursor.style.opacity = "0";
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.08;
  cursorY += (mouseY - cursorY) * 0.08;

  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

  requestAnimationFrame(animateCursor);
}

animateCursor();
/* =========================
   SCROLL REVEAL OBSERVER
   ========================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // animate once only
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => observer.observe(el));
