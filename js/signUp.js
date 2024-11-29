/*
=============================
- Get Sign-In Inputs & BTN
=============================
*/

let signInToggle = document.getElementById("signInToggle"),
  signInForm = document.getElementById("signIn");

/*
=============================
- Get Sign-Up Inputs & BTN
=============================
*/

let signUpToggle = document.getElementById("signUpToggle"),
  signUpForm = document.getElementById("signUp"),
  signUpEmail = document.getElementById("signUpEmail"),
  signUpName = document.getElementById("signUpName"),
  signUpPassword = document.getElementById("signUpPassword"),
  signUpBtn = document.getElementById("signUpBtn"),
  signUpValidate = document.querySelector(".signUpValidate"),
  signupInputs = document.querySelectorAll(".signUp .form-floating  input"),
  success = document.getElementById("success"),
  signUpErrorMsgId = ``;

/* 
=============================================
- Toggle Button { Sign-In & Sign-Up }
=============================================
*/

signInToggle.addEventListener("click", function () {
  signInForm.classList.remove("d-none");
  signUpForm.classList.add("d-none");
  signUpToggle.classList.remove("signActive");
  this.classList.add("signActive");
});

signUpToggle.addEventListener("click", function () {
  signInForm.classList.add("d-none");
  signUpForm.classList.remove("d-none");
  signInToggle.classList.remove("signActive");
  this.classList.add("signActive");
});

/*
=============================
- Check LocalStorage When I Open Side Any Time
=============================
*/

let signUpDataContainer = [];
if (localStorage.getItem("signUp") !== null) {
  signUpDataContainer = JSON.parse(localStorage.getItem("signUp"));
}

signUpBtn.addEventListener("click", function (e) {
  if (
    validateInputs(
      signUpEmail,
      document.getElementById(`${signUpEmail.getAttribute("id")}ErrorMsg`)
    ) &&
    validateInputs(
      signUpName,
      document.getElementById(`${signUpName.getAttribute("id")}ErrorMsg`)
    ) &&
    validateInputs(
      signUpPassword,
      document.getElementById(`${signUpPassword.getAttribute("id")}ErrorMsg`)
    )
  ) {
    let signUpData = {
      signUpEmail: signUpEmail.value,
      signUpName: signUpName.value,
      signUpPassword: signUpPassword.value,
    };
    signUpDataContainer.push(signUpData);
    localStorage.setItem("signUp", JSON.stringify(signUpDataContainer));
    success.classList.remove("d-none");
    setTimeout(() => {
      location.reload();
    }, 3000);
    clearInputs("signUp");
  }
});

function clearInputs(param) {
  if (param === "signUp") {
    signUpEmail.value = null;
    signUpName.value = null;
    signUpPassword.value = null;
    // Remove Valid Classes
    signUpEmail.classList.remove("is-valid");
    signUpName.classList.remove("is-valid");
    signUpPassword.classList.remove("is-valid");
  } else if (param === "signIn") {
    signInEmail = null;
    signInPassword = null;
  }
}

signupInputs.forEach((input) => {
  if (
    document
      .getElementById(`${input.getAttribute("id")}ErrorMsg`)
      .classList.contains("d-none")
  ) {
    input.addEventListener("focus", function () {
      document
        .querySelector(`.${input.getAttribute("id")}Validate`)
        .classList.remove("d-none");
      document
        .getElementById(`${input.getAttribute("id")}ErrorMsg`)
        .classList.add("d-none");
    });
  }

  input.addEventListener("blur", function (e) {
    errorMsgId = document.getElementById(
      `${e.target.getAttribute("id")}ErrorMsg`
    );
    validateInputs(e.target, errorMsgId);
    document
      .querySelector(`.${input.getAttribute("id")}Validate`)
      .classList.add("d-none");
  });
});

function validateInputs(input, signUpErrorMsgId) {
  let re = {
    signUpEmail: /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-z]{2,12}$/,
    signUpName: /[A-z]{5,15}/,
    signUpPassword: /^(?=.*[A-Za-z0-9]).{8,16}$/,
  };
  errorMsg = document.getElementById(signUpErrorMsgId);
  if (re[input.id].test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    signUpErrorMsgId.classList.add("d-none");
    return true;
  } else {
    input.classList.add("is-invalid");
    signUpValidate.classList.add("d-none");
    input.classList.remove("is-valid");
    signUpErrorMsgId.classList.remove("d-none");
    return false;
  }
}

signUpEmail.addEventListener("blur", function (e) {
  if (
    signUpEmail !== "" &&
    validateInputs(
      signUpEmail,
      document.getElementById(`${signUpEmail.getAttribute("id")}ErrorMsg`)
    )
  ) {
    let str = signUpEmail.value;
    signUpName.value = str.slice(0, str.indexOf("@"));
  }
});
