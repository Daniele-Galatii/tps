const bikes = [
  {
    id: "ktm",
    name: "KTM SX 125",
    brand: "KTM",
    category: "motard",
    year: 2018,
    cc: 125,
    hp: 38,
    price: 11990,
    img: "assets/ktm.JPG",
    desc: "Motard stradale leggera e cattiva. Agile, pronta e super divertente in città e tra le curve."
  },
  {
    id: "bmw",
    name: "BMW S 1000RR",
    brand: "BMW",
    category: "sportiva",
    year: 2022,
    cc: 999,
    hp: 210,
    price: 17990,
    img: "assets/bmw.JPG",
    desc: "La BMW S 1000 RR è la super sportiva per eccellenza: una fusione di potenza bruta e tecnologia millimetrica."
  },
  {
    id: "panigale",
    name: "Ducati Panigale V4s",
    brand: "Ducati",
    category: "sportiva",
    year: 2022,
    cc: 1103,
    hp: 214,
    price: 29990,
    img: "assets/panigale.JPG",
    desc: "Sportiva pura: ciclistica precisa e motore esplosivo. Perfetta per chi vuole sensazioni da vera pista."
  },
  {
    id: "r1",
    name: "Yamaha YZF-R1",
    brand: "Yamaha",
    category: "sport",
    year: 2020,
    cc: 998,
    hp: 200,
    price: 21990,
    img: "assets/r1.JPG",
    desc: "Superbike iconica: elettronica completa, tanto grip e un 4 cilindri che urla in alto."
  },
  {
    id: "tm",
    name: "TM SMR 125",
    brand: "TM",
    category: "motard",
    year: 2022,
    cc: 125,
    hp: 35,
    price: 9849,
    img: "assets/tm.JPG",
    desc: "Motard 2T reattiva e cattiva. Tanta coppia e leggerezza: ottima per chi ama le curve."
  },
  {
    id: "yz",
    name: "Yamaha YZ 125",
    brand: "Yamaha",
    category: "motard",
    year: 2025,
    cc: 125,
    hp: 33,
    price: 9890,
    img: "assets/yz.JPG",
    desc: "La YZ 125 è l'icona dei due tempi, celebre per la sua estrema maneggevolezza e un rapporto peso-potenza che la rende ottima in qualsiasi situazione."
  },

  {
  id: "streetfighter",
  name: "Ducati Streetfighter V4",
  brand: "Ducati",
  category: "sportiva",
  year: 2022,
  cc: 1103,
  hp: 208,
  price: 23990,
  img: "assets/streetfighter.JPG",
  desc: "Naked estrema derivata dalla Panigale, con motore potente, elettronica avanzata e carattere aggressivo."
},
{
  id: "mt09",
  name: "Yamaha MT-09",
  brand: "Yamaha",
  category: "naked",
  year: 2021,
  cc: 890,
  hp: 119,
  price: 9490,
  img: "assets/mt09.JPG",
  desc: "Naked leggera e divertente, con motore tre cilindri pieno di coppia e guida molto reattiva."
},
{
  id: "husky450",
  name: "Husqvarna FS 450",
  brand: "Husqvarna",
  category: "motard",
  year: 2023,
  cc: 450,
  hp: 63,
  price: 11990,
  img: "assets/husky450.JPG",
  desc: "Motard racing molto leggera, pensata per la pista e per chi cerca massima agilità e prestazioni."
},
{
  id: "ktm1290",
  name: "KTM 1290 Super Duke R",
  brand: "KTM",
  category: "naked",
  year: 2022,
  cc: 1301,
  hp: 180,
  price: 18990,
  img: "assets/1290.JPG",
  desc: "Maxi naked potentissima, con tanta coppia, elettronica completa e una guida aggressiva."
},
{
  id: "zx636",
  name: "Kawasaki Ninja ZX-6R 636",
  brand: "Kawasaki",
  category: "sportiva",
  year: 2020,
  cc: 636,
  hp: 130,
  price: 11490,
  img: "assets/636.JPG",
  desc: "Sportiva media molto precisa, apprezzata per il motore brillante e la ciclistica efficace."
},
{
  id: "hypermotard",
  name: "Ducati Hypermotard 950",
  brand: "Ducati",
  category: "motard",
  year: 2021,
  cc: 937,
  hp: 114,
  price: 13990,
  img: "assets/hypermotard.JPG",
  desc: "Moto alta, aggressiva e divertente, a metà tra motard e naked sportiva, perfetta per guidare forte tra le curve."
}
];

const FAVORITES_KEY = "showroomMotoFavorites";
const THEME_KEY = "showroomMotoTheme";

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function formatPrice(value) {
  return value.toLocaleString("it-IT") + " €";
}

function getFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function updateFavoriteBadge() {
  const badge = qs("#favCount");
  if (badge) {
    badge.textContent = getFavorites().length;
  }
}

function showToast(message) {
  const toast = qs("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_KEY, next);
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  document.documentElement.setAttribute("data-theme", saved);
}

function initTheme() {
  loadTheme();
  const btn = qs("#themeBtn");
  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }
}

