let signInEmail = document.getElementById("signInEmail"),
  signInPassword = document.getElementById("signInPassword"),
  signInBtn = document.getElementById("signInBtn"),
  signInEmailErrorMsg = document.getElementById("signInEmailErrorMsg"),
  signInPasswordErrorMsg = document.getElementById("signInPasswordErrorMsg"),
  toSignUp = document.getElementById("toSignUp"),
  showPassword = document.getElementById("eye"),
  required = document.getElementById("required"),
  reqMsg = document.getElementById("reqMsg");

let currPath = location.pathname;

if (
  localStorage.getItem("currentUser")
) {
  location.assign("welcome.html");
  console.log("Go to welcome");
}

let signInDataContainer = [],
  localStatus,
  currentUser;

if (localStorage.getItem("signUp") !== null) {
  signInDataContainer = JSON.parse(localStorage.getItem("signUp"));
} else {
  localStatus = false;
}

signInBtn.addEventListener("click", function (e) {
  if (!signInEmail.value || !signInPassword.value) {
    required.classList.remove("d-none");
    toSignUp.classList.add("d-none");
    signInPasswordErrorMsg.classList.add("d-none");
    signInPassword.classList.remove("is-invalid");
  }

  if (passwordStatus && emailStatus) {
    signInEmail.classList.remove("is-valid");
    signInPassword.classList.remove("is-valid");
    signInEmail.value = null;
    signInPassword.value = null;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    location.href = "Registration/welcome.html";
  }

  if (localStatus == false) {
    if (!signInEmail.value || !signInPassword.value) {
      required.classList.remove("d-none");
      toSignUp.classList.add("d-none");
    } else if (signInEmail !== "" && signInPassword !== "") {
      required.classList.add("d-none");
      toSignUp.classList.remove("d-none");
    }
  }
});

let emailStatus;
signInEmail.addEventListener("blur", function () {
  emailStatus = false;

  if (localStatus === false) {
    signInEmailErrorMsg.classList.add("d-none");
    return;
  }

  if (!signInEmail.value) {
    signInEmailErrorMsg.classList.add("d-none");
    signInEmail.classList.remove("is-invalid");
    signInEmail.classList.remove("is-valid");
    emailStatus = false;
    return;
  }

  for (let i = 0; i < signInDataContainer.length; i++) {
    if (signInEmail.value === signInDataContainer[i].email) {
      signInEmailErrorMsg.classList.add("d-none");
      signInEmail.classList.add("is-valid");
      signInEmail.classList.remove("is-invalid");
      emailStatus = true;
      currentUser = signInDataContainer[i];
      break;
    }
  }

  if (!emailStatus) {
    signInEmailErrorMsg.classList.remove("d-none");
    signInEmail.classList.add("is-invalid");
    signInEmail.classList.remove("is-valid");
    emailStatus = false;
  }
});

let passwordStatus;
signInPassword.addEventListener("blur", function () {
  console.log(currentUser);
  if (currentUser !== undefined) {
    if (signInPassword.value === currentUser.password) {
      signInPasswordErrorMsg.classList.add("d-none");
      signInPassword.classList.remove("is-invalid");
      signInPassword.classList.add("is-valid");
      passwordStatus = true;
    } else if (signInPassword.value !== currentUser.password) {
      signInPasswordErrorMsg.classList.remove("d-none");
      signInPassword.classList.add("is-invalid");
      signInPassword.classList.remove("is-valid");
      passwordStatus = false;
    }
  }
});

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}
