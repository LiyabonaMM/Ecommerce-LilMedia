// Function to remove a product from the cart
function removeFromCart(index) {
  // Retrieve the cart items from local storage
  let cart = JSON.parse(localStorage.getItem("sharedStorageKey")) || [];

  // Remove the product at the specified index from the cart
  cart.splice(index, 1);

  // Update the cart items in local storage
  localStorage.setItem("sharedStorageKey", JSON.stringify(cart));

  // Display the updated cart items
  displayCartItems();
}

// Function to calculate the total price of items in the cart
function calculateTotalPrice() {
  // Retrieve the cart items from local storage
  let cart = JSON.parse(localStorage.getItem("sharedStorageKey")) || [];

  // Calculate the total price by iterating over the cart items
  let totalPrice = cart.reduce(function (total, product) {
    let price = parseFloat(product.price.replace("R", ""));
    return total + price * (product.quantity || 1);
  }, 0);

  return totalPrice.toFixed(2);
}

// Function to display cart items
function displayCartItems() {
  // Get the table and total elements from the HTML
  let cartItemsTable = document.getElementById("cartItems");
  let totalElement = document.getElementById("total");

  // Retrieve the cart items from local storage
  let cart = JSON.parse(localStorage.getItem("sharedStorageKey")) || [];

  // Calculate the total price
  let totalPrice = calculateTotalPrice();

  // Clear the cart items table
  cartItemsTable.innerHTML = "";

  // Update the total price element
  totalElement.textContent = "R" + totalPrice;

  // Iterate over the cart items and display them in the table
  cart.forEach(function (product, index) {
    let row = document.createElement("tr");

    // Create elements for the product details
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

    // Create elements for quantity and subtotal
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

    // Create the remove button and handle its click event
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
  // Clear the cart items in local storage
  localStorage.removeItem("sharedStorageKey");

  // Clear the cart items table in the HTML
  document.getElementById("cartItems").innerHTML = "";

  // Display a thank you message
  alert("Thank you for your purchase!");
}
