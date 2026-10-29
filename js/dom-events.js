// dom-events.js
// Wires up the Sign Up form: querySelector, addEventListener, preventDefault.
// No backend yet (that's Day 6) — this just validates and logs to the console.

const form = document.querySelector("#signup-form");
const errorBox = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const fullname = document.querySelector("#fullname").value.trim();
  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const collegeID = document.querySelector("#college-id").value.trim();
  const role = document.querySelector("#role").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  errorBox.classList.remove("visible");
  errorBox.textContent = "";

  if (!fullname || !username || !email || !role ) {
    showError("Please fill in every field.");
    return;
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
  }

  // Stand-in for the real POST /api/auth/register call, which arrives Day 6.
  console.log("Sign up submitted:", { fullname, username, email, collegeID, role });
  alert(`Welcome, ${fullname}! (Check the console — this is where the API call goes on Day 6.)`);
  form.reset();
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.add("visible");
}