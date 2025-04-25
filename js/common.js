// // Stellar Server Connection
// const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// // Use stored or fallback keys
// const publicKey = localStorage.getItem("publicKey") || "GAP2CGWD2XI26RIAEQ5SP5KCNKYV55UVYOJZZE2L74P2UTRVH36RXEN4";
// const secretKey = "SD6AKIS7QAVJ4CAIKO5P53ACNCI5KLELS5Z6JSJ3G3Z6SBXS5XJWENME";
// const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);

// // Fetch Balance
// async function fetchBalance(balanceSpan, lastUpdated) {
//   if (!publicKey) {
//     if (balanceSpan) balanceSpan.textContent = "No wallet found";
//     return;
//   }

//   try {
//     const account = await server.loadAccount(publicKey);
//     const balanceObj = account.balances.find(b => b.asset_type === "native");

//     if (balanceSpan && balanceObj) {
//       balanceSpan.textContent = `${balanceObj.balance} XLM`;
//       if (lastUpdated) {
//         lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
//       }
//     }
//   } catch (err) {
//     console.error("Error fetching balance:", err);
//     if (balanceSpan) balanceSpan.textContent = "Error loading";
//   }
// }

// // Fetch Transaction History
// async function fetchBlockchainHistory(publicKey) {
//   try {
//     const payments = await server.payments()
//       .forAccount(publicKey)
//       .order("desc")
//       .limit(10)
//       .call();

//       // localStorage.setItem("transactionHistory", JSON.stringify(transactionsFromFirebase));

//     const container = document.getElementById("blockchainHistory");
//     if (!container) return;

//     container.innerHTML = `<h3>🔗 Blockchain Transactions</h3>`;

//     payments.records.forEach(tx => {
//       if (tx.type === "payment" && tx.asset_type === "native") {
//         const row = document.createElement("div");
//         row.className = "history-row";
//         row.innerHTML = `
//           <p><strong>From:</strong> ${tx.from}</p>
//           <p><strong>To:</strong> ${tx.to}</p>
//           <p><strong>Amount:</strong> ${tx.amount} XLM</p>
//           <p><strong>Date:</strong> ${new Date(tx.created_at).toLocaleString()}</p>
//           <p><strong>Txn Hash:</strong> <a href="https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}" target="_blank">${tx.transaction_hash}</a></p>
//           <hr>
//         `;
//         container.appendChild(row);
//       }
//     });

//     localStorage.setItem("transactionHistory", JSON.stringify(payments.records));
//   } catch (err) {
//     console.error("Error fetching transaction history:", err);
//   }
// }

// // Export Transaction History
// function exportHistory() {
//   const historyData = localStorage.getItem("transactionHistory");
//   if (!historyData) {
//     alert("No history found to export.");
//     return;
//   }

//   const blob = new Blob([historyData], { type: "application/json" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "PayMate_History_Backup.json";
//   document.body.appendChild(a);
//   a.click();
//   URL.revokeObjectURL(url);
//   a.remove();

//   alert("✅ Your history file has been downloaded!");
// }

// // DOM Ready
// document.addEventListener("DOMContentLoaded", () => {
//   const balanceSpan = document.getElementById("balance");
//   const lastUpdated = document.getElementById("lastUpdated");
//   const walletALink = document.getElementById("walletALink");
//   const walletBLink = document.getElementById("walletBLink");
//   const exportBtn = document.getElementById("exportHistoryBtn");
//   const toggle = document.getElementById("themeToggle");

//   if (balanceSpan) fetchBalance(balanceSpan, lastUpdated);
//   if (publicKey && document.getElementById("blockchainHistory")) {
//     fetchBlockchainHistory(publicKey);
//   }

//   const savedTheme = localStorage.getItem("theme") || "dark";
//   if (!document.body.classList.contains("light-theme") && !document.body.classList.contains("dark-theme")) {
//     document.body.classList.add(`${savedTheme}-theme`);
//   }

