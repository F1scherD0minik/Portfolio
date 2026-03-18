/* ══════════════════════════════════════
   PROJECT DATA
   Füge hier deine Projekte hinzu.
   category: "social" | "highlight" | "editorial"
══════════════════════════════════════ */
const projects = [
  {
    title: "Olympic Gymnastics Edit",
    description: "Short-form social media edit with fast cuts and beat-driven transitions.",
    video: "videos/project1.mp4",
    category: "social"
  },
  {
    title: "Olympic Table Tennis Edit",
    description: "Short-form social media edit with fast cuts and beat-driven transitions.",
    video: "videos/project4.mp4",
    category: "social"
  },
  {
    title: "Olympic Ice Skating Highlights",
    description: "Elegant highlight edit focusing on impact and emotional storytelling.",
    video: "videos/project2.mp4",
    category: "highlight"
  },
  {
    title: "Garcia x Cancelo Highlights",
    description: "Short-form social media edit with fast cuts and beat-driven transitions.",
    video: "videos/project3.mp4",
    category: "highlight"
  }
];

/* ══════════════════════════════════════
   CARD BUILDER
══════════════════════════════════════ */
function buildCard(proj, index) {
  const card = document.createElement("div");
  card.className = "proj-card";
  card.dataset.category = proj.category;
  card.dataset.index = index;

  const tagLabels = { social: "Social Cut", highlight: "Highlight", editorial: "Editorial" };

  card.innerHTML = `
    <div class="proj-thumb">
      <video src="${proj.video}" muted playsinline preload="metadata"></video>
      <div class="proj-play">
        <div class="proj-play-icon">▶</div>
      </div>
    </div>
    <div class="proj-meta">
      <span class="proj-tag">${tagLabels[proj.category] || proj.category}</span>
      <div class="proj-title">${proj.title}</div>
      <p class="proj-desc">${proj.description}</p>
    </div>
  `;

  /* hover: preview video */
  const vid = card.querySelector("video");
  card.addEventListener("mouseenter", () => { vid.play(); });
  card.addEventListener("mouseleave", () => { vid.pause(); vid.currentTime = 0; });

  /* click: open lightbox */
  card.addEventListener("click", () => openLightbox(proj));

  return card;
}

/* ══════════════════════════════════════
   POPULATE GRIDS
══════════════════════════════════════ */
function populateGrids() {
  const grid = document.getElementById("projectsGrid");
  const preview = document.getElementById("homePreview");

  projects.forEach((proj, i) => {
    grid.appendChild(buildCard(proj, i));
    if (i < 3) preview.appendChild(buildCard(proj, i));
  });
}

/* ══════════════════════════════════════
   FILTER
══════════════════════════════════════ */
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll("#projectsGrid .proj-card").forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });
}

/* ══════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════ */
const lightbox  = document.getElementById("lightbox");
const lbVideo   = document.getElementById("lbVideo");
const lbTitle   = document.getElementById("lbTitle");
const lbDesc    = document.getElementById("lbDesc");
const lbTag     = document.getElementById("lbTag");
const lbClose   = document.getElementById("lbClose");
const lbBackdrop = document.getElementById("lbBackdrop");

function openLightbox(proj) {
  lbVideo.src = proj.video;
  lbTitle.textContent = proj.title;
  lbDesc.textContent = proj.description;
  lbTag.textContent = proj.category;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  lbVideo.play();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lbVideo.pause();
  lbVideo.src = "";
  document.body.style.overflow = "";
}

lbClose.addEventListener("click", closeLightbox);
lbBackdrop.addEventListener("click", closeLightbox);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

/* ══════════════════════════════════════
   NAVIGATION (SPA)
══════════════════════════════════════ */
function navigate(pageId) {
  /* hide all pages */
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  /* show target */
  const target = document.getElementById("page-" + pageId);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  /* update nav */
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.dataset.page === pageId);
  });
  /* close mobile menu */
  document.getElementById("mobileMenu").classList.remove("open");
}

function bindNavLinks() {
  document.querySelectorAll("[data-page]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      navigate(el.dataset.page);
    });
  });
}

/* ══════════════════════════════════════
   MOBILE BURGER
══════════════════════════════════════ */
function initBurger() {
  const burger = document.getElementById("burger");
  const menu   = document.getElementById("mobileMenu");
  burger.addEventListener("click", () => menu.classList.toggle("open"));
}


/* ══════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════ */
function initNavScroll() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    nav.style.background = window.scrollY > 40
      ? "rgba(8,8,8,0.97)"
      : "rgba(8,8,8,0.85)";
  }, { passive: true });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  populateGrids();
  initFilters();
  bindNavLinks();
  initBurger();
  initNavScroll();
   /* Bild-Tausch beim Klick */
const imgMain   = document.getElementById("imgMain");
const imgAccent = document.getElementById("imgAccent");
if (imgMain && imgAccent) {
  imgAccent.addEventListener("click", () => {
    const temp = imgMain.src;
    imgMain.src = imgAccent.src;
    imgAccent.src = temp;
   /* z-index auch tauschen */
    const zMain   = imgMain.style.zIndex || 1;
    const zAccent = imgAccent.style.zIndex || 2;
    imgMain.style.zIndex   = zAccent;
    imgAccent.style.zIndex = zMain;
  });
}
});
