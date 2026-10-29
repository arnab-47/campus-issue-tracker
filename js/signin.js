// signin.js
// Wires up the Sign In form: querySelector, addEventListener, preventDefault.
// There is no real backend until Day 6 (POST /api/auth/login), so this only
// validates the fields and simulates a successful login by redirecting
// to the dashboard.

const form = document.querySelector("#signin-form");
const errorBox = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;

  errorBox.classList.remove("visible");
  errorBox.textContent = "";

  if (!username || !password) {
    showError("Please enter both username and password.");
    return;
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  // Stand-in for POST /api/auth/login + bcrypt.compare, which arrives Day 6.
  console.log("Sign in submitted:", { username, password });
  window.location.href = "dashboard-cards.html";
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.add("visible");
}