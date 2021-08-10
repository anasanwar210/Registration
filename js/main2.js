// SignUp variables
var SU_name = document.querySelector("#signUpForm .name"),
  SU_email = document.querySelector("#signUpForm .mail"),
  SU_password = document.querySelector("#signUpForm .password"),
  SU_signUp = document.querySelector("#signUp"),
  SU_goToSignIn = document.querySelector("#goToSignIn"),
  successMSG = document.getElementById("successMSG"),
  fillMSG = document.getElementById("fillMSG"),
  existMSG = document.getElementById("existMSG");

// SignIn variables
var LI_email = document.querySelector("#signInForm .mail"),
  LI_password = document.querySelector("#signInForm .password"),
  LI_signIn = document.querySelector("#signIn"),
  LI_goToSignUp = document.querySelector("#goToSignUp");

/*
 == SignUp Actions
*/

var userInfo;
if (localStorage.getItem("users") == null) {
  userInfo = [];
} else {
  userInfo = JSON.parse(localStorage.getItem("users"));
}

SU_signUp.onclick = function () {
  if (signupInputsValidation() == true && isExist() == false) {
    var user = {
      name: SU_name.value,
      pass: SU_password.value,
      mail: SU_email.value,
    };
    // console.log("we there guysm validation and is exist done");
    userInfo.push(user);
    localStorage.setItem("users", JSON.stringify(userInfo));
    successMSG.classList.replace("d-none", "d-block");
    fillMSG.classList.replace("d-block", "d-none");
  } else {
    localStorage.removeItem("users");
    successMSG.classList.replace("d-block", "d-none");
    fillMSG.classList.replace("d-none", "d-block");
  }
};

/*
 == Validation Inputs
*/

function signupNameValid() {
  var nameReg = /^[A-Za-z]{3,15}(\s?[A-Za-z]{3,15})?$/,
    signUpNameAlert = document.getElementById("signUpNameAlert"),
    nameReqMSG = document.getElementById("nameReqMSG");

  if (nameReg.test(SU_name.value) == true) {
    SU_name.classList.add("is-valid");
    SU_name.classList.remove("is-invalid");
    signUpNameAlert.classList.replace("d-block", "d-none"),
      nameReqMSG.classList.replace("d-block", "d-none");
    return true;
  } else {
    if (SU_name.value == "") {
      nameReqMSG.classList.replace("d-none", "d-block");
      return false;
    } else {
      nameReqMSG.classList.replace("d-block", "d-none");
      signUpNameAlert.classList.replace("d-none", "d-block");
      return false;
    }
  }
}

function signupMailValid() {
  var mailReg = /@[a-z]{5,10}(\.com)$/,
    signUpEmailAlert = document.getElementById("signUpEmailAlert"),
    emailReqMSG = document.getElementById("emailReqMSG");
  if (mailReg.test(SU_email.value) == true) {
    SU_email.classList.add("is-valid");
    SU_email.classList.remove("is-invalid");
    signUpEmailAlert.classList.replace("d-block", "d-none"),
      emailReqMSG.classList.replace("d-block", "d-none");
    return true;
  } else {
    if (SU_email.value == "") {
      emailReqMSG.classList.replace("d-none", "d-block");
    } else {
      emailReqMSG.classList.replace("d-block", "d-none");
      signUpEmailAlert.classList.replace("d-none", "d-block");
    }
  }
}

function signupPassValid() {
  var passReg = /.{8,15}$/,
    signUpPasswordAlert = document.getElementById("signUpPasswordAlert"),
    passReqMSG = document.getElementById("passReqMSG");

  if (passReg.test(SU_password.value) == true) {
    SU_password.classList.add("is-valid");
    SU_password.classList.remove("is-invalid");
    signUpPasswordAlert.classList.replace("d-block", "d-none");
    passReqMSG.classList.replace("d-block", "d-none");
    return true;
  } else {
    if (SU_password.value == "") {
      passReqMSG.classList.replace("d-none", "d-block");
    } else {
      passReqMSG.classList.replace("d-block", "d-none");
      signUpPasswordAlert.classList.replace("d-none", "d-block");
    }
  }
}

function signupInputsValidation() {
  // signupNameValid();
  // signupMailValid();
  // signupPassValid();

  if (
    signupNameValid() == true &&
    signupMailValid() == true &&
    signupPassValid() == true
  ) {
    return true;
  } else {
    return false;
  }
}

function isExist() {
  //for loop close mistake
//   console.log(userInfo);
  for (var i = 0; i < userInfo.length; i++) {
    if (userInfo[i].mail.toLowerCase() == SU_email.value.toLowerCase()) {
      SU_email.classList.remove("is-valid");
      existMSG.classList.replace("d-none", "d-block");
    //   console.log("we in isexist() true");
      return true;
    }
  }

//   console.log("we in isexist false");
  return false;
}



/*
  == Toggle Between SignIn & SignUP
*/

var signInForm = document.getElementById("signInForm"),
  signUpForm = document.getElementById("signUpForm");

LI_goToSignUp.onclick = function () {
  signUpForm.classList.add("d-block");
  signUpForm.classList.remove("d-none");
  signInForm.classList.add("d-none");
  signInForm.classList.remove("d-block");
};

SU_goToSignIn.onclick = function () {
  signInForm.classList.add("d-block");
  signInForm.classList.remove("d-none");
  signUpForm.classList.remove("d-block");
};