// Form validation
const contactForm = document.getElementById('contactForm');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

contactForm.addEventListener('submit', (e) => {
  let isValid = true;

  // Reset error messages
  emailError.textContent = '';
  messageError.textContent = '';

  // Email validation
  const emailValue = emailInput.value.trim();
  if (!emailValue) {
    emailError.textContent = 'Please enter an email address';
    isValid = false;
  }

  // Message validation
  const messageValue = messageInput.value.trim();
  if (!messageValue) {
    messageError.textContent = 'Please enter a message';
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault(); // Prevent form submission if there are errors
  }
});
