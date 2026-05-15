const CONFIG_KEY = "ecommerceConfig";
const CART_KEY = "ecommerceCart";

function getConfig() {
  const saved = localStorage.getItem(CONFIG_KEY);
  return saved ? JSON.parse(saved) : null;
}

function updateHeader() {
  const config = getConfig();

  const title = document.getElementById("shopTitle");
  const category = document.getElementById("shopCategory");

  if (config && title && category) {
    title.textContent = config.nome;
    category.textContent = config.categoria;
  }
}

function parseCSV(text) {
  const rows = text.trim().split("\n");
  const headers = rows[0].split(",");

  return rows.slice(1).map(row => {
    const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    const product = {};

    headers.forEach((header, index) => {
      product[header.trim()] = values[index].replaceAll('"', "").trim();
    });

    return product;
  });
}

async function getProducts() {
  const response = await fetch("prodotti.csv");
  const text = await response.text();
  return parseCSV(text);
}

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCount() {
  const count = document.getElementById("cartCount");
  if (!count) return;

  const cart = getCart();
  count.textContent = cart.length;
}

function createProductCard(product, index) {
  const card = document.createElement("article");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = product.immagine;
  img.alt = product.modello;

  const content = document.createElement("div");
  content.className = "product-content";

  const title = document.createElement("h3");
  title.textContent = product.modello;

  const desc = document.createElement("p");
  desc.textContent = product.descrizione;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = product.prezzo + " €";

  const details = document.createElement("a");
  details.className = "btn-product";
  details.href = "prodotto.html?id=" + index;
  details.textContent = "Dettagli prodotto";

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(price);
  content.appendChild(details);

  card.appendChild(img);
  card.appendChild(content);

  return card;
}

async function loadProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  try {
    const products = await getProducts();

    grid.innerHTML = "";

    products.forEach((product, index) => {
      grid.appendChild(createProductCard(product, index));
    });
  } catch (error) {
    grid.textContent = "Errore nel caricamento dei prodotti.";
  }
}

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

async function loadProductDetail() {
  const detail = document.getElementById("productDetail");
  if (!detail) return;

  try {
    const products = await getProducts();
    const id = getProductIdFromUrl();
    const product = products[id];

    if (!product) {
      detail.textContent = "Prodotto non trovato.";
      return;
    }

    detail.innerHTML = "";

    const image = document.createElement("img");
    image.src = product.immagine;
    image.alt = product.modello;

    const info = document.createElement("div");
    info.className = "detail-info";

    const brand = document.createElement("p");
    brand.className = "detail-brand";
    brand.textContent = product.marca;

    const title = document.createElement("h2");
    title.textContent = product.modello;

    const desc = document.createElement("p");
    desc.textContent = product.descrizione;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = product.prezzo + " €";

    const addButton = document.createElement("button");
    addButton.className = "btn-product";
    addButton.textContent = "Aggiungi al carrello";
    addButton.addEventListener("click", () => {
      addToCart(product);
    });

    const backLink = document.createElement("a");
    backLink.href = "index.html";
    backLink.className = "back-link";
    backLink.textContent = "← Torna al catalogo";

    info.appendChild(brand);
    info.appendChild(title);
    info.appendChild(desc);
    info.appendChild(price);
    info.appendChild(addButton);
    info.appendChild(backLink);

    detail.appendChild(image);
    detail.appendChild(info);
  } catch (error) {
    detail.textContent = "Errore nel caricamento del dettaglio prodotto.";
  }
}

function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  updateCartCount();
  alert("Prodotto aggiunto al carrello.");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  const cart = getCart();
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.textContent = "Il carrello è vuoto.";
    cartTotal.textContent = "0.00 €";
    return;
  }

  let total = 0;

  cart.forEach((product, index) => {
    total += Number(product.prezzo);

    const item = document.createElement("article");
    item.className = "cart-item";

    const title = document.createElement("h3");
    title.textContent = product.modello;

    const desc = document.createElement("p");
    desc.textContent = product.marca + " - " + product.descrizione;

    const price = document.createElement("strong");
    price.textContent = product.prezzo + " €";

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove";
    removeBtn.textContent = "Rimuovi";
    removeBtn.addEventListener("click", () => {
      removeFromCart(index);
    });

    item.appendChild(title);
    item.appendChild(desc);
    item.appendChild(price);
    item.appendChild(removeBtn);

    cartItems.appendChild(item);
  });

  cartTotal.textContent = total.toFixed(2) + " €";
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

function clearCart() {
  saveCart([]);
  updateCartCount();
  renderCart();
}

function generatePDF() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Il carrello è vuoto.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const config = getConfig();
  const shopName = config ? config.nome : "Ecommerce";

  doc.setFontSize(18);
  doc.text("Ordine - " + shopName, 10, 15);

  doc.setFontSize(11);
  doc.text("Riepilogo prodotti acquistati", 10, 25);

  let y = 40;
  let total = 0;

  cart.forEach((product, index) => {
    total += Number(product.prezzo);

    doc.text(
      `${index + 1}. ${product.marca} ${product.modello} - ${product.prezzo} euro`,
      10,
      y
    );

    y += 8;
  });

  y += 8;
  doc.setFontSize(14);
  doc.text("Totale: " + total.toFixed(2) + " euro", 10, y);

  doc.save("ordine-ecommerce.pdf");
}

function initCartPage() {
  renderCart();

  const pdfButton = document.getElementById("pdfButton");
  const clearCartButton = document.getElementById("clearCartButton");

  if (pdfButton) {
    pdfButton.addEventListener("click", generatePDF);
  }

  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
  }
}

const configForm = document.getElementById("configForm");

if (configForm) {
  configForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const shopName = document.getElementById("shopName").value.trim();
    const shopCategory = document.getElementById("shopCategory").value.trim();

    if (shopName === "" || shopCategory === "") {
      alert("Compila tutti i campi.");
      return;
    }

    const config = {
      nome: shopName,
      categoria: shopCategory
    };

    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    window.location.href = "index.html";
  });
}

updateHeader();
updateCartCount();
loadProducts();
loadProductDetail();
initCartPage();
