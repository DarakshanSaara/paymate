// document.addEventListener("DOMContentLoaded", function () {
//   // Debug check
//   console.log("Checking for wallet address...");
  
//   const publicKey = localStorage.getItem("publicKey");
//   const publicKeyDisplay = document.getElementById("publicKeyDisplay");
//   const qrCodeContainer = document.getElementById("qrCodeContainer");

//   if (publicKey && publicKey.startsWith("G")) { // Check if it looks like a Stellar address
//     console.log("Valid wallet address found:", publicKey);
//     publicKeyDisplay.textContent = publicKey;
    
//     // Generate QR code
//     try {
//       qrCodeContainer.innerHTML = ""; // Clear previous
//       new QRCode(qrCodeContainer, {
//         text: publicKey,
//         width: 200,
//         height: 200,
//         colorDark: "#000000",
//         colorLight: "#ffffff",
//         correctLevel: QRCode.CorrectLevel.H
//       });
//     } catch (error) {
//       console.error("QR code generation failed:", error);
//       qrCodeContainer.innerHTML = "<p>Could not generate QR code</p>";
//     }
    
//   } else {
//     console.warn("No valid wallet address found");
//     publicKeyDisplay.textContent = "No wallet found. Please set it up.";
//     qrCodeContainer.innerHTML = "<p>Please set up your wallet first</p>";
    
//     // Show setup button if no wallet exists
//     const setupBtn = document.createElement("button");
//     setupBtn.textContent = "🛠️ Set Up Wallet";
//     setupBtn.onclick = () => window.location.href = "setup.html";
//     publicKeyDisplay.after(setupBtn);
//   }
// });

// function copyPublicKey() {
//   const publicKey = localStorage.getItem("publicKey");
//   if (publicKey && publicKey.startsWith("G")) {
//     navigator.clipboard.writeText(publicKey)
//       .then(() => alert("Wallet address copied to clipboard!"))
//       .catch(err => {
//         console.error("Copy failed:", err);
//         alert("Failed to copy. Please try again.");
//       });
//   } else {
//     alert("No wallet address available to copy!");
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  const publicKey = localStorage.getItem("publicKey");
  const publicKeyDisplay = document.getElementById("publicKeyDisplay");
  const qrCodeContainer = document.getElementById("qrCodeContainer");
  const amountInput = document.getElementById("requestAmount");
  const generateBtn = document.getElementById("generateRequestBtn");

  function generateQRCode(uri) {
    qrCodeContainer.innerHTML = ""; // Clear previous
    try {
      new QRCode(qrCodeContainer, {
        text: uri,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    } catch (error) {
      console.error("QR code generation failed:", error);
      qrCodeContainer.innerHTML = "<p>Could not generate QR code</p>";
    }
  }

  if (publicKey && publicKey.startsWith("G")) {
    publicKeyDisplay.textContent = publicKey;
    generateQRCode(publicKey); // Default QR without amount

    generateBtn.addEventListener("click", () => {
      const amount = parseFloat(amountInput.value.trim());
      if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      const uri = `stellar:${publicKey}?amount=${amount}`;
      generateQRCode(uri);
    });
  } else {
    publicKeyDisplay.textContent = "No wallet found. Please set it up.";
    qrCodeContainer.innerHTML = "<p>Please set up your wallet first</p>";

    const setupBtn = document.createElement("button");
    setupBtn.textContent = "🛠️ Set Up Wallet";
    setupBtn.onclick = () => window.location.href = "setup.html";
    publicKeyDisplay.after(setupBtn);
  }
});

function copyPublicKey() {
  const publicKey = localStorage.getItem("publicKey");
  if (publicKey && publicKey.startsWith("G")) {
    navigator.clipboard.writeText(publicKey)
      .then(() => alert("Wallet address copied to clipboard!"))
      .catch(err => {
        console.error("Copy failed:", err);
        alert("Failed to copy. Please try again.");
      });
  } else {
    alert("No wallet address available to copy!");
  }
}
