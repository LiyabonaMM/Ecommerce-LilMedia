  // Function to toggle the menu
  function menutoggle() {
    let menuItems = document.getElementById("MenuItems");
    if (menuItems.style.maxHeight == "0px") {
      menuItems.style.maxHeight = "200px";
    } else {
      menuItems.style.maxHeight = "0px";
    }
  }

  // Function to handle the "Add to Cart" action
  function addToCart() {
    // Retrieve the selected size and quantity
    let size = document.getElementById("sizeSelect").value;
    let quantity = parseInt(document.getElementById("quantityInput").value);

    // Perform some validation if needed

    // Add the item to the cart
    let item = {
      name: "New Balance 530",
      price: "R1500",
      size: size,
      quantity: quantity,
      image: "https://i.postimg.cc/7LQ5cDMw/afdabda8f35bf5ec67cffd64256c6556.jpg",
    };

    // Retrieve existing cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the new item to the cart
    cartItems.push(item);

    // Store the updated cart items in local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Redirect the user to the cart page
    window.location.href = "cart.html";
  }