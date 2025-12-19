// ============================
// Config WhatsApp
// ============================
const WA_NUMBER = "542804676224"; 

function buildWaLink(name, price) {
  const text = `Hola, estoy interesado en el perfume ${name} que cuesta ${price}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ============================
// Datos de ejemplo (EDITÁ ACÁ)
// ============================
const featuredPerfumes = [
  {
    name: "Pacific Aura",
    desc: "Fresco, acuático y relajante, ideal para el verano y climas cálidos.",
    price: "$69.500",
    image: "./images/pacific-aura.PNG"
  },
  {
    name: "Hawas Ice ",
    desc: "Ultra fresco y vibrante, perfecto para el verano y el uso diario.",
    price: "$80.000",
    image: "./images/hawas-ice.PNG"
  },
  {
    name: "Club De Nuit Iconic",
    desc: "Fresco y potente, ideal para días de calor con buena presencia.",
    price: "$72.250",
    image: "./images/iconic.png"
  },
];

const allPerfumes = [
  ...featuredPerfumes,
  {
    name: "Club De Nuit Urban Man Elixir",
    desc: "Elegante y intenso, con carácter moderno y gran duración.",
    price: "$61.500",
    image: "./images/urban-man-elixir.PNG"
  },
]

// ============================
// Render de cards
// ============================
function perfumeCardHTML(p) {
  const wa = buildWaLink(p.name, p.price);
  return `
    <article class="card">
      <img class="card__img" src="${p.image}" alt="${p.name}" loading="lazy" />
      <div class="card__body">
        <h3 class="card__title">${p.name}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__row">
          <span class="card__price">${p.price}</span>
          <button class="card__btn" data-wa="${wa}">Comprar</button>
        </div>
      </div>
    </article>
  `;
}

// ============================
// Carousel
// ============================
let currentIndex = 0;

function renderCarousel() {
  const track = document.getElementById("carouselTrack");
  const dots = document.getElementById("carouselDots");
  track.innerHTML = "";
  dots.innerHTML = "";

  featuredPerfumes.forEach((p, idx) => {
    const slide = document.createElement("div");
    slide.className = "carousel__slide";
    slide.innerHTML = perfumeCardHTML(p);
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "dot" + (idx === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Ir al producto ${idx + 1}`);
    dot.addEventListener("click", () => goTo(idx));
    dots.appendChild(dot);
  });

  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById("carouselTrack");
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  const dots = Array.from(document.querySelectorAll(".dot"));
  dots.forEach((d, i) => d.classList.toggle("is-active", i === currentIndex));
}

function goTo(index) {
  currentIndex = (index + featuredPerfumes.length) % featuredPerfumes.length;
  updateCarousel();
}

function next() { goTo(currentIndex + 1); }
function prev() { goTo(currentIndex - 1); }

// ============================
// Grid
// ============================
function renderGrid() {
  const grid = document.getElementById("allPerfumesGrid");
  grid.innerHTML = allPerfumes.map(perfumeCardHTML).join("");
}

// ============================
// Delegación de clicks "Comprar"
// ============================
function setupBuyButtons() {
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-wa]");
    if (!btn) return;
    const url = btn.getAttribute("data-wa");
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

// ============================
// Logo central -> Home
// ============================
function setupLogoHome() {
  const logoBtn = document.getElementById("logoHomeBtn");
  logoBtn.addEventListener("click", () => {
    // vuelve al home (top). Si preferís recargar: location.href = "index.html";
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  });
}

// ============================
// Init
// ============================
document.getElementById("year").textContent = new Date().getFullYear();

renderCarousel();
renderGrid();
setupBuyButtons();
setupLogoHome();

document.getElementById("nextBtn").addEventListener("click", next);
document.getElementById("prevBtn").addEventListener("click", prev);

// Swipe en mobile (opcional simple)
let startX = 0;
const viewport = document.getElementById("carouselViewport");
viewport.addEventListener("touchstart", (e) => startX = e.touches[0].clientX, { passive: true });
viewport.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if (Math.abs(diff) > 35) diff < 0 ? next() : prev();
}, { passive: true });
