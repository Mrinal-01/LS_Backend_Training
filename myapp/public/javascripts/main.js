// Retrieve user data from localStorage or initialize if not present
const storedUserData = localStorage.getItem("currentUser");
let users = storedUserData ? JSON.parse(storedUserData) : {};

if (!users.name) {
  // Initialize user data if not present
  users = {
    name: "JohnDoe",
    email: "johndoe@example.com",
    image: "./Images/default-profile.png",
    coins: 100,
    lastLoginDate: null,
    streak: 0,
  };
}

// Update user data on the page
// document.getElementById("username").innerText = `Username: ${users.name}`;
// document.getElementById("email").innerText = `Email: ${users.email}`;
// document.getElementById("profileImage").src = users.image;

// Function to calculate the difference in days between two dates
function dayDifference(date1, date2) {
  const differenceInTime = date2.getTime() - date1.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.floor(differenceInDays);
}

// Update date elements
const now = new Date();
document.getElementById("loginDate").innerText = `Login Date: ${now.toLocaleDateString()}`;
document.getElementById("loginTime").innerText = `Login Time: ${now.toLocaleTimeString()}`;
document.getElementById("date").textContent = `Login Date: ${now.toLocaleDateString()}`;

// Reward logic
function rewardCoin() {
  const coinElement = document.getElementById('coin');

  const currentDate = new Date();
  let lastLoginDate = new Date(users.lastLoginDate);
  let dateDiff = dayDifference(lastLoginDate, currentDate);

  if (!users.lastLoginDate || dateDiff === 1) {
    users.streak++;
    if (users.streak % 6 === 0) {
      users.coins += 500;
      // Additional bonus logic if needed
    } else {
      users.coins += 100;
    }
  } else if (dateDiff > 1) {
    users.streak = 1; // Reset streak if the login gap is more than 1 day
    users.coins = 100;
  }

  users.lastLoginDate = currentDate;
  coinElement.textContent = users.coins;

  // Save updated user data
  localStorage.setItem("currentUser", JSON.stringify(users));
}

// Function to handle user logout
function logOut() {
  window.location.href = "/login";
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
  });

  rewardCoin(); // Call rewardCoin function on page load to update the coin and streak
});
