// const loginForm = document.getElementById('loginForm');
// const captchaText = document.getElementById('captchaText');
// const captchaInput = document.getElementById('captchaInput');
// const refreshCaptcha = document.getElementById('refreshCaptcha');

// // Generate captcha
// function generateCaptcha() {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let captcha = "";
//   for (let i = 0; i < 6; i++) {
//     captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   captchaText.textContent = captcha;
//   return captcha;
// }

// let currentCaptcha = generateCaptcha();
// refreshCaptcha.onclick = () => {
//   currentCaptcha = generateCaptcha();
// };

// loginForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const user = document.getElementById('loginUsername').value;
//   const pass = document.getElementById('loginPassword').value;
//   const enteredCaptcha = captchaInput.value.trim();

//   const storedPass = localStorage.getItem(user);

//   if (enteredCaptcha !== currentCaptcha) {
//     alert("❌ Captcha incorrect!");
//     return;
//   }

//   if (storedPass) {
//     if (storedPass === pass) {
//       localStorage.setItem('loggedIn', 'true');
//       localStorage.setItem('currentUser', user);
//       window.location.href = '2fa.html';
//     } else {
//       alert("❌ Incorrect password.");
//     }
//   } else {
//     localStorage.setItem(user, pass);
//     localStorage.setItem('loggedIn', 'true');
//     localStorage.setItem('currentUser', user);
//     alert("✅ Account created. Redirecting to PayMate...");
//     window.location.href = '2fa.html'; // ✅ redirect to wallet page
//   }
// }); 

const loginForm = document.getElementById('loginForm');
const captchaText = document.getElementById('captchaText');
const captchaInput = document.getElementById('captchaInput');
const refreshCaptcha = document.getElementById('refreshCaptcha');

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

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUsername').value.trim();
  const pass = document.getElementById('loginPassword').value;
  const enteredCaptcha = captchaInput.value.trim();

  if (enteredCaptcha !== currentCaptcha) {
    alert("❌ Captcha incorrect!");
    return;
  }

  const storedPass = localStorage.getItem(user);

  if (storedPass) {
    if (storedPass === pass) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentUser', user);
      window.location.href = '2fa.html';
    } else {
      alert("❌ Incorrect password.");
    }
  } else {
    alert("❌ User not found. Please sign up first.");
  }
  
  currentCaptcha = generateCaptcha();
  captchaInput.value = '';
});