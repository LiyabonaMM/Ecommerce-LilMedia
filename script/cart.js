// Function to remove a product from the cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("sharedStorageKey")) || [];
  cart.splice(index, 1);
  localStorage.setItem("sharedStorageKey", JSON.stringify(cart));
  displayCartItems();
}

// Function to calculate the total price of items in the cart
function calculateTotalPrice() {
  let cart = JSON.parse(localStorage.getItem("sharedStorageKey")) || [];
  let totalPrice = cart.reduce(function (total, product) {
    let price = parseFloat(product.price.replace("R", ""));
    return total + price * (product.quantity || 1);
  }, 0);
  return totalPrice.toFixed(2);
}

// Function to display cart items
function displayCartItems() {
  let cartItemsTable = document.getElementById("cartItems");
  let totalElement = document.getElementById("total");

  let cart = JSON.parse(localStorage.getItem("sharedStorageKey")) || [];
  let totalPrice = calculateTotalPrice();

  cartItemsTable.innerHTML = "";
  totalElement.textContent = "R" + totalPrice;

  cart.forEach(function (product, index) {
    let row = document.createElement("tr");

    let productColumn = document.createElement("td");
    productColumn.classList.add("cart-item");

    let productImage = document.createElement("div");
    productImage.classList.add("cart-item-image");
    let image = document.createElement("img");
    image.src = product.image;
    productImage.appendChild(image);

    let productDetails = document.createElement("div");
    productDetails.classList.add("cart-item-details");

    let productName = document.createElement("div");
    productName.classList.add("cart-item-name");
    productName.textContent = product.name;

    let productPrice = document.createElement("div");
    productPrice.classList.add("cart-item-price");
    productPrice.textContent = product.price;

    let quantityColumn = document.createElement("td");
    let quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.value = product.quantity || 1;
    quantityInput.addEventListener("input", function () {
      updateQuantity(index, parseInt(quantityInput.value));
      displayCartItems();
    });
    quantityColumn.appendChild(quantityInput);

    let subtotalColumn = document.createElement("td");
    let subtotal =
      parseFloat(product.price.replace("R", "")) * (product.quantity || 1);
    subtotalColumn.textContent = "R" + subtotal.toFixed(2);

    let removeColumn = document.createElement("td");
    removeColumn.classList.add("cart-item-remove");
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeFromCart(index);
      displayCartItems();
    });

    removeColumn.appendChild(removeButton);
    productDetails.appendChild(productName);
    productDetails.appendChild(productPrice);

    productColumn.appendChild(productImage);
    productColumn.appendChild(productDetails);

    row.appendChild(productColumn);
    row.appendChild(subtotalColumn);
    row.appendChild(quantityColumn);
    row.appendChild(subtotalColumn);
    row.appendChild(removeColumn);

    cartItemsTable.appendChild(row);
  });
}

// Call the function to display cart items
displayCartItems();

// Function to process the checkout
function checkout() {
  // Clear the cart
  localStorage.removeItem("sharedStorageKey");
  document.getElementById("cartItems").innerHTML = "";

  // Display a thank you message
  alert("Thank you for your purchase!");
}
