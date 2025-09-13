
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.data));
};

const displayCategories = (cats) => {
  const catContainer = document.getElementById("categories");
  catContainer.innerHTML = "";

  for (let cat of cats) {
    const btn = document.createElement("button");
    btn.innerText = cat.category;
    btn.classList.add("category-btn");
    btn.onclick = () => loadCategory(cat.id, btn);
    catContainer.appendChild(btn);
  }
};


const removeActive = () => {
  document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
};

// === PLANTS / CARDS ====
const loadCategory = (id, btn) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      removeActive();
      btn.classList.add("active");
      displayPlants(data.data);
      manageSpinner(false);
    });
};


