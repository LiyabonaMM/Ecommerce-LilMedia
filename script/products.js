
          // Array containing product data
          let products = [{
            image: "https://i.postimg.cc/020VDJnF/5a1e5d72423d4c1e4021e987f26cf4f7.jpg",
            name: "Nike Dunk Low VI",
            price: "R1000",
          },
          {
            image: "https://i.postimg.cc/yYTDF0GM/d8dc11a0e8a9797de1537ad404b712f8.jpg",
            name: "Lace-Up Cactus TRXVSS",
            price: "R2000",
          },
          {
            image: "https://i.postimg.cc/7LQ5cDMw/afdabda8f35bf5ec67cffd64256c6556.jpg",
            name: "New Balance 530",
            price: "R15000",
          },
          {
            image: "https://i.postimg.cc/4xNTjc3R/5e3ddba494c7fc7853d9cac96037705f.jpg",
            name: "Rare Kanye X Bape",
            price: "R250000",
          },
          {
            image: "https://i.postimg.cc/xC4rmjDJ/8ce66171d6c2f557e01b12deb9d0102d.jpg",
            name: "Batman",
            price: "R2000",
          },
          {
            image: "https://i.postimg.cc/PfW9hMNv/4a71a2ff209c1e5b47f2acd0125baa2a.jpg",
            name: "LV Nike",
            price: "R250000",
          },
          {
            image: "https://i.postimg.cc/15zHT0FQ/456403c28bec8faccee5bef41cd27c8e.jpg",
            name: "Black Crocs",
            price: "R1000",
          },
          {
            image: "https://i.postimg.cc/sxH08TDM/df008b4cd48b9f7d48bff0d039f5ba45.jpg",
            name: "Old Skool Vans - Lil Wayne Giveaway",
            price: "R3000",
          },
        ];

        // Function to create product elements dynamically
function createProductElement(product) {
let productDiv = document.createElement("div");
productDiv.className = "col-4";

let productImage = document.createElement("img");
productImage.src = product.image;

let productName = document.createElement("h4");
productName.textContent = product.name;

let productPrice = document.createElement("p");
productPrice.textContent = product.price;

let addToCartButton = document.createElement("button");
addToCartButton.textContent = "Add to Cart";
addToCartButton.className = "btn btn-primary";

addToCartButton.addEventListener("click", function () {
  addToCart(product);
});

productDiv.appendChild(productImage);
productDiv.appendChild(productName);
productDiv.appendChild(productPrice);
productDiv.appendChild(addToCartButton);

return productDiv;
}

// Function to add products to the product row
function addProductsToRow() {
let productRow = document.getElementById("productRow");

products.forEach(function (product) {
  let productElement = createProductElement(product);
  productRow.appendChild(productElement);
});
}

// Function to add a product to the cart
function addToCart(product) {
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Check if the product already exists in the cart
let existingProduct = cart.find((item) => item.name === product.name);

if (existingProduct) {
  // Increase the quantity and update the total price
  existingProduct.quantity++;
  existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
} else {
  // Add the product to the cart
  product.quantity = 1;
  product.totalPrice = product.price;
  cart.push(product);
}

localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to sort products based on the selected option
function sortProducts() {
let sortingSelect = document.getElementById("sortingSelect");
let selectedIndex = sortingSelect.selectedIndex;

switch (selectedIndex) {
  case 1:
    products.sort(function (a, b) {
      return (
        parseInt(a.price.substring(1)) - parseInt(b.price.substring(1))
      );
    });
    break;
  case 2:
    products.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    break;
}

let productRow = document.getElementById("productRow");
productRow.innerHTML = "";
addProductsToRow();
}

// Call the function to add products
addProductsToRow();