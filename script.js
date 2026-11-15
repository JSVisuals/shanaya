// Shanaya's first birthday website — JSVisuals
// The homepage now uses one fixed photograph. Replace the image in style.css.

// Sticky header and active navigation
const header = document.getElementById("siteHeader");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 40));
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Gallery tabs
const tabs = document.querySelectorAll(".gallery-tab");
const panels = {
  photos: document.getElementById("photosPanel"),
  videos: document.getElementById("videosPanel")
};
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", String(selected));
  });
  Object.entries(panels).forEach(([key, panel]) => {
    panel.hidden = key !== tab.dataset.tab;
    panel.classList.toggle("active", key === tab.dataset.tab);
  });
}));

// Photo lightbox with previous/next controls
const photoCards = [...document.querySelectorAll(".photo-card")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
let activePhoto = 0;
function openPhoto(index) {
  activePhoto = (index + photoCards.length) % photoCards.length;
  lightboxImage.src = photoCards[activePhoto].dataset.full;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closePhoto() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
photoCards.forEach((card, index) => card.addEventListener("click", () => openPhoto(index)));
document.getElementById("lightboxClose").addEventListener("click", closePhoto);
document.getElementById("lightboxPrev").addEventListener("click", () => openPhoto(activePhoto - 1));
document.getElementById("lightboxNext").addEventListener("click", () => openPhoto(activePhoto + 1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closePhoto(); });
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closePhoto();
  if (event.key === "ArrowLeft") openPhoto(activePhoto - 1);
  if (event.key === "ArrowRight") openPhoto(activePhoto + 1);
});

// WhatsApp birthday wish + RSVP. Update this number in one place if needed.
const whatsappNumber = "917801049291";
document.getElementById("wishForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const wish = document.getElementById("wishMessage").value.trim();
  const rsvp = document.querySelector('input[name="rsvp"]:checked').value;
  if (!name || !wish) return;
  const message = `Hello! A birthday message for Shanaya 🎀\n\nFrom: ${name}\nMy wish: ${wish}\nRSVP: ${rsvp}\n\nHappy 1st Birthday, Shanaya! 💗`;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
