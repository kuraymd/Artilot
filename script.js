const cards = Array.from(document.querySelectorAll(".track-card"));
const nav = document.querySelector("#site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const dots = Array.from(document.querySelectorAll(".mini-list a"));
const controls = document.querySelector(".player-controls");

let currentIndex = 0;

function clampIndex(index) {
  return Math.max(0, Math.min(cards.length - 1, index));
}

function wrapIndex(index) {
  if (!cards.length) return 0;
  return (index + cards.length) % cards.length;
}

function setCurrent(index) {
  currentIndex = clampIndex(index);
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentIndex);
  });
}

function scrollToCard(index) {
  const target = cards[wrapIndex(index)];
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openCurrentAction() {
  const card = cards[currentIndex];
  const action = card?.dataset.action;
  if (!action) return;

  if (action.startsWith("#")) {
    document.querySelector(action)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  window.open(action, "_blank", "noopener,noreferrer");
}

function setupMenu() {
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupControls() {
  if (!controls) return;

  controls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-control]");
    if (!(button instanceof HTMLButtonElement)) return;

    const control = button.dataset.control;
    if (control === "prev") scrollToCard(currentIndex - 1);
    if (control === "next") scrollToCard(currentIndex + 1);
    if (control === "play") openCurrentAction();
  });
}

function setupCurrentCardObserver() {
  if (!("IntersectionObserver" in window)) {
    setCurrent(0);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      setCurrent(cards.indexOf(visible.target));
    },
    {
      threshold: [0.48, 0.68, 0.88],
    }
  );

  cards.forEach((card) => observer.observe(card));
}

setupMenu();
setupControls();
setupCurrentCardObserver();
setCurrent(0);
