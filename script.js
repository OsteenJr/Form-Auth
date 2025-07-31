// FORM VALIDATION
// form validation elements
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirmPassword = document.getElementById("signupConfirmPassword");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const rememberMe = document.getElementById("rememberMe");
const forgotEmail = document.getElementById("forgotEmail");
const signupClear = document.getElementById("signupClear");
const loginClear = document.getElementById("loginClear");
const forgotCancel = document.getElementById("forgotCancel");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const signupPasswordToggle = document.getElementById("signupPasswordToggle");
const signupConfirmPasswordToggle = document.getElementById(
  "signupConfirmPasswordToggle"
);
const loginPasswordToggle = document.getElementById("loginPasswordToggle");
const signupUsernameError = document.getElementById("signupUsernameError");
const signupEmailError = document.getElementById("signupEmailError");
const signupPasswordError = document.getElementById("signupPasswordError");
const signupConfirmPasswordError = document.getElementById(
  "signupConfirmPasswordError"
);
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const forgotEmailError = document.getElementById("forgotEmailError");
const strengthMeter = document.getElementById("strengthMeter");

function validateUsername(username) {
  if (username.trim() === "") {
    return "Please enter Username";
  } else if (username.length < 5) {
    return "Username must be atleast 5 characters long";
  } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "Username can only contain letters and numbers!";
  }
  return "";
}

function validateEmail(email) {
  if (email.trim() === "") {
    return "Please enter your email address";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Please enter a valid email address!";
  }
  return "";
}
function validatePassword(password) {
  if (password.trim() === "") {
    return "Password cannot be empty!";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long!";
  }
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
      password
    )
  ) {
    return "Password must include uppercase, lowercase, number, and special character!";
  }
  return "";
}
function validateConfirmPassword(password, confirmPassword) {
  if (confirmPassword !== password) {
    return "Passwords do not match!";
  }
  return "";
}

function validateLoginPassword(password) {
  if (password.trim() === "") {
    return "Please enter your password!";
  }
  return "";
}
//Password Strength Meter
function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&]/.test(password)) score += 1;

  if (password.trim() === "") {
    return { text: "", class: "" };
  } else if (score <= 2) {
    return { text: "Weak", class: "weak" };
  } else if (score <= 4) {
    return { text: "Medium", class: "medium" };
  } else {
    return { text: "Strong", class: "strong" };
  }
}
function updateInputStyle(input, error, errorElement) {
  if (error) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    errorElement.textContent = error;
  } else {
    input.classList.remove("invalid");
    input.classList.add("valid");
    errorElement.textContent = "";
  }
}

// Update password strength meter
function updateStrengthMeter(password) {
  const strength = getPasswordStrength(password);
  strengthMeter.textContent = strength.text
    ? `Password Strength: ${strength.text}`
    : "";

  strengthMeter.className = `strength-meter ${strength.class}`;
}

// Toggle password visibility
function togglePasswordVisibility(input, toggle) {
  toggle.addEventListener("click", function () {
    const type = input.type === "password" ? "text" : "password";
    input.type = type;
    toggle.textContent = type === "password" ? "Show" : "Hide";
  });
}

// Simulated password hashing (for learning, not secure)
function simpleHash(password) {
  return btoa(password); // Base64 encoding for simulation
}

// Backend simulation with localStorage
function saveUser(username, email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) {
    return "Email already registered!";
  }
  users[email] = { username, email, password: simpleHash(password) };
  localStorage.setItem("users", JSON.stringify(users));
  return "";
}

function verifyUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const user = users[email];
  if (!user) {
    return "Email not found!";
  }
  if (user.password !== simpleHash(password)) {
    return "Incorrect password!";
  }
  return "";
}

// Form toggle logic
function showForm(formToShow, formToHide, buttonActive, buttonInactive) {
  formToShow.classList.remove("hidden");
  formToHide.classList.add("hidden");
  forgotPasswordForm.classList.add("hidden");
  buttonActive.classList.add("active");
  buttonActive.classList.remove("inactive");
  buttonInactive.classList.add("inactive");
  buttonInactive.classList.remove("active");
}

showSignup.addEventListener("click", function () {
  showForm(signupForm, loginForm, showSignup, showLogin);
});

showLogin.addEventListener("click", function () {
  showForm(loginForm, signupForm, showLogin, showSignup);
});

forgotPasswordLink.addEventListener("click", function (event) {
  event.preventDefault();
  signupForm.classList.add("hidden");
  loginForm.classList.add("hidden");
  forgotPasswordForm.classList.remove("hidden");
  showSignup.classList.add("inactive");
  showSignup.classList.remove("active");
  showLogin.classList.add("inactive");
  showLogin.classList.remove("active");
});

// Real-time validation for sign-up form
signupUsername.addEventListener("input", function () {
  const username = signupUsername.value;
  const error = validateUsername(username);
  updateInputStyle(signupUsername, error, signupUsernameError);
});