//   if (toggle) {
//     toggle.checked = savedTheme === "light";
//     toggle.addEventListener("change", () => {
//       document.body.classList.toggle("dark-theme");
//       document.body.classList.toggle("light-theme");
//       const newTheme = toggle.checked ? "light" : "dark";
//       localStorage.setItem("theme", newTheme);
//     });
//   }

//   const walletA = publicKey;
//   const walletB = "GCQKOYQEWA667YNXRWT44T4YRDPK7CUQPCBEQBR6DYIJV7M32HEVDPA7";

//   if (walletALink) {
//     if (walletA && walletA.startsWith("G")) {
//       walletALink.innerHTML = `
//         Wallet A: <a href="https://stellar.expert/explorer/testnet/account/${walletA}" target="_blank">
//           View on StellarExpert 🔗</a>
//       `;
//     } else {
//       walletALink.textContent = "Wallet A: Not available.";
//     }
//   }

//   if (walletBLink) {
//     if (walletB && walletB.startsWith("G")) {
//       walletBLink.innerHTML = `
//         Wallet B: <a href="https://stellar.expert/explorer/testnet/account/${walletB}" target="_blank">
//           View on StellarExpert 🔗</a>
//       `;
//     } else {
//       walletBLink.textContent = "Wallet B: Not available.";
//     }
//   }

//   if (exportBtn) {
//     exportBtn.addEventListener("click", exportHistory);
//   }
// });

// // Save transaction to Firebase Firestore
// function saveTransactionToFirebase(sender, receiver, amount) {
//   myDb.collection("transactions").add({
//     sender: sender,
//     receiver: receiver,
//     amount: parseFloat(amount),
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   })
//   .then(() => {
//     console.log("Transaction saved to Firebase!");
//   })
//   .catch((error) => {
//     console.error("Error saving transaction to Firebase:", error);
//   });
// }

// function logout() {
//   localStorage.removeItem('loggedIn');
//   localStorage.removeItem('currentUser');
//   window.location.href = 'home.html';
// }

// window.addEventListener('load', () => {
//   // Check for Stellar SDK
//   if (typeof StellarSdk === 'undefined') {
//     console.error("❌ StellarSdk is not loaded. Include the Stellar SDK script before this file.");
//     const dependentEls = document.querySelectorAll('.stellar-dependent');
//     dependentEls.forEach(el => {
//       el.style.display = 'none';
//       el.innerHTML = '<p class="error">Wallet features disabled - Stellar SDK not loaded</p>';
//     });
//     return;
//   }

//   // Initialize Firebase if available
//   if (typeof firebase === 'undefined') {
//     console.warn("⚠️ Firebase not loaded - skipping Firebase setup.");
//   } else if (!firebase.apps.length) {
//     firebase.initializeApp({
//       apiKey: "AIzaSyCy8onPnPTKTFMd5Nu6ASzbwgyMlyWr0YM",
//       authDomain: "paymate-e7be4.firebaseapp.com",
//       projectId: "paymate-e7be4",
//       storageBucket: "paymate-e7be4.appspot.com",
//       messagingSenderId: "816503320540",
//       appId: "1:816503320540:web:2a69855b7b787606b62919",
//       measurementId: "G-4SC4SBST3S"
//     });
//   }

//   window.myDb = firebase?.firestore?.();
//   initializeStellar();
// });

// function initializeStellar() {
//   try {
//     const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
//     const publicKey = localStorage.getItem("publicKey") || "GAP2CGWD2XI26RIAEQ5SP5KCNKYV55UVYOJZZE2L74P2UTRVH36RXEN4";
//     const secretKey = localStorage.getItem("secretKey") || "SD6AKIS7QAVJ4CAIKO5P53ACNCI5KLELS5Z6JSJ3G3Z6SBXS5XJWENME";

//     if (!publicKey || !secretKey) {
//       console.error("❌ Public or Secret key missing.");
//       return;
//     }

//     const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);

//     // Theme management
//     function setupThemeToggle() {
//       const toggle = document.getElementById("themeToggle");
//       if (!toggle) return;

