
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

const displayPlants = (plants) => {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  if (plants.length === 0) {
    container.innerHTML = `<p class="placeholder">No plants found in this category.</p>`;
    return;
  }

  for (let plant of plants) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}">
      <h3>${plant.name}</h3>
      <p>${plant.description}</p>
      <span class="badge">${plant.category}</span>
      <p class="price">৳${plant.price}</p>
      <button class="btn btn-primary add-to-cart">Add to Cart</button>
    `;

    
    card.querySelector("img, h3, p").addEventListener("click", () => loadPlantDetails(plant.id));

    // Add to cart
    card.querySelector(".add-to-cart").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(plant);
    });

    container.appendChild(card);
  }
};


const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const container = document.getElementById("cards-container");
  if (status) {
    spinner.classList.remove("hidden");
    container.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    container.classList.remove("hidden");
  }
};

// modal
const loadPlantDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => displayPlantDetails(data.data));
};

const displayPlantDetails = (plant) => {
  const detailsBox = document.getElementById("modal-body");
  detailsBox.innerHTML = `
    <h3>${plant.name}</h3>
    <img src="${plant.image}" alt="${plant.name}">
    <p><strong>Category:</strong> ${plant.category}</p>
    <p><strong>Price:</strong> ৳${plant.price}</p>
    <p>${plant.description}</p>
  `;
  document.getElementById("modal").classList.remove("hidden");
};

// Close modal
document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

// cart
let cartTotal = 0;

const addToCart = (plant) => {
  const cartContainer = document.getElementById("cart-list");

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${plant.name} x1 - ৳${plant.price}</span>
    <button class="remove-item">Remove</button>
  `;
  cartContainer.appendChild(li);

  cartTotal += plant.price;
  updateCartTotal();

  li.querySelector(".remove-item").addEventListener("click", () => {
    li.remove();
    cartTotal -= plant.price;
    updateCartTotal();
  });
};

const updateCartTotal = () => {
  const totalBox = document.getElementById("cart-total");
  totalBox.innerText = cartTotal;
};


const loadAllPlants = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      displayPlants(data.data);
      manageSpinner(false);
    });
};


loadCategories();
loadAllPlants();