signupEmail.addEventListener("input", function () {
  const email = signupEmail.value;
  const error = validateEmail(email);
  updateInputStyle(signupEmail, error, signupEmailError);
});

signupPassword.addEventListener("input", function () {
  const password = signupPassword.value;
  const error = validatePassword(password);
  updateInputStyle(signupPassword, error, signupPasswordError);
  updateStrengthMeter(password);
  const confirmPassword = signupConfirmPassword.value;
  if (confirmPassword) {
    const confirmError = validateConfirmPassword(password, confirmPassword);
    updateInputStyle(
      signupConfirmPassword,
      confirmError,
      signupConfirmPasswordError
    );
  }
});

signupConfirmPassword.addEventListener("input", function () {
  const password = signupPassword.value;
  const confirmPassword = signupConfirmPassword.value;
  const error = validateConfirmPassword(password, confirmPassword);
  updateInputStyle(signupConfirmPassword, error, signupConfirmPasswordError);
});

// Real-time validation for login form
loginEmail.addEventListener("input", function () {
  const email = loginEmail.value;
  const error = validateEmail(email);
  updateInputStyle(loginEmail, error, loginEmailError);
});

loginPassword.addEventListener("input", function () {
  const password = loginPassword.value;
  const error = validateLoginPassword(password);
  updateInputStyle(loginPassword, error, loginPasswordError);
});

// Real-time validation for forgot password form
forgotEmail.addEventListener("input", function () {
  const email = forgotEmail.value;
  const error = validateEmail(email);
  updateInputStyle(forgotEmail, error, forgotEmailError);
});

// Password visibility toggles
togglePasswordVisibility(signupPassword, signupPasswordToggle);
togglePasswordVisibility(signupConfirmPassword, signupConfirmPasswordToggle);
togglePasswordVisibility(loginPassword, loginPasswordToggle);

// Sign-up form submission
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = signupUsername.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const confirmPassword = signupConfirmPassword.value;

  const usernameErrorText = validateUsername(username);
  const emailErrorText = validateEmail(email);
  const passwordErrorText = validatePassword(password);
  const confirmPasswordErrorText = validateConfirmPassword(
    password,
    confirmPassword
  );

  updateInputStyle(signupUsername, usernameErrorText, signupUsernameError);
  updateInputStyle(signupEmail, emailErrorText, signupEmailError);
  updateInputStyle(signupPassword, passwordErrorText, signupPasswordError);
  updateInputStyle(
    signupConfirmPassword,
    confirmPasswordErrorText,
    signupConfirmPasswordError
  );
  updateStrengthMeter(password);

  if (
    !usernameErrorText &&
    !emailErrorText &&
    !passwordErrorText &&
    !confirmPasswordErrorText
  ) {
    const saveError = saveUser(username, email, password);
    if (saveError) {
      signupEmailError.textContent = saveError;
      signupEmail.classList.add("invalid");
      signupEmail.classList.remove("valid");
    } else {
      alert(`Sign-Up Successful!\nUsername: ${username}\nEmail: ${email}`);
      signupForm.reset();
      signupClear.click();
    }
  }
});

// Login form submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  const emailErrorText = validateEmail(email);
  const passwordErrorText = validateLoginPassword(password);

  updateInputStyle(loginEmail, emailErrorText, loginEmailError);
  updateInputStyle(loginPassword, passwordErrorText, loginPasswordError);

  if (!emailErrorText && !passwordErrorText) {
    const loginError = verifyUser(email, password);
    if (loginError) {
      loginPasswordError.textContent = loginError;
      loginPassword.classList.add("invalid");
      loginPassword.classList.remove("valid");
    } else {
      if (rememberMe.checked) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      alert(`Login Successful!\nEmail: ${email}`);
      loginForm.reset();
      loginClear.click();
    }
  }
});

// Forgot password form submission
forgotPasswordForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = forgotEmail.value;
  const error = validateEmail(email);

  updateInputStyle(forgotEmail, error, forgotEmailError);

  if (!error) {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      alert(`Password reset email sent to ${email} (simulated).`);
      forgotPasswordForm.reset();
      forgotCancel.click();
    } else {
      forgotEmailError.textContent = "Email not found!";
      forgotEmail.classList.add("invalid");
      forgotEmail.classList.remove("valid");
    }
  }
});
// Cancel forgot password form
forgotCancel.addEventListener("click", function () {
  forgotPasswordForm.reset();
  forgotEmail.classList.remove("valid", "invalid");
  forgotEmailError.textContent = "";
  showForm(loginForm, signupForm, showLogin, showSignup);
});

// Pre-fill remembered email
window.addEventListener("load", function () {
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail) {
    loginEmail.value = rememberedEmail;
    updateInputStyle(
      loginEmail,
      validateEmail(rememberedEmail),
      loginEmailError
    );
    rememberMe.checked = true;
  }
});
