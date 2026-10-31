/* =========================================================
   PORTFOLIO DATA — the only part you need to edit.
   Drop photos into images/<folder>/ named 01.jpg, 02.jpg, ...
   then set `count` to the number of photos.
   To add a third property later, copy one block below.
   ========================================================= */
const PROPERTIES = [
  {
    title: "10 Pebble Beach",
    location: "Novato, California",
    folder: "property-1",
    count: 38
  },
  {
    title: "Property Two",
    location: "Marin County, California",
    folder: "property-2",
    count: 0   // set to the photo count once photos are added
  }
];

const pad = n => String(n).padStart(2, "0");
const srcFor = (p, i) => `images/${p.folder}/${pad(i + 1)}.jpg`;
const thumbFor = (p, i) => `images/${p.folder}/thumbs/${pad(i + 1)}.jpg`;
const SHOWN = 9; // tiles shown per property; the rest open in the lightbox

const wrap = document.getElementById("properties");
PROPERTIES.forEach((p, pi) => {
  if (!p.count) return;
  const el = document.createElement("article");
  el.className = "property reveal";
  const tiles = [];
  for (let i = 0; i < Math.min(p.count, SHOWN); i++) {
    const extra = i === SHOWN - 1 && p.count > SHOWN
      ? `<span class="more">+${p.count - SHOWN + 1} photos</span>` : "";
    tiles.push(
      `<button data-p="${pi}" data-i="${i}" aria-label="Open photo ${i + 1} of ${p.title}">
         <div class="ph" style="--img:url('${thumbFor(p, i)}')"></div>${extra}
       </button>`
    );
  }
  el.innerHTML = `
    <div class="property-meta">
      <h3>${p.title}</h3>
      <p>${p.location} · ${p.count} photographs</p>
    </div>
    <div class="mosaic">${tiles.join("")}</div>`;
  wrap.appendChild(el);
});

/* ---------- Lightbox ---------- */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-cap");
let cur = { p: 0, i: 0 };

function show() {
  const p = PROPERTIES[cur.p];
  lbImg.src = srcFor(p, cur.i);
  lbImg.alt = `${p.title}, photo ${cur.i + 1}`;
  lbCap.textContent = `${p.title} — ${cur.i + 1} / ${p.count}`;
}
function open(p, i) {
  cur = { p, i };
  show();
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function close() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function step(d) {
  const n = PROPERTIES[cur.p].count;
  cur.i = (cur.i + d + n) % n;
  show();
}

wrap.addEventListener("click", e => {
  const b = e.target.closest("button[data-p]");
  if (b) open(+b.dataset.p, +b.dataset.i);
});
lb.querySelector(".lb-close").onclick = close;
lb.querySelector(".lb-prev").onclick = () => step(-1);
lb.querySelector(".lb-next").onclick = () => step(1);
lb.addEventListener("click", e => { if (e.target === lb) close(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
let touchX = null;
lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  touchX = null;
});

/* ---------- Scroll reveal + footer year ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal, .section-head, .about-copy, .service-grid article")
  .forEach(el => { el.classList.add("reveal"); io.observe(el); });
document.getElementById("yr").textContent = new Date().getFullYear();
