// SignUp variables
var SU_name = document.querySelector("#signUpForm .name"),
  SU_email = document.querySelector("#signUpForm .mail"),
  SU_password = document.querySelector("#signUpForm .password"),
  SU_signUp = document.querySelector("#signUp"),
  SU_goToSignIn = document.querySelector("#goToSignIn"),
  successMSG = document.getElementById("successMSG"),
  fillMSG = document.getElementById("fillMSG"),
  existMSG = document.getElementById("existMSG"),
  signUpNameAlert = document.getElementById("signUpNameAlert"),
  nameReqMSG = document.getElementById("nameReqMSG"),
  signUpEmailAlert = document.getElementById("signUpEmailAlert"),
  emailReqMSG = document.getElementById("emailReqMSG"),
  signUpPasswordAlert = document.getElementById("signUpPasswordAlert"),
  passReqMSG = document.getElementById("passReqMSG");

// SignIn variables
let LI_email = document.querySelector("#signInForm .mail"),
  LI_password = document.querySelector("#signInForm .password"),
  LI_signIn = document.querySelector("#signIn"),
  LI_goToSignUp = document.querySelector("#goToSignUp");

var userInfo;
if (localStorage.getItem("users") == null) {
  userInfo = [];
} else {
  userInfo = JSON.parse(localStorage.getItem("users"));
}

/*
 ====> SignUp Actions
*/
SU_signUp.onclick = function () {
  if (signupInputsValidation() == true && isExist() == false) {
    var user = {
      name: SU_name.value,
      pass: SU_password.value,
      mail: SU_email.value,
    };
    userInfo.push(user);
    localStorage.setItem("users", JSON.stringify(userInfo));
    successMSG.classList.replace("d-none", "d-block");
    fillMSG.classList.replace("d-block", "d-none");
  } else {
    // localStorage.removeItem("users");
    successMSG.classList.replace("d-block", "d-none");
    fillMSG.classList.replace("d-none", "d-block");
  }
};

/*
 ====> Validation Inputs  (Name , Mail , Pass)
*/

function signupNameValid() {
  const nameReg = /^[A-Za-z]{3,15}(\s?[A-Za-z]{3,15})?$/;

  if (nameReg.test(SU_name.value) == true) {
    SU_name.classList.add("is-valid");
    SU_name.classList.remove("is-invalid");
    signUpNameAlert.classList.replace("d-block", "d-none"),
    nameReqMSG.classList.replace("d-block", "d-none");
    return true;
  } else {
    if (SU_name.value == "") {
      nameReqMSG.classList.replace("d-none", "d-block");
      existMSG.classList.replace("d-block", "d-none");
      return false;
    } else {
      nameReqMSG.classList.replace("d-block", "d-none");
      signUpNameAlert.classList.replace("d-none", "d-block");
      return false;
    }
  }
}

function signupMailValid() {
  const mailReg = /@[a-z]{5,10}(\.com)$/;

  if (mailReg.test(SU_email.value) == true) {
    SU_email.classList.add("is-valid");
    SU_email.classList.remove("is-invalid");
    signUpEmailAlert.classList.replace("d-block", "d-none");
    emailReqMSG.classList.replace("d-block", "d-none");
    existMSG.classList.replace("d-block", "d-none");
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
  const passReg = /.{8,15}$/;

  if (passReg.test(SU_password.value) == true) {
    SU_password.classList.add("is-valid");
    SU_password.classList.remove("is-invalid");
    signUpPasswordAlert.classList.replace("d-block", "d-none");
    passReqMSG.classList.replace("d-block", "d-none");
    existMSG.classList.replace("d-block", "d-none");
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
  signupNameValid();
  signupMailValid();
  signupPassValid();

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

/*
 ====> IsExist function
*/

function isExist() {
  for (var i = 0; i < userInfo.length; i++) {
    if (userInfo[i].mail.toLowerCase() == SU_email.value.toLowerCase()) {
      SU_email.classList.remove("is-valid");
      existMSG.classList.replace("d-none", "d-block");
      return true;
    }
  }
  return false;
}

/*
  ====> Hide (name,mail,pass) errorsMSG onKeydown
*/

SU_name.onkeydown = function () {
  signUpNameAlert.classList.replace("d-block", "d-none");
  nameReqMSG.classList.replace("d-block", "d-none");
};

SU_email.onkeydown = function () {
  signUpEmailAlert.classList.replace("d-block", "d-none");
  emailReqMSG.classList.replace("d-block", "d-none");
  existMSG.classList.replace("d-block", "d-none");
};

SU_password.onkeydown = function () {
  signUpPasswordAlert.classList.replace("d-block", "d-none");
  passReqMSG.classList.replace("d-block", "d-none");
};

LI_signIn.onclick = function () {
  let filledMSG = document.getElementById("filledMSG"),
    notRightMSG = document.querySelector("#notRightMSG");
  if (LI_email.value == "" || LI_password.value == "") {
    filledMSG.classList.replace("d-none", "d-block");
    notRightMSG.classList.replace("d-block", "d-none");
    console.log("signin if false");
    return false;
  }
  for (var i = 0; i < userInfo.length; i++) {
    if (
      userInfo[i].mail.toLowerCase() == LI_email.value.toLowerCase() &&
      userInfo[i].pass.toLowerCase() == LI_password.value.toLowerCase()
    ) {
      localStorage.setItem("genUserName", userInfo[i].name);
      notRightMSG.classList.replace("d-block", "d-none");
      location.assign("welcome.html");
      break;
    } else {
      notRightMSG.classList.replace("d-none", "d-block");
      filledMSG.classList.replace("d-block", "d-none");
    }
  }
};

function getUserName() {
  var userName = localStorage.getItem("genUserName");
  var welcomeUser = document.getElementById("welcomeUser");
  welcomeUser.innerHTML = `welcome ${userName}`;
}

function logOut() {
  localStorage.removeItem("genUserName");
  location.replace("index.html");
}

/*
  ====> Toggle Between SignIn & SignUP
*/

var signInForm = document.getElementById("signInForm"),
  signUpForm = document.getElementById("signUpForm");

LI_goToSignUp.onclick = function () {
  signUpForm.classList.add("d-block");
  signUpForm.classList.remove("d-none");
  signInForm.classList.add("d-none");
  signInForm.classList.remove("d-block");
};

SU_goToSignIn.onclick = function go2signIn() {
  signInForm.classList.add("d-block");
  signInForm.classList.remove("d-none");
  signUpForm.classList.remove("d-block");
};
