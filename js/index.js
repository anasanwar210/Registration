let signInEmail = document.getElementById("signInEmail"),
  signInPassword = document.getElementById("signInPassword"),
  signInBtn = document.getElementById("signInBtn"),
  signInEmailErrorMsg = document.getElementById("signInEmailErrorMsg"),
  signInPasswordErrorMsg = document.getElementById("signInPasswordErrorMsg"),
  toSignUp = document.getElementById("toSignUp"),
  showPassword = document.getElementById("eye"),
  required = document.getElementById("required"),
  reqMsg = document.getElementById("reqMsg");

let signInDataContainer = [];
if (localStorage.getItem("signUp") !== null) {
  signInDataContainer = JSON.parse(localStorage.getItem("signUp"));
}

signInBtn.addEventListener("click", function (e) {
  console.log(signInEmail.value);
  console.log(signInPassword.value);
  console.log(signInDataContainer);
  if (signInEmail.value == "" || signInPassword.value == "") {
    required.classList.remove("d-none");
  }
  if (signInEmail.value !== "" && signInPassword !== "") {
    if ((localStorage.getItem("signUp") == null)) {
      toSignUp.classList.remove("d-none");
      required.classList.add("d-none");
    } else {
      for (let i = 0; i < signInDataContainer.length; i++) {
        if (
          signInEmail.value === signInDataContainer[i].signUpEmail &&
          signInPassword.value === signInDataContainer[i].signUpPassword
        ) {
          localStorage.setItem("currentUser" , JSON.stringify(signInDataContainer[i]))
          console.log("Good");
          required.classList.add("d-none");
        }
      }
    }
  }
  console.log(signInDataContainer);
});

let emailStatus;
(function email() {
  signInEmail.addEventListener("blur", function () {
    for (let i = 0; i < signInDataContainer.length; i++) {
      if (
        this.value !== signInDataContainer[i].signUpEmail &&
        this.value !== ""
      ) {
        toSignUp.classList.add("d-none");
        signInEmailErrorMsg.classList.remove("d-none");
        reqMsg.classList.add("d-none");
      } else if (this.value === signInDataContainer[i].signUpEmail) {
        toSignUp.classList.add("d-none");
        signInEmailErrorMsg.classList.add("d-none");
        reqMsg.classList.add("d-none");
      }
    }
  });
})();

let passwordStatus;
(function password() {
  signInPassword.addEventListener("blur", function () {
    if (signInEmail.value === "") {
      return reqMsg.classList.remove("d-none");
    }
    for (let i = 0; i < signInDataContainer.length; i++) {
      if (
        this.value !== "" &&
        this.value !== signInDataContainer[i].signUpPassword
      ) {
        toSignUp.classList.add("d-none");
        signInPasswordErrorMsg.classList.remove("d-none");
      } else if (this.value === signInDataContainer[i].signUpPassword)
        signInPasswordErrorMsg.classList.add("d-none");
    }
  });
})();
