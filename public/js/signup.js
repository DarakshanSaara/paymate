const signupForm = document.getElementById('signupForm');
const captchaText = document.getElementById('signupCaptchaText');
const captchaInput = document.getElementById('signupCaptchaInput');
const refreshCaptcha = document.getElementById('refreshSignupCaptcha');

function generateCaptcha() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  captchaText.textContent = captcha;
  return captcha;
}

let currentCaptcha = generateCaptcha();
refreshCaptcha.onclick = () => {
  currentCaptcha = generateCaptcha();
};

signupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('signupUsername').value.trim();
  const pass = document.getElementById('signupPassword').value;
  const confirmPass = document.getElementById('confirmPassword').value;
  const enteredCaptcha = captchaInput.value.trim();

  // Validate inputs
  if (enteredCaptcha !== currentCaptcha) {
    alert("❌ Captcha incorrect!");
    return;
  }

  if (pass !== confirmPass) {
    alert("❌ Passwords don't match!");
    return;
  }

  if (pass.length < 6) {
    alert("❌ Password must be at least 6 characters!");
    return;
  }

  if (localStorage.getItem(user)) {
    alert("❌ Username already exists!");
    return;
  }

  // Create new account
  localStorage.setItem(user, pass);
  alert("✅ Account created successfully! Redirecting to login...");
  
  // Clear form
  signupForm.reset();
  currentCaptcha = generateCaptcha();
  
  // Redirect to login page after short delay
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 1500);
});