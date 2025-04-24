function verifyOTP() {
    const enteredOtp = document.getElementById("otpInput").value;
    const actualOtp = localStorage.getItem("otp");
    const spinner = document.getElementById("spinner");
    const errorText = document.getElementById("otpError");
  
    spinner.style.display = "block";
    errorText.textContent = "";
  
    setTimeout(() => {
      spinner.style.display = "none";
      if (enteredOtp === actualOtp) {
        localStorage.removeItem("otp");
        window.location.href = "index.html"; // or home page
      } else {
        errorText.textContent = "❌ Invalid OTP. Try again.";
      }
    }, 1000);
  }
  
  function resendOTP() {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Simulated OTP
    localStorage.setItem("otp", newOtp);
    showToast("✅ OTP Resent: " + newOtp); // For demo, you can remove OTP display
    console.log("Resent OTP:", newOtp); // Optional: Remove in production
  }
  
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.visibility = "visible";
  
    setTimeout(() => {
      toast.style.visibility = "hidden";
    }, 3000);
  }

  localStorage.removeItem("generatedOTP");
  