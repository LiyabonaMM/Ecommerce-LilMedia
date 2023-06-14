// Get elements from the HTML
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');
const saveProductBtn = document.getElementById('saveProductBtn');
const sortByNameBtn = document.getElementById('sortByNameBtn');
const sortByPriceBtn = document.getElementById('sortByPriceBtn');

// Array to store products
let products = [];

// Event listeners for buttons
addProductBtn.addEventListener('click', clearProductForm);
saveProductBtn.addEventListener('click', saveProduct);
sortByNameBtn.addEventListener('click', sortProductsByName);
sortByPriceBtn.addEventListener('click', sortProductsByPrice);

// Clear the product form inputs
function clearProductForm() {
  document.getElementById('productName').value = '';
  document.getElementById('productDesc').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImageUrl').value = '';
}

// Save a new product
function saveProduct() {
  const productName = document.getElementById('productName').value;
  const productDesc = document.getElementById('productDesc').value;
  const productPrice = document.getElementById('productPrice').value;
  const productImageUrl = document.getElementById('productImageUrl').value;

  const product = {
    name: productName,
    description: productDesc,
    price: parseFloat(productPrice),
    imageUrl: productImageUrl,
  };

  products.push(product);
  saveProductsToLocalStorage();
  renderProductList();
  clearProductForm();
  hideAddProductModal();
}

// Delete a product
function deleteProduct(index) {
  products.splice(index, 1);
  saveProductsToLocalStorage();
  renderProductList();
}

// Render the product list on the page
function renderProductList() {
  productList.innerHTML = '';

  products.forEach((product, index) => {
    const card = createProductCard(product, index);
    productList.appendChild(card);
  });
}

// Create a card element for a product
function createProductCard(product, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src = product.imageUrl;
  image.alt = product.name;

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = product.name;

  const price = document.createElement('p');
  price.classList.add('card-text');
  price.textContent = 'Price: $' + product.price.toFixed(2);

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = product.description;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-danger');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteProduct(index));

  cardBody.appendChild(title);
  cardBody.appendChild(price);
  cardBody.appendChild(description);
  cardBody.appendChild(deleteBtn);

  card.appendChild(image);
  card.appendChild(cardBody);

  return card;
}

// Sort products by name
function sortProductsByName() {
  products.sort((a, b) => a.name.localeCompare(b.name));
  renderProductList();
}

// Sort products by price
function sortProductsByPrice() {
  products.sort((a, b) => a.price - b.price);
  renderProductList();
}

// Save products to local storage
function saveProductsToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Load products from local storage
function loadProductsFromLocalStorage() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
    renderProductList();
  }
}

// Hide the add product modal
function hideAddProductModal() {
  const modal = document.getElementById('addProductModal');
  const backdrop = document.getElementById('modalBackdrop');
  modal.classList.remove('show');
  backdrop.classList.remove('show');
}

// Load products from local storage on page load
loadProductsFromLocalStorage();
