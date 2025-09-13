// ===================== CATEGORIES =====================
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.data));
};

const displayCategories = (cats) => {
  const catContainer = document.getElementById("categories-container");
  catContainer.innerHTML = "";

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("flex-row", "text-[20px]", "font-semibold", "mb-4");
  titleDiv.innerText = "Categories";
  catContainer.append(titleDiv);

  for (let cat of cats) {
    const catDiv = document.createElement("div");
    catDiv.innerHTML = `
      <p onclick="loadCategory(${cat.id})" id="catBtn-${cat.id}"
         class="block my-2 ml-3 cursor-pointer catBtn hover:bg-green-600 hover:text-white px-3 py-1 rounded">
        ${cat.category}
      </p>
    `;
    catContainer.append(catDiv);
  }
};

const removeActive = () => {
  document.querySelectorAll(".catBtn").forEach(btn => btn.classList.remove("active"));
};

const loadCategory = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      removeActive();
      document.getElementById(`catBtn-${id}`).classList.add("active");
      displayPlants(data.data);
      manageSpinner(false);
    });
};

// ===================== PLANTS / CARDS =====================
const displayPlants = (plants) => {
  const container = document.getElementById("trees-container");
  container.innerHTML = "";

  for (let plant of plants) {
    const card = document.createElement("div");
    card.className = "p-4 w-full bg-white cursor-pointer rounded-2xl mb-6";
    card.innerHTML = `
      <img src="${plant.image}" class="mb-3 h-52 w-full rounded-2xl object-cover" alt="${plant.name}" />
      <h5 class="font-semibold text-lg">${plant.name}</h5>
      <p class="text-sm text-gray-600 h-18 my-2">${plant.description}</p>
      <div class="flex justify-between items-center mb-2">
        <p class="bg-green-100 text-green-600 w-fit py-1 px-3 rounded-3xl text-sm">${plant.category}</p>
        <p class="font-semibold text-sm">৳${plant.price}</p>
      </div>
      <button class="bg-green-600 text-white py-2 rounded-full w-full hover:bg-green-800 add-to-cart">
        Add to Cart
      </button>
    `;

    // Open plant details
    card.querySelector("img, h5, p").addEventListener("click", () => loadPlantDetails(plant.id));

    // Add to cart
    card.querySelector(".add-to-cart").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(plant);
    });

    container.appendChild(card);
  }
};

// ===================== SPINNER =====================
const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const container = document.getElementById("trees-container");
  if (status) {
    spinner.classList.remove("hidden");
    container.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    container.classList.remove("hidden");
  }
};

// ===================== PLANT DETAILS =====================
const loadPlantDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => displayPlantDetails(data.data));
};

const displayPlantDetails = (plant) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="p-5 space-y-5">
      <h4 class="font-bold text-2xl">${plant.name}</h4>
      <img src="${plant.image}" alt="${plant.name}" class="h-52 w-full rounded-md" />
      <p><span class="font-semibold">Category - </span>${plant.category}</p>
      <p><span class="font-semibold">Price - </span>৳${plant.price}</p>
      <p><span class="font-semibold">Description - </span>${plant.description}</p>
    </div>
  `;
  document.getElementById("wordModal").showModal();
};

// ===================== CART =====================
let cartTotal = 0;

const addToCart = (plant) => {
  const cartContainer = document.getElementById("cart-container");

  const cartItem = document.createElement("div");
  cartItem.className = "bg-green-50 rounded-lg px-3 py-3 mb-2";
  cartItem.innerHTML = `
    <div class="flex justify-between items-center">
      <div>
        <p class="font-semibold">${plant.name}</p>
        <p>৳ <span class="item-price">${plant.price}</span> × 1</p>
      </div>
      <i class="fa-regular fa-circle-xmark cursor-pointer remove-item text-lg"></i>
    </div>
  `;

  cartContainer.appendChild(cartItem);

  cartTotal += plant.price;
  updateCartTotal();

  cartItem.querySelector(".remove-item").addEventListener("click", () => {
    cartItem.remove();
    cartTotal -= plant.price;
    updateCartTotal();
  });
};

const updateCartTotal = () => {
  const totalBox = document.getElementById("cart-total");
  totalBox.innerText = cartTotal;
};

// ===================== LOAD ALL PLANTS =====================
const loadAllPlants = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      displayPlants(data.data);
      manageSpinner(false);
    });
};

// ===================== INIT =====================
loadCategories();
loadAllPlants();
