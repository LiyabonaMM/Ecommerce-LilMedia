// Array containing product data
let products = [{
  imageUrl: "https://i.postimg.cc/020VDJnF/5a1e5d72423d4c1e4021e987f26cf4f7.jpg",
  name: "Nike Dunk Low VI",
  price: "R1000",
},
{
  imageUrl: "https://i.postimg.cc/yYTDF0GM/d8dc11a0e8a9797de1537ad404b712f8.jpg",
  name: "Lace-Up Cactus TRXVSS",
  price: "R2000",

},
{
  imageUrl: "https://i.postimg.cc/7LQ5cDMw/afdabda8f35bf5ec67cffd64256c6556.jpg",
  name: "New Balance 530",
  price: "R15000",
},
{
  imageUrl: "https://i.postimg.cc/4xNTjc3R/5e3ddba494c7fc7853d9cac96037705f.jpg",
  name: "Rare Kanye X Bape",
  price: "R250000",
},
{
  imageUrl: "https://i.postimg.cc/xC4rmjDJ/8ce66171d6c2f557e01b12deb9d0102d.jpg",
  name: "Batman",
  price: "R2000",
},
{
  imageUrl: "https://i.postimg.cc/PfW9hMNv/4a71a2ff209c1e5b47f2acd0125baa2a.jpg",
  name: "LV Nike",
  price: "R250000",
},
{
  imageUrl: "https://i.postimg.cc/15zHT0FQ/456403c28bec8faccee5bef41cd27c8e.jpg",
  name: "Black Crocs",
  price: "R1000",
},
{
  imageUrl: "https://i.postimg.cc/sxH08TDM/df008b4cd48b9f7d48bff0d039f5ba45.jpg",
  name: "Old Skool Vans - Lil Wayne Giveaway",
  price: "R3000",
},
];

// Retrieve the product list from products.js
const productList = document.getElementById('productList');

function fetchProducts() {
return new Promise((resolve, reject) => {
  const storedProducts = localStorage.getItem('products');

  if (storedProducts) {
    products = JSON.parse(storedProducts);
    resolve(products);
  } else {
    // Loading the products.js script dynamically
    const script = document.createElement('script');
    script.src = 'products.js';
    script.onload = () => {
      if (typeof products !== 'undefined') {
        resolve(products);
      } else {
        reject(new Error('Failed to fetch products'));
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load script'));
    };
    document.head.appendChild(script);
  }
});
}

// Function to render the product list
function renderProductList() {
productList.innerHTML = '';

// Looping through the products array
products.forEach((product, index) => {
  // Creating a product card
  const card = createProductCard(product, index);
  productList.appendChild(card);
});
}

//Function to create a product card
function createProductCard(product, index) {
const card = document.createElement('div');
card.className = 'card';
card.style = 'width: 18rem;';

const image = document.createElement('img');
image.className = 'card-img-top';
image.src = product.imageUrl;
image.alt = product.name;
card.appendChild(image);

const cardBody = document.createElement('div');
cardBody.className = 'card-body';

const title = document.createElement('h5');
title.className = 'card-title';
title.textContent = product.name;
cardBody.appendChild(title);

const desc = document.createElement('p');
desc.className = 'card-text';
desc.textContent = product.description; // Add the product description
cardBody.appendChild(desc);

const price = document.createElement('p');
price.className = 'card-text';
price.textContent = 'Price: R' + product.price;
cardBody.appendChild(price);

const editBtn = document.createElement('button');
editBtn.className = 'btn btn-primary';
editBtn.textContent = 'Edit';
editBtn.addEventListener('click', () => {
  editProduct(index);
});
cardBody.appendChild(editBtn);

const deleteBtn = document.createElement('button');
deleteBtn.className = 'btn btn-danger';
deleteBtn.textContent = 'Delete';
deleteBtn.addEventListener('click', () => {
  deleteProduct(index);
});
cardBody.appendChild(deleteBtn);

card.appendChild(cardBody);

return card;
}

function addProduct(event) {
event.preventDefault();

//  input values from the form
const productName = document.getElementById('productName').value;
const productDesc = document.getElementById('productDesc').value;
const productPrice = document.getElementById('productPrice').value;
const productImageUrl = document.getElementById('productImageUrl').value;

// Creating a new product object
const newProduct = {
  imageUrl: productImageUrl,
  name: productName,
  price: productPrice,
  description: productDesc, // Add the product description
};

// Adding the new product to the existing list in products
products.push(newProduct);

// Storing the updated product list in local storage
localStorage.setItem('products', JSON.stringify(products));

// Rendering the updated product list
renderProductList();

// Closing the modal and reset the form
$('#addProductModal').modal('hide');
document.getElementById('addProductForm').reset();
}

function editProduct(index) {
// Fetching  the existing products
fetchProducts()
  .then((products) => {
    // Getting the product to be edited
    const productToEdit = products[index];

    // Populating the form with the product details
    document.getElementById('productName').value = productToEdit.name;
    document.getElementById('productDesc').value = productToEdit.description;
    document.getElementById('productPrice').value = productToEdit.price;
    document.getElementById('productImageUrl').value = productToEdit.imageUrl;

    // Opening the modal for editing
    $('#addProductModal').modal('show');

    // Overriding the submit button click event to update the product
    document.querySelector('#addProductModal button[type="submit"]').onclick = (
      event
    ) => {
      event.preventDefault();

      // Getting updated input values from the form
      const updatedProductName = document.getElementById('productName').value;
      const updatedProductDesc = document.getElementById('productDesc').value;
      const updatedProductPrice = document.getElementById('productPrice').value;
      const updatedProductImageUrl = document.getElementById(
        'productImageUrl'
      ).value;

      // Updating the product details
      productToEdit.name = updatedProductName;
      productToEdit.description = updatedProductDesc;
      productToEdit.price = updatedProductPrice;
      productToEdit.imageUrl = updatedProductImageUrl;

      // Storing the updated product list in local storage
      localStorage.setItem('products', JSON.stringify(products));

      // Rendering the updated product list
      renderProductList();

      // Closing the modal and reset the form
      $('#addProductModal').modal('hide');
      document.getElementById('addProductForm').reset();
    };
  })
  .catch((error) => {
    console.error(error);
  });
}

// Function to delete a product
function deleteProduct(index) {
// Fetching the existing products
fetchProducts()
  .then((products) => {
    // Removing the product from the list
    products.splice(index, 1);

    // Storing the updated product list in local storage
    localStorage.setItem('products', JSON.stringify(products));

    // Rendering the updated product list
    renderProductList();
  })
  .catch((error) => {
    console.error(error);
  });
}

// On page load, fetch the products and render the list
fetchProducts()
.then((products) => {
  renderProductList(products);
})
.catch((error) => {
  console.error(error);
});