//       // Set initial theme from localStorage or default to dark
//       const savedTheme = localStorage.getItem("theme") || "dark";
//       document.body.classList.add(`${savedTheme}-theme`);
//       toggle.checked = savedTheme === "light";

//       // Theme toggle handler
//       toggle.addEventListener("change", () => {
//         if (toggle.checked) {
//           document.body.classList.replace('dark-theme', 'light-theme');
//           localStorage.setItem("theme", "light");
//         } else {
//           document.body.classList.replace('light-theme', 'dark-theme');
//           localStorage.setItem("theme", "dark");
//         }
//       });
//     }

//     // Balance fetching
//     async function fetchBalance(span, timestampEl) {
//       try {
//         const account = await server.loadAccount(publicKey);
//         const nativeBalance = account.balances.find(b => b.asset_type === "native");

//         if (span && nativeBalance) {
//           span.textContent = `${parseFloat(nativeBalance.balance).toFixed(2)} XLM`;
//           if (timestampEl) {
//             timestampEl.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
//           }
//         }
//       } catch (err) {
//         console.error("❌ Error fetching balance:", err);
//         if (span) span.textContent = "Error loading";
//       }
//     }

//     // Transaction history
//     async function fetchBlockchainHistory(pubKey) {
//       try {
//         const container = document.getElementById("blockchainHistory");
//         if (!container) return;

//         const payments = await server.payments().forAccount(pubKey).order("desc").limit(10).call();

//         container.innerHTML = `<h3>🔗 Blockchain Transactions</h3>`;

//         if (payments.records.length === 0) {
//           container.innerHTML += `<p>No transactions found.</p>`;
//           return;
//         }

//         payments.records.forEach(tx => {
//           if (tx.type === "payment" && tx.asset_type === "native") {
//             const txDiv = document.createElement("div");
//             txDiv.className = "history-row";
//             txDiv.innerHTML = `
//               <p><strong>From:</strong> ${tx.from}</p>
//               <p><strong>To:</strong> ${tx.to}</p>
//               <p><strong>Amount:</strong> ${tx.amount} XLM</p>
//               <p><strong>Date:</strong> ${new Date(tx.created_at).toLocaleString()}</p>
//               <p><strong>Txn Hash:</strong> <a href="https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}" target="_blank">${tx.transaction_hash.slice(0, 12)}...</a></p>
//               <hr>
//             `;
//             container.appendChild(txDiv);
//           }
//         });

//         localStorage.setItem("transactionHistory", JSON.stringify(payments.records));
//       } catch (err) {
//         console.error("❌ Error fetching transaction history:", err);
//         const container = document.getElementById("blockchainHistory");
//         if (container) {
//           container.innerHTML = `<h3>🔗 Blockchain Transactions</h3><p class="error">Error loading transactions</p>`;
//         }
//       }
//     }

//     // Export history
//     function exportHistory() {
//       const historyData = localStorage.getItem("transactionHistory");
//       if (!historyData) return alert("No history found to export.");

//       const blob = new Blob([historyData], { type: "application/json" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `PayMate_History_${new Date().toISOString().split('T')[0]}.json`;
//       document.body.appendChild(a);
//       a.click();
//       setTimeout(() => {
//         URL.revokeObjectURL(url);
//         a.remove();
//       }, 100);
//       alert("✅ Your transaction history has been downloaded!");
//     }

//     // Setup wallet links
//     function setupWalletLinks() {
//       const walletALink = document.getElementById("walletALink");
//       const walletBLink = document.getElementById("walletBLink");
//       const walletB = "GCQKOYQEWA667YNXRWT44T4YRDPK7CUQPCBEQBR6DYIJV7M32HEVDPA7";

//       if (walletALink && publicKey) {
//         walletALink.innerHTML = `Wallet A: <a href="https://stellar.expert/explorer/testnet/account/${publicKey}" target="_blank">${publicKey.slice(0, 4)}...${publicKey.slice(-4)} 🔗</a>`;
//       }

