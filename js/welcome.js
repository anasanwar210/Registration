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
- Get Meals From Api
==================================
*/

getAllMeals("pizza");

function getAllMeals(term) {
  let myReq = new XMLHttpRequest();
  myReq.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${term}`);
  myReq.send();
  myReq.onload = function () {
    if (myReq.status === 200) {
      let meals = JSON.parse(myReq.response);
      displayMeals(meals);
      console.log(meals.recipes);
    } else {
      console.log(`Error: ${myReq.status}, ${myReq.statusText}`);
    }
  };
}

/*
==================================
- Display Meals
==================================
*/
function displayMeals(meals) {
  let mealContainer = document.getElementById("mealContainer"),
    container = ``;
  for (let i = 0; i < meals.recipes.length; i++) {
    container += `
  <div class="col-md-6 col-lg-4 mb-4 animate__animated animate__zoomIn" data-aos="fade-up" id="meal-card">
    <div class="card">
      <div class="card-img-overlay text-center d-flex flex-column justify-content-end overlay">
        <h5 class="text-white meal-name">${meals.recipes[i].title}</h5>
      </div>
      <img src="${meals.recipes[i].image_url}" class="card-img-top" alt="Meal">
    </div>
    </div>
    `;
  }
  mealContainer.innerHTML = container;
}

/*
==================================
- Search For Meal
==================================
*/

let searchInput = document.getElementById("searchInput"),
  searchBtn = document.getElementById("searchBtn");

searchInput.addEventListener("input", function (e) {
  let txt = searchInput.value;
  console.log(txt);
  getAllMeals(txt);
});

let items = [
  "carrot",
  "broccoli",
  "asparagus",
  "cauliflower",
  "corn",
  "cucumber",
  "green pepper",
  "lettuce",
  "mushrooms",
  "onion",
  "potato",
  "pumpkin",
  "red pepper",
  "tomato",
  "beetroot",
  "brussel sprouts",
  "peas",
  "zucchini",
  "radish",
  "sweet potato",
  "artichoke",
  "leek",
  "cabbage",
  "celery",
  "chili",
  "garlic",
  "basil",
  "coriander",
  "parsley",
  "dill",
  "rosemary",
  "oregano",
  "cinnamon",
  "saffron",
  "green bean",
  "bean",
  "chickpea",
  "lentil",
  "apple",
  "apricot",
  "avocado",
  "banana",
  "blackberry",
  "blackcurrant",
  "blueberry",
  "boysenberry",
  "cherry",
  "coconut",
  "fig",
  "grape",
  "grapefruit",
  "kiwifruit",
  "lemon",
  "lime",
  "lychee",
  "mandarin",
  "mango",
  "melon",
  "nectarine",
  "orange",
  "papaya",
  "passion fruit",
  "peach",
  "pear",
  "pineapple",
  "plum",
  "pomegranate",
  "quince",
  "raspberry",
  "strawberry",
  "watermelon",
  "salad",
  "pizza",
  "pasta",
  "popcorn",
  "lobster",
  "steak",
  "bbq",
  "pudding",
  "hamburger",
  "pie",
  "cake",
  "sausage",
  "tacos",
  "kebab",
  "poutine",
  "seafood",
  "chips",
  "fries",
  "masala",
  "paella",
  "som tam",
  "chicken",
  "toast",
  "marzipan",
  "tofu",
  "ketchup",
  "hummus",
  "chili",
  "maple syrup",
  "parma ham",
  "fajitas",
  "champ",
  "lasagna",
  "poke",
  "chocolate",
  "croissant",
  "arepas",
  "bunny chow",
  "pierogi",
  "donuts",
  "rendang",
  "sushi",
  "ice cream",
  "duck",
  "curry",
  "beef",
  "goat",
  "lamb",
  "turkey",
  "pork",
  "fish",
  "crab",
  "bacon",
  "ham",
  "pepperoni",
  "salami",
  "ribs",
];
let options = ``;
for (let i = 0; i < items.length; i++) {
  options += `
  <option value="${items[i]}">
  `;
}
document.getElementById("foodList").innerHTML = options;
