const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.getElementById("themeToggle");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.style.display =
            navLinks.style.display === "flex" ? "none" : "flex";
    });
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
}