//       if (walletBLink) {
//         walletBLink.innerHTML = `Wallet B: <a href="https://stellar.expert/explorer/testnet/account/${walletB}" target="_blank">${walletB.slice(0, 4)}...${walletB.slice(-4)} 🔗</a>`;
//       }
//     }

//     // Initialize everything when DOM is ready
//     document.addEventListener("DOMContentLoaded", () => {
//       setupThemeToggle();
//       setupWalletLinks();

//       const balanceSpan = document.getElementById("balance");
//       const lastUpdated = document.getElementById("lastUpdated");
//       const exportBtn = document.getElementById("exportHistoryBtn");

//       if (balanceSpan) {
//         fetchBalance(balanceSpan, lastUpdated);
//         setInterval(() => fetchBalance(balanceSpan, lastUpdated), 30000);
//       }

//       if (publicKey && document.getElementById("blockchainHistory")) {
//         fetchBlockchainHistory(publicKey);
//       }

//       if (exportBtn) {
//         exportBtn.addEventListener("click", exportHistory);
//       }
//     });

//   } catch (error) {
//     console.error("❌ Error initializing Stellar:", error);
//   }
// }

// // Firebase transaction saving
// function saveTransactionToFirebase(sender, receiver, amount, memo = "") {
//   if (!window.myDb) {
//     console.warn("⚠️ Firebase unavailable. Skipping save.");
//     return;
//   }

//   window.myDb.collection("transactions").add({
//     sender,
//     receiver,
//     amount: parseFloat(amount),
//     memo,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   }).then(() => {
//     console.log("✅ Transaction saved to Firebase.");
//   }).catch(err => {
//     console.error("❌ Error saving transaction:", err);
//   });
// }

// // Logout function
// function logout() {
//   localStorage.clear();
//   window.location.href = "home.html";
// }

// // Expose functions to global scope
// window.saveTransactionToFirebase = saveTransactionToFirebase;
// window.logout = logout;
// window.fetchBalance = function() {
//   const balanceSpan = document.getElementById("balance");
//   const lastUpdated = document.getElementById("lastUpdated");
//   if (balanceSpan) {
//     initializeStellar(); // Reinitialize to get fresh balance
//   }
// };




// Stellar Server Connection
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Use stored or fallback keys
const publicKey = localStorage.getItem("publicKey") || "GAP2CGWD2XI26RIAEQ5SP5KCNKYV55UVYOJZZE2L74P2UTRVH36RXEN4";
const secretKey = "SD6AKIS7QAVJ4CAIKO5P53ACNCI5KLELS5Z6JSJ3G3Z6SBXS5XJWENME";
const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);

// Fetch Balance
async function fetchBalance(balanceSpan, lastUpdated) {
  if (!publicKey) {
    if (balanceSpan) balanceSpan.textContent = "No wallet found";
    return;
  }

  try {
    const account = await server.loadAccount(publicKey);
    const balanceObj = account.balances.find(b => b.asset_type === "native");

    if (balanceSpan && balanceObj) {
      balanceSpan.textContent = `${balanceObj.balance} XLM`;
      if (lastUpdated) {
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
      }
    }
  } catch (err) {
    console.error("Error fetching balance:", err);
    if (balanceSpan) balanceSpan.textContent = "Error loading";
  }
}

