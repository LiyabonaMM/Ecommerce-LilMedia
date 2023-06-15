function addToCartNewBalance530() {
  // Retrieve the selected size and quantity
  let size = document.getElementById("sizeSelect").value;
  let quantity = parseInt(document.getElementById("quantityInput").value);

  // Perform some validation if needed

  // Add the item to the cart
  let item = {
    name: "New Balance 530",
    price: "R15000",
    size: size,
    quantity: quantity,
    image: "https://i.postimg.cc/7LQ5cDMw/afdabda8f35bf5ec67cffd64256c6556.jpg",
  };

  // Retrieve existing cart items from local storage
  let cartItems = JSON.parse(localStorage.getItem("sharedStorageKey")) || [];

  // Add the new item to the cart
  cartItems.push(item);

  // Store the updated cart items in local storage
  localStorage.setItem("sharedStorageKey", JSON.stringify(cartItems));

  // Redirect the user to the cart page
  window.location.href = "cart.html";
}
