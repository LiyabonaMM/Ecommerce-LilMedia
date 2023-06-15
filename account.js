// Function to show an error message
function showError(message) {
  // Create an error element
  let errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;

  // Append the error element to the form
  document.querySelector(".login-form").appendChild(errorElement);

  // Remove the error element after a certain time period (e.g., 5 seconds)
  setTimeout(function () {
    errorElement.remove();
  }, 5000);
}

// Login form submit event
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting

  // Get the values entered by the user
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Replace the following email and password with your desired values
  let desiredEmail = "mxhalisalm@gmail.com";
  let desiredPassword = "mxhalisalm";

  // Perform a check using the exact values
  if (email === desiredEmail && password === desiredPassword) {
    // Redirect to the admin page if login is successful
    window.location.href = "admin.html";
  } else {
    // Show an error message if login is unsuccessful
    showError("Invalid email or password. Please try again.");
  }
});

// Run the code after the DOM content has been loaded
document.addEventListener("DOMContentLoaded", function () {
  // Code to be executed
});