// Fetch Transaction History
async function fetchBlockchainHistory(publicKey) {
  try {
    const payments = await server.payments()
      .forAccount(publicKey)
      .order("desc")
      .limit(10)
      .call();

      // localStorage.setItem("transactionHistory", JSON.stringify(transactionsFromFirebase));

    const container = document.getElementById("blockchainHistory");
    if (!container) return;

    container.innerHTML = `<h3>🔗 Blockchain Transactions</h3>`;

    payments.records.forEach(tx => {
      if (tx.type === "payment" && tx.asset_type === "native") {
        const row = document.createElement("div");
        row.className = "history-row";
        row.innerHTML = `
          <p><strong>From:</strong> ${tx.from}</p>
          <p><strong>To:</strong> ${tx.to}</p>
          <p><strong>Amount:</strong> ${tx.amount} XLM</p>
          <p><strong>Date:</strong> ${new Date(tx.created_at).toLocaleString()}</p>
          <p><strong>Txn Hash:</strong> <a href="https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}" target="_blank">${tx.transaction_hash}</a></p>
          <hr>
        `;
        container.appendChild(row);
      }
    });

    localStorage.setItem("transactionHistory", JSON.stringify(payments.records));
  } catch (err) {
    console.error("Error fetching transaction history:", err);
  }
}

// Export Transaction History
function exportHistory() {
  const historyData = localStorage.getItem("transactionHistory");
  if (!historyData) {
    alert("No history found to export.");
    return;
  }

  const blob = new Blob([historyData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "PayMate_History_Backup.json";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();

  alert("✅ Your history file has been downloaded!");
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const balanceSpan = document.getElementById("balance");
  const lastUpdated = document.getElementById("lastUpdated");
  const walletALink = document.getElementById("walletALink");
  const walletBLink = document.getElementById("walletBLink");
  const exportBtn = document.getElementById("exportHistoryBtn");
  const toggle = document.getElementById("themeToggle");

  if (balanceSpan) fetchBalance(balanceSpan, lastUpdated);
  if (publicKey && document.getElementById("blockchainHistory")) {
    fetchBlockchainHistory(publicKey);
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  if (!document.body.classList.contains("light-theme") && !document.body.classList.contains("dark-theme")) {
    document.body.classList.add(`${savedTheme}-theme`);
  }

  if (toggle) {
    toggle.checked = savedTheme === "light";
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");
      const newTheme = toggle.checked ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
    });
  }

  const walletA = publicKey;
  const walletB = "GCQKOYQEWA667YNXRWT44T4YRDPK7CUQPCBEQBR6DYIJV7M32HEVDPA7";

  if (walletALink) {
    if (walletA && walletA.startsWith("G")) {
      walletALink.innerHTML = `
        Wallet A: <a href="https://stellar.expert/explorer/testnet/account/${walletA}" target="_blank">
          View on StellarExpert 🔗</a>
      `;
    } else {
      walletALink.textContent = "Wallet A: Not available.";
    }
  }

  if (walletBLink) {
    if (walletB && walletB.startsWith("G")) {
      walletBLink.innerHTML = `
        Wallet B: <a href="https://stellar.expert/explorer/testnet/account/${walletB}" target="_blank">
          View on StellarExpert 🔗</a>
      `;
    } else {
      walletBLink.textContent = "Wallet B: Not available.";
    }
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", exportHistory);
  }
});

// =================== FIREBASE FIRESTORE ===================
// Initialize Firebase and Firestore (You will need to set up Firebase config)
// const myFirebaseConfig = {
//   apiKey: "AIzaSyCy8onPnPTKTFMd5Nu6ASzbwgyMlyWr0YM",
//     authDomain: "paymate-e7be4.firebaseapp.com",
//     projectId: "paymate-e7be4",
//     storageBucket: "paymate-e7be4.firebasestorage.app",
//     messagingSenderId: "816503320540",
//     appId: "1:816503320540:web:2a69855b7b787606b62919",
//     measurementId: "G-4SC4SBST3S"
// };

// // Initialize Firebase
// firebase.initializeApp(myFirebaseConfig);

// // Get Firestore database instance
// myDb = firebase.firestore();

// Save transaction to Firebase Firestore
function saveTransactionToFirebase(sender, receiver, amount) {
  myDb.collection("transactions").add({
    sender: sender,
    receiver: receiver,
    amount: parseFloat(amount),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log("Transaction saved to Firebase!");
  })
  .catch((error) => {
    console.error("Error saving transaction to Firebase:", error);
  });
}

function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('currentUser');
  window.location.href = 'home.html';
}
