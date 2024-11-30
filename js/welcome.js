let signOut = document.getElementById("signOut");

let welcomeUserName = document.querySelector("span.userName");

let toggle = document.querySelector(".toggle");

if (localStorage.getItem("currentUser")) {
  welcomeUserName.innerHTML = JSON.parse(
    localStorage.getItem("currentUser")
  ).name;
}

let pathInWelcome = location.pathname;
if (pathInWelcome.endsWith("/welcome.html") && localStorage.getItem("currentUser") === null) {
  location.assign("index.html");
  console.log("Stay in index");
}
signOut.addEventListener("click", function () {
  location.replace("index.html");
  localStorage.removeItem("currentUser");
});

let stat;

if (localStorage.getItem("darkMood") !== null) {
  stat = JSON.parse(localStorage.getItem("darkMood"));
  if (stat == true) {
    document.querySelector(".sun").style.cssText = `
    opacity: 0;
    transform: translateX(-20px);
      `;
    document.querySelector(".moon").style.cssText = `
    opacity: 1;
    transform: translateX(0);
            `;
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "light");
  }
}

toggle.addEventListener("click", function (e) {
  stat = toggle.classList.toggle("true");
  localStorage.setItem("darkMood", JSON.stringify(stat));
  if (stat == true) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "light");
  }
});

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}