document.querySelectorAll(".nav-links a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-links a").forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
  });
});

const recordCarousel = document.querySelector("[data-record-carousel]");
if (recordCarousel) {
  const records = [
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#works" },
    { label: "Link", href: "#links" },
  ];
  let currentIndex = 0;
  const leftRecord = recordCarousel.querySelector(".vinyl-left");
  const mainRecord = recordCarousel.querySelector(".vinyl-main");
  const rightRecord = recordCarousel.querySelector(".vinyl-right");
  const prevButton = document.querySelector(".record-prev");
  const playButton = document.querySelector(".record-play");
  const nextButton = document.querySelector(".record-next");

  const mod = (value) => (value + records.length) % records.length;

  const applyRecord = (element, record) => {
    element.href = record.href;
    element.setAttribute("aria-label", record.label);
    element.querySelector(".vinyl-label").textContent = record.label;
  };

  const renderRecords = () => {
    applyRecord(leftRecord, records[mod(currentIndex - 1)]);
    applyRecord(mainRecord, records[currentIndex]);
    applyRecord(rightRecord, records[mod(currentIndex + 1)]);
  };

  const move = (direction) => {
    currentIndex = mod(currentIndex + direction);
    recordCarousel.classList.remove("is-spinning");
    void recordCarousel.offsetWidth;
    recordCarousel.classList.add("is-spinning");
    renderRecords();
  };

  prevButton?.addEventListener("click", () => move(-1));
  playButton?.addEventListener("click", () => move(1));
  nextButton?.addEventListener("click", () => move(1));
  leftRecord?.addEventListener("click", (event) => {
    event.preventDefault();
    move(-1);
  });
  rightRecord?.addEventListener("click", (event) => {
    event.preventDefault();
    move(1);
  });

  renderRecords();
}