function initMenu() {
  const toggle = qs("#menuToggle");
  const nav = qs("#navLinks");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function createBikeCard(bike, isFavoritesPage = false) {
  const card = document.createElement("article");
  card.className = "bike-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "bike-image";

  const badge = document.createElement("span");
  badge.className = "bike-badge";
  badge.textContent = bike.category.toUpperCase();

  const img = document.createElement("img");
  img.src = bike.img;
  img.alt = bike.name;

  imageWrap.appendChild(img);
  imageWrap.appendChild(badge);

  const content = document.createElement("div");
  content.className = "bike-content";

  const head = document.createElement("div");
  head.className = "bike-head";

  const left = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "bike-title";
  title.textContent = bike.name;

  const brand = document.createElement("p");
  brand.className = "bike-brand";
  brand.textContent = `${bike.brand} · ${bike.category} · ${bike.year}`;

  left.appendChild(title);
  left.appendChild(brand);

  const price = document.createElement("div");
  price.className = "bike-price";
  price.textContent = formatPrice(bike.price);

  head.appendChild(left);
  head.appendChild(price);

  const specs = document.createElement("div");
  specs.className = "bike-specs";

  const cc = document.createElement("span");
  cc.className = "spec-pill";
  cc.textContent = `${bike.cc} cc`;

  const hp = document.createElement("span");
  hp.className = "spec-pill";
  hp.textContent = `${bike.hp} hp`;

  const year = document.createElement("span");
  year.className = "spec-pill";
  year.textContent = `${bike.year}`;

  specs.appendChild(cc);
  specs.appendChild(hp);
  specs.appendChild(year);

  const actions = document.createElement("div");
  actions.className = "bike-actions";

  const detailBtn = document.createElement("button");
  detailBtn.className = "btn btn-secondary";
  detailBtn.type = "button";
  detailBtn.textContent = "Dettagli";
  detailBtn.addEventListener("click", () => openModal(bike));

  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "btn btn-primary";
  favoriteBtn.type = "button";
  favoriteBtn.textContent = isFavoritesPage ? "Rimuovi" : (isFavorite(bike.id) ? "Salvata" : "Aggiungi");

  favoriteBtn.addEventListener("click", () => {
    if (isFavoritesPage) {
      removeFavorite(bike.id);
      renderFavorites();
      showToast("Moto rimossa dai preferiti");
    } else {
      handleFavoriteToggle(bike.id);
      renderCatalog();
    }
  });

  actions.appendChild(detailBtn);
  actions.appendChild(favoriteBtn);

  content.appendChild(head);
  content.appendChild(specs);
  content.appendChild(actions);

  card.appendChild(imageWrap);
  card.appendChild(content);

  return card;
}

function handleFavoriteToggle(id) {
  const favorites = getFavorites();

  if (favorites.includes(id)) {
    const updated = favorites.filter(favId => favId !== id);
    saveFavorites(updated);
    showToast("Moto rimossa dai preferiti");
  } else {
    favorites.push(id);
    saveFavorites(favorites);
    showToast("Moto aggiunta ai preferiti");
  }

  updateFavoriteBadge();
}

function removeFavorite(id) {
  const updated = getFavorites().filter(favId => favId !== id);
  saveFavorites(updated);
  updateFavoriteBadge();
}

let currentVisible = 100;

function getFilteredBikes() {
  const searchValue = qs("#searchInput") ? qs("#searchInput").value.trim().toLowerCase() : "";
  const categoryValue = qs("#categoryFilter") ? qs("#categoryFilter").value : "all";
  const sortValue = qs("#sortSelect") ? qs("#sortSelect").value : "default";

  let filtered = [...bikes];

  if (searchValue) {
    filtered = filtered.filter(bike =>
      bike.name.toLowerCase().includes(searchValue) ||
      bike.brand.toLowerCase().includes(searchValue) ||
      bike.category.toLowerCase().includes(searchValue)
    );
  }

  if (categoryValue !== "all") {
    filtered = filtered.filter(bike => bike.category === categoryValue);
  }

  if (sortValue === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortValue === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === "year-desc") {
    filtered.sort((a, b) => b.year - a.year);
  }

  return filtered;
}

function renderCatalog() {
  const grid = qs("#catalogGrid");
  const resultsInfo = qs("#resultsInfo");
  const loadMoreBtn = qs("#loadMoreBtn");

  if (!grid) return;

  const filtered = getFilteredBikes();
  const visible = filtered.slice(0, currentVisible);

  grid.innerHTML = "";
  visible.forEach(bike => {
    grid.appendChild(createBikeCard(bike));
  });

  if (resultsInfo) {
    resultsInfo.textContent = `${filtered.length} risultati (mostrati ${visible.length})`;
  }

  if (loadMoreBtn) {
    loadMoreBtn.disabled = visible.length >= filtered.length;
    loadMoreBtn.style.opacity = visible.length >= filtered.length ? "0.5" : "1";
  }
}

function renderFavorites() {
  const grid = qs("#favoritesGrid");
  const info = qs("#favoritesInfo");
  const emptyState = qs("#emptyState");

  if (!grid) return;

  const favorites = getFavorites();
  const favoriteBikes = bikes.filter(bike => favorites.includes(bike.id));

  grid.innerHTML = "";

  if (favoriteBikes.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    favoriteBikes.forEach(bike => {
      grid.appendChild(createBikeCard(bike, true));
    });
  }

  if (info) {
    info.textContent = `${favoriteBikes.length} preferiti`;
  }
}

function openModal(bike) {
  const modal = qs("#bikeModal");
  const backdrop = qs("#modalBackdrop");
  const body = qs("#modalBody");

  if (!modal || !backdrop || !body) return;

  body.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "modal-grid";

  const img = document.createElement("img");
  img.src = bike.img;
  img.alt = bike.name;

  const info = document.createElement("div");
  info.className = "modal-info";

  const title = document.createElement("h2");
  title.id = "modalTitle";
  title.textContent = bike.name;

  const desc = document.createElement("p");
  desc.textContent = bike.desc;

  const specs = document.createElement("div");
  specs.className = "modal-specs";

  const values = [
    { label: "Marca", value: bike.brand },
    { label: "Categoria", value: bike.category },
    { label: "Anno", value: bike.year },
    { label: "Cilindrata", value: `${bike.cc} cc` },
    { label: "Potenza", value: `${bike.hp} hp` },
    { label: "Prezzo", value: formatPrice(bike.price) }
  ];

  values.forEach(item => {
    const box = document.createElement("div");
    box.className = "modal-spec";

    const strong = document.createElement("strong");
    strong.textContent = item.label;

    const text = document.createElement("span");
    text.textContent = item.value;

    box.appendChild(strong);
    box.appendChild(text);
    specs.appendChild(box);
  });

  const modalFavBtn = document.createElement("button");
  modalFavBtn.className = "btn btn-primary";
  modalFavBtn.type = "button";
  modalFavBtn.textContent = isFavorite(bike.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";

  modalFavBtn.addEventListener("click", () => {
    handleFavoriteToggle(bike.id);
    modalFavBtn.textContent = isFavorite(bike.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";
    renderCatalog();
    renderFavorites();
  });

  info.appendChild(title);
  info.appendChild(desc);
  info.appendChild(specs);
  info.appendChild(modalFavBtn);

  grid.appendChild(img);
  grid.appendChild(info);
  body.appendChild(grid);

  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = qs("#bikeModal");
  const backdrop = qs("#modalBackdrop");

  if (modal) modal.classList.add("hidden");
  if (backdrop) backdrop.classList.add("hidden");
  document.body.style.overflow = "";
}

function initModal() {
  const backdrop = qs("#modalBackdrop");
  const closeBtn = qs("#closeModalBtn");

  if (backdrop) {
    backdrop.addEventListener("click", closeModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

function initCatalogEvents() {
  const searchInput = qs("#searchInput");
  const categoryFilter = qs("#categoryFilter");
  const sortSelect = qs("#sortSelect");
  const resetBtn = qs("#resetBtn");
  const loadMoreBtn = qs("#loadMoreBtn");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentVisible = 6;
      renderCatalog();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      currentVisible = 6;
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentVisible = 6;
      renderCatalog();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "all";
      if (sortSelect) sortSelect.value = "default";
      currentVisible = 6;
      renderCatalog();
      showToast("Filtri resettati");
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentVisible += 3;
      renderCatalog();
    });
  }
}

function initForm() {
  const form = qs("#testRideForm");
  if (!form) return;

  const modelInput = qs("#modelInput");
  bikes.forEach(bike => {
    const option = document.createElement("option");
    option.value = bike.id;
    option.textContent = bike.name;
    modelInput.appendChild(option);
  });

  const nameInput = qs("#nameInput");
  const emailInput = qs("#emailInput");
  const dateInput = qs("#dateInput");

  const nameError = qs("#nameError");
  const emailError = qs("#emailError");
  const dateError = qs("#dateError");
  const modelError = qs("#modelError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    dateError.textContent = "";
    modelError.textContent = "";

    let isValid = true;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      nameError.textContent = "Inserisci un nome valido.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Inserisci una email valida.";
      isValid = false;
    }

    if (!dateInput.value) {
      dateError.textContent = "Seleziona una data.";
      isValid = false;
    }

    if (!modelInput.value) {
      modelError.textContent = "Seleziona una moto.";
      isValid = false;
    }

    if (!isValid) return;

    showToast("Richiesta inviata con successo");
    form.reset();
  });
}

function initFavoritesPage() {
  const clearBtn = qs("#clearFavoritesBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      saveFavorites([]);
      updateFavoriteBadge();
      renderFavorites();
      showToast("Preferiti svuotati");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMenu();
  initModal();
  updateFavoriteBadge();

  const page = document.documentElement.dataset.page;

  if (page === "catalogo") {
    initCatalogEvents();
    initForm();
    renderCatalog();
  }

  if (page === "preferiti") {
    initFavoritesPage();
    renderFavorites();
  }
});
