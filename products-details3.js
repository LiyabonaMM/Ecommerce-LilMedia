function addToCartAdidasXy() {
  // Retrieve the selected size and quantity
  let size = document.getElementById("sizeSelect").value;
  let quantity = parseInt(document.getElementById("quantityInput").value);

  // Perform some validation if needed

  // Add the item to the cart
  let item = {
    name: "Adidas XY",
    price: "R3000",
    size: size,
    quantity: quantity,
    image: "https://i.postimg.cc/RZFbmLx9/0ffdfd20e661b0ecb659a2e8c800825c.jpg",
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
