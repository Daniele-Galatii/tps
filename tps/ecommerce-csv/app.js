const CONFIG_KEY = "ecommerceConfig";

function salvaConfigurazione(event) {
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
}

const configForm = document.getElementById("configForm");

if (configForm) {
  configForm.addEventListener("submit", salvaConfigurazione);
}
