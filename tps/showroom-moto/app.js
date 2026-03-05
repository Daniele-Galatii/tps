(() => {
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
      name: "BMW R 1250 GS",
      brand: "BMW",
      category: "touring",
      year: 2021,
      cc: 1254,
      hp: 136,
      price: 17990,
      img: "assets/bmw.JPG",
      desc: "La classica adventure per viaggiare ovunque. Comoda, coppiosa e stabile anche a pieno carico."
    },
    {
      id: "panigale",
      name: "Ducati Panigale V2",
      brand: "Ducati",
      category: "sport",
      year: 2022,
      cc: 955,
      hp: 155,
      price: 19990,
      img: "assets/panigale.JPG",
      desc: "Sportiva pura: ciclistica precisa e motore esplosivo. Perfetta per chi vuole sensazioni da pista."
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
      name: "TM EN 300 2T",
      brand: "TM",
      category: "offroad",
      year: 2021,
      cc: 300,
      hp: 52,
      price: 12490,
      img: "assets/tm.JPG",
      desc: "Enduro 2T reattiva e cattiva. Tanta coppia e leggerezza: fatta per i boschi e il tecnico."
    },
    {
      id: "yz",
      name: "Yamaha YZ 250F",
      brand: "Yamaha",
      category: "offroad",
      year: 2019,
      cc: 250,
      hp: 41,
      price: 8490,
      img: "assets/yz.JPG",
      desc: "Motocross 4T equilibrata e affidabile. Perfetta per allenarsi e girare in pista."
    }
  ];

  const LS_FAV = "sm_favorites_v1";
  const LS_THEME = "sm_theme_v1";
  const LS_FORM = "sm_testRide_v1";

  function qs(sel, root = document) { return root.querySelector(sel); }
  function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  function euro(n) {
    const s = Number(n).toLocaleString("it-IT");
    return s + " €";
  }

  function getFavIds() {
    try {
      const raw = localStorage.getItem(LS_FAV);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function setFavIds(ids) {
    localStorage.setItem(LS_FAV, JSON.stringify(ids));
    updateFavBadge();
  }

  function isFav(id) {
    return getFavIds().includes(id);
  }

  function toggleFav(id) {
    const ids = getFavIds();
    const i = ids.indexOf(id);
    if (i >= 0) ids.splice(i, 1);
    else ids.push(id);
    setFavIds(ids);
    return ids.includes(id);
  }

  function updateFavBadge() {
    const badge = qs("#favBadge");
    if (!badge) return;
    badge.textContent = String(getFavIds().length);
  }

  function showToast(msg) {
    const t = qs("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    window.clearTimeout(showToast._tm);
    showToast._tm = window.setTimeout(() => t.classList.remove("show"), 1400);
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === "light") html.setAttribute("data-theme", "light");
    else html.setAttribute("data-theme", "dark");
    localStorage.setItem(LS_THEME, theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(LS_THEME);
    applyTheme(saved === "light" ? "light" : "dark");
    const btn = qs("#themeBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme");
        applyTheme(cur === "light" ? "dark" : "light");
        showToast(cur === "light" ? "Tema scuro attivo" : "Tema chiaro attivo");
      });
    }
  }

  function initNav() {
    const toggle = qs(".nav-toggle");
    const links = qs(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // chiudi menu se clicchi un link
    qsa(".nav-link", links).forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // chiudi menu con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // HOME preview
  function initHome() {
    const wrap = qs("#homePreview");
    if (!wrap) return;

    const sample = bikes.slice(0, 2);
    wrap.innerHTML = ""; // qui è safe perché non arriva input utente
    sample.forEach(b => {
      const el = document.createElement("div");
      el.className = "card";
      el.style.overflow = "hidden";

      const media = document.createElement("div");
      media.className = "card-media";
      const img = document.createElement("img");
      img.src = b.img;
      img.alt = "Foto " + b.name;
      media.appendChild(img);

      const body = document.createElement("div");
      body.className = "card-body";

      const title = document.createElement("p");
      title.className = "card-title";
      title.textContent = b.name;

      const meta = document.createElement("p");
      meta.className = "card-meta";
      meta.textContent = b.brand + " • " + b.year;

      body.appendChild(title);
      body.appendChild(meta);

      el.appendChild(media);
      el.appendChild(body);

      wrap.appendChild(el);
    });
  }

  // CATALOGO
  function createCard(b) {
    const card = document.createElement("article");
    card.className = "card";

    const media = document.createElement("div");
    media.className = "card-media";
    const img = document.createElement("img");
    img.src = b.img;
    img.alt = "Foto " + b.name;
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "card-body";

    const top = document.createElement("div");
    top.className = "card-top";

    const left = document.createElement("div");

    const h = document.createElement("h3");
    h.className = "card-title";
    h.textContent = b.name;

    const meta = document.createElement("p");
    meta.className = "card-meta";
    meta.textContent = b.brand + " • " + b.category.toUpperCase() + " • " + b.year;

    left.appendChild(h);
    left.appendChild(meta);

    const right = document.createElement("div");
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = euro(b.price);
    right.appendChild(price);

    top.appendChild(left);
    top.appendChild(right);

    const pillRow = document.createElement("div");
    pillRow.style.marginTop = "10px";
    pillRow.style.display = "flex";
    pillRow.style.gap = "8px";
    pillRow.style.flexWrap = "wrap";

    const p1 = document.createElement("span");
    p1.className = "pill";
    p1.textContent = b.cc + " cc";

    const p2 = document.createElement("span");
    p2.className = "pill";
    p2.textContent = b.hp + " hp";

    pillRow.appendChild(p1);
    pillRow.appendChild(p2);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn";
    detailsBtn.type = "button";
    detailsBtn.textContent = "Dettagli";
    detailsBtn.addEventListener("click", () => openModal(b.id));

    const favBtn = document.createElement("button");
    favBtn.className = "btn primary";
    favBtn.type = "button";
    favBtn.textContent = isFav(b.id) ? "Nei preferiti" : "Aggiungi";
    favBtn.addEventListener("click", () => {
      const nowFav = toggleFav(b.id);
      favBtn.textContent = nowFav ? "Nei preferiti" : "Aggiungi";
      showToast(nowFav ? "Aggiunto ai preferiti" : "Rimosso dai preferiti");
    });

    actions.appendChild(detailsBtn);
    actions.appendChild(favBtn);

    body.appendChild(top);
    body.appendChild(pillRow);
    body.appendChild(actions);

    card.appendChild(media);
    card.appendChild(body);

    return card;
  }

  function sortBikes(list, sort) {
    const arr = list.slice();
    const byName = (a, b) => a.name.localeCompare(b.name, "it");
    const byPrice = (a, b) => a.price - b.price;
    const byYear = (a, b) => a.year - b.year;

    switch (sort) {
      case "name-desc": arr.sort((a, b) => -byName(a, b)); break;
      case "price-asc": arr.sort(byPrice); break;
      case "price-desc": arr.sort((a, b) => -byPrice(a, b)); break;
      case "year-asc": arr.sort(byYear); break;
      case "year-desc": arr.sort((a, b) => -byYear(a, b)); break;
      default: arr.sort(byName);
    }
    return arr;
  }

  function filterBikes() {
    const search = qs("#search")?.value.trim().toLowerCase() || "";
    const cat = qs("#category")?.value || "all";
    const sort = qs("#sort")?.value || "name-asc";

    let list = bikes.slice();

    if (cat !== "all") list = list.filter(b => b.category === cat);

    if (search) {
      list = list.filter(b => {
        const hay = (b.name + " " + b.brand + " " + b.category).toLowerCase();
        return hay.includes(search);
      });
    }

    list = sortBikes(list, sort);
    return list;
  }

  let visibleCount = 6;

  function renderCatalog() {
    const grid = qs("#cardsGrid");
    const info = qs("#resultsInfo");
    const loadMore = qs("#loadMoreBtn");
    if (!grid || !info || !loadMore) return;

    const list = filterBikes();
    const show = list.slice(0, visibleCount);

    grid.innerHTML = ""; // safe: qui non inserisco input utente, solo card create con createElement
    show.forEach(b => grid.appendChild(createCard(b)));

    info.textContent = `${list.length} risultati (mostrati ${show.length})`;

    loadMore.hidden = show.length >= list.length;
    loadMore.disabled = show.length >= list.length;
  }

  // MODALE
  function openModal(id) {
    const b = bikes.find(x => x.id === id);
    if (!b) return;

    const modal = qs("#modal");
    const back = qs("#modalBackdrop");
    const body = qs("#modalBody");
    const title = qs("#modalTitle");
    const favBtn = qs("#modalFavBtn");
    if (!modal || !back || !body || !title || !favBtn) return;

    title.textContent = b.name;

    body.innerHTML = ""; // safe: nessun input utente
    const box = document.createElement("div");
    box.style.display = "grid";
    box.style.gap = "12px";

    const img = document.createElement("img");
    img.src = b.img;
    img.alt = "Foto " + b.name;
    img.style.borderRadius = "12px";
    img.style.border = "1px solid var(--line)";

    const meta = document.createElement("p");
    meta.className = "muted";
    meta.textContent = `${b.brand} • ${b.category.toUpperCase()} • ${b.year} • ${b.cc} cc • ${b.hp} hp`;

    const desc = document.createElement("p");
    desc.textContent = b.desc;

    const price = document.createElement("p");
    price.style.margin = "0";
    price.style.fontWeight = "800";
    price.textContent = "Prezzo: " + euro(b.price);

    box.appendChild(img);
    box.appendChild(meta);
    box.appendChild(desc);
    box.appendChild(price);
    body.appendChild(box);

    favBtn.textContent = isFav(b.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";
    favBtn.onclick = () => {
      const nowFav = toggleFav(b.id);
      favBtn.textContent = nowFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";
      showToast(nowFav ? "Aggiunto ai preferiti" : "Rimosso dai preferiti");
      renderCatalog();
    };

    back.hidden = false;
    modal.hidden = false;

    // focus sul pulsante chiudi
    qs("#closeModalBtn")?.focus();

    function onKey(e) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", onKey, { once: true });

    // click fuori
    back.onclick = closeModal;

    // memorizzo handler per sicurezza
    openModal._closeHandler = closeModal;

    function closeModal() {
      back.hidden = true;
      modal.hidden = true;
      back.onclick = null;
      openModal._closeHandler = null;
    }
  }

  function initModalButtons() {
    qs("#closeModalBtn")?.addEventListener("click", () => openModal._closeHandler?.());
    qs("#modalCloseBtn")?.addEventListener("click", () => openModal._closeHandler?.());
  }

  // FORM validazione
  function initForm() {
    const form = qs("#testRideForm");
    if (!form) return;

    const modelSel = qs("#model");
    if (modelSel) {
      modelSel.innerHTML = "";
      const opt0 = document.createElement("option");
      opt0.value = "";
      opt0.textContent = "Seleziona modello";
      modelSel.appendChild(opt0);

      bikes.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b.id;
        opt.textContent = b.name;
        modelSel.appendChild(opt);
      });
    }

    // prova a riprendere ultima richiesta
    try {
      const raw = localStorage.getItem(LS_FORM);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && typeof d === "object") {
          if (qs("#fullName")) qs("#fullName").value = d.fullName || "";
          if (qs("#email")) qs("#email").value = d.email || "";
          if (qs("#date")) qs("#date").value = d.date || "";
          if (qs("#model")) qs("#model").value = d.model || "";
        }
      }
    } catch {}

    const nameInput = qs("#fullName");
    const emailInput = qs("#email");
    const dateInput = qs("#date");

    const errName = qs("#errName");
    const errEmail = qs("#errEmail");
    const errDate = qs("#errDate");
    const errModel = qs("#errModel");

    function setErr(el, msg) { if (el) el.textContent = msg; }
    function clearErrs(){
      setErr(errName, "");
      setErr(errEmail, "");
      setErr(errDate, "");
      setErr(errModel, "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrs();

      const fullName = (nameInput?.value || "").trim();
      const email = (emailInput?.value || "").trim();
      const date = (dateInput?.value || "").trim();
      const model = (modelSel?.value || "").trim();

      let ok = true;

      if (fullName.length < 3) { setErr(errName, "Inserisci nome e cognome (min 3 caratteri)."); ok = false; }
      if (!emailPattern.test(email)) { setErr(errEmail, "Email non valida."); ok = false; }
      if (!date) { setErr(errDate, "Seleziona una data."); ok = false; }
      if (!model) { setErr(errModel, "Seleziona un modello."); ok = false; }

      if (!ok) return;

      // salva richiesta (solo demo)
      localStorage.setItem(LS_FORM, JSON.stringify({ fullName, email, date, model }));

      showToast("Richiesta inviata (demo)");
      form.reset();
      if (modelSel) modelSel.value = "";
    });
  }

  // PREFERITI page
  function initFavoritesPage() {
    const grid = qs("#favGrid");
    const empty = qs("#emptyFav");
    const info = qs("#favInfo");
    const clearBtn = qs("#clearFavBtn");
    if (!grid || !empty || !info || !clearBtn) return;

    function renderFav() {
      const ids = getFavIds();
      const list = bikes.filter(b => ids.includes(b.id));

      info.textContent = `${list.length} preferiti`;

      grid.innerHTML = "";
      if (list.length === 0) {
        empty.hidden = false;
        return;
      }
      empty.hidden = true;

      list.forEach(b => {
        const card = createCard(b);

        // rendo il bottone "Aggiungi" come "Rimuovi" qui
        const btns = card.querySelectorAll("button");
        const favBtn = btns[1];
        if (favBtn) {
          favBtn.textContent = "Rimuovi";
          favBtn.classList.remove("primary");
          favBtn.addEventListener("click", () => {
            toggleFav(b.id);
            showToast("Rimosso dai preferiti");
            renderFav();
          });
        }

        grid.appendChild(card);
      });
    }

    clearBtn.addEventListener("click", () => {
      setFavIds([]);
      showToast("Preferiti svuotati");
      renderFav();
    });

    renderFav();
  }

  function initCatalogPage() {
    const grid = qs("#cardsGrid");
    if (!grid) return;

    visibleCount = 6;

    qs("#resetBtn")?.addEventListener("click", () => {
      const s = qs("#search"); if (s) s.value = "";
      const c = qs("#category"); if (c) c.value = "all";
      const so = qs("#sort"); if (so) so.value = "name-asc";
      visibleCount = 6;
      renderCatalog();
      showToast("Filtri resettati");
    });

    ["#search", "#category", "#sort"].forEach(id => {
      qs(id)?.addEventListener("input", () => {
        visibleCount = 6;
        renderCatalog();
      });
      qs(id)?.addEventListener("change", () => {
        visibleCount = 6;
        renderCatalog();
      });
    });

    qs("#loadMoreBtn")?.addEventListener("click", () => {
      visibleCount += 3;
      renderCatalog();
    });

    initModalButtons();
    initForm();
    renderCatalog();
  }

  // init generale
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    updateFavBadge();

    const page = document.documentElement.getAttribute("data-page");
    if (page === "home") initHome();
    if (page === "catalogo") initCatalogPage();
    if (page === "preferiti") initFavoritesPage();
  });
})();
