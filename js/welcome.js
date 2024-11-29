let signOut = document.getElementById("signOut");

signOut.addEventListener("click", function () {
  location.replace("index.html");
  localStorage.removeItem("currentUser")
});
