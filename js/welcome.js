let signOut = document.getElementById("signOut");

let welcomeUserName = document.querySelector("span.userName");

let toggle = document.querySelector(".toggle");

if (localStorage.getItem("currentUser")) {
  welcomeUserName.innerHTML = JSON.parse(
    localStorage.getItem("currentUser")
  ).name;
}

let pathInWelcome = location.pathname;
if (
  pathInWelcome.endsWith("/welcome.html") &&
  localStorage.getItem("currentUser") === null
) {
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

/*
==================================
  - Get Data From Api
==================================
*/
let cartona = ``;
let myReq = new XMLHttpRequest();
myReq.open("GET", "https://forkify-api.herokuapp.com/api/search?q=corn");
myReq.onload = function () {
  if (myReq.status === 200) {
    let meals = JSON.parse(myReq.response);
    displayMeals(meals);
    console.log(meals.recipes);
  } else {
    console.log(`Error ${myReq.status}, ${myReq.statusText}`);
  }
};
myReq.send();

function displayMeals(meals) {
  for (let i = 0; i < meals.recipes.length; i++) {
    cartona += `
        <div class="col-md-6 col-lg-4 mb-4 animate__animated animate__zoomIn" data-aos="fade-up" id="meal-card">
      <div class="card">
        <div class="card-img-overlay text-center d-flex flex-column justify-content-end overlay">
          <h5 class="text-white meal-name">${meals.recipes[i].publisher}</h5>
        </div>
        <img src="${meals.recipes[i].image_url}" class="card-img-top" alt="Meal">
      </div>
    </div>
  `;
  }
  document.getElementById("mealContainer").innerHTML = cartona;
}
