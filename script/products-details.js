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
      name: "Nike Dunk Low VI",
      price: "R1000",
      size: size,
      quantity: quantity,
      image: "https://i.postimg.cc/020VDJnF/5a1e5d72423d4c1e4021e987f26cf4f7.jpg",
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