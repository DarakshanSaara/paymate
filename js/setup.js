// document.addEventListener("DOMContentLoaded", function() {
//     const setupForm = document.getElementById("walletSetupForm");
    
//     setupForm.addEventListener("submit", function(e) {
//       e.preventDefault();
//       const publicKey = document.getElementById("publicKeyInput").value.trim();
      
//       if (publicKey.startsWith("G") && publicKey.length > 55) {
//         localStorage.setItem("publicKey", publicKey);
//         alert("Wallet address saved successfully!");
//         window.location.href = "receive.html";
//       } else {
//         alert("Please enter a valid Stellar public key (starts with 'G')");
//       }
//     });
//   });

//   // Example toggle function
// function toggleTheme() {
//   if (document.body.classList.contains('light-theme')) {
//     document.body.classList.replace('light-theme', 'dark-theme');
//     localStorage.setItem('theme', 'dark');
//   } else {
//     document.body.classList.replace('dark-theme', 'light-theme');
//     localStorage.setItem('theme', 'light');
//   }
// }

document.addEventListener("DOMContentLoaded", function() {
  const setupForm = document.getElementById("walletSetupForm");
  
  setupForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const publicKey = document.getElementById("publicKeyInput").value.trim();
      
      // Improved Stellar public key validation
      if (/^G[0-9A-Z]{55}$/.test(publicKey)) {
          localStorage.setItem("publicKey", publicKey);
          alert("Wallet address saved successfully!");
          window.location.href = "receive.html";
      } else {
          alert("Please enter a valid Stellar public key:\n" +
                "- Must start with 'G'\n" +
                "- Must be exactly 56 characters long\n" +
                "- Can only contain numbers and uppercase letters");
      }
  });

  // Initialize theme from localStorage if needed
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme + "-theme");
});

// Improved toggle function with initialization
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('light-theme')) {
      body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark');
  } else {
      body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light');
  }
}