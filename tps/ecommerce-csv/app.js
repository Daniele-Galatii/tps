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
      product[header.trim()] = values[index].replaceAll('"', '').trim();
    });

    return product;
  });
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
    const response = await fetch("prodotti.csv");
    const text = await response.text();
    const products = parseCSV(text);

    grid.innerHTML = "";

    products.forEach((product, index) => {
      grid.appendChild(createProductCard(product, index));
    });
  } catch (error) {
    grid.textContent = "Errore nel caricamento dei prodotti.";
  }
}

function updateCartCount() {
  const count = document.getElementById("cartCount");
  if (!count) return;

  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  count.textContent = cart.length;
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
