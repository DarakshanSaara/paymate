// // ✅ Send transaction handler
// document.getElementById("sendForm").addEventListener("submit", async function (e) {
//   e.preventDefault();
//   const destination = document.getElementById("destination").value.trim();
//   const amount = parseFloat(document.getElementById("amount").value.trim());
//   const memo = document.getElementById("memo").value.trim();
//   const status = document.getElementById("statusMsg");

//   if (!destination || isNaN(amount) || amount <= 0) {
//     status.textContent = "⚠️ Enter a valid recipient and amount.";
//     return;
//   }

//   status.textContent = "⏳ Sending...";

//   try {
//     await server.loadAccount(destination);
//     const account = await server.loadAccount(sourceKeypair.publicKey());
//     const fee = await server.fetchBaseFee();

//     const transactionBuilder = new StellarSdk.TransactionBuilder(account, {
//       fee,
//       networkPassphrase: StellarSdk.Networks.TESTNET
//     })
//       .addOperation(StellarSdk.Operation.payment({
//         destination,
//         asset: StellarSdk.Asset.native(),
//         amount: amount.toString()
//       }))
//       .setTimeout(30);

//     if (memo) {
//       transactionBuilder.addMemo(StellarSdk.Memo.text(memo));
//     }

//     const transaction = transactionBuilder.build();
//     transaction.sign(sourceKeypair);
//     const result = await server.submitTransaction(transaction);

//     // ✅ Save to Firestore
//     saveTransactionToFirestore(
//       sourceKeypair.publicKey(),
//       destination,
//       amount,
//       result.hash,
//       memo
//     );

//     // ✅ Show success
//     status.innerHTML = `
//       ✅ Sent!<br>
//       🔗 <a href="https://stellar.expert/explorer/testnet/tx/${result.hash}" target="_blank" style="color: #007bff;">
//         View Transaction
//       </a>
//     `;

//     addTransaction(amount, destination, result.hash, "Sent", memo);
//     updateBalance();

//   } catch (err) {
//     console.error("❌ Transaction failed:", err);
//     status.textContent = "❌ Transaction failed.";
//   }
// });

// // ✅ Update wallet balance
// function updateBalance() {
//   server.loadAccount(publicKey)
//     .then(account => {
//       const balance = account.balances.find(b => b.asset_type === "native").balance;
//       document.getElementById("balance").innerText = balance;
//     })
//     .catch(error => {
//       console.error("Error fetching balance:", error);
//     });
// }

// // ✅ Save locally
// function addTransaction(amount, recipient, transactionHash, type, memo = "") {
//   const history = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
//   history.push({
//     amount,
//     recipient,
//     transactionHash,
//     memo,
//     type,
//     date: new Date().toISOString()
//   });
//   localStorage.setItem('transactionHistory', JSON.stringify(history));
// }

// // ✅ Save to Firebase Firestore
// function saveTransactionToFirestore(sender, receiver, amount, transactionHash, memo = "") {
//   db.collection("transactions").add({
//     sender,
//     receiver,
//     amount,
//     transactionHash,
//     memo,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   })
//     .then(docRef => {
//       console.log("Transaction saved with ID:", docRef.id);
//     })
//     .catch(error => {
//       console.error("Firestore save error:", error);
//     });
// }

// // ✅ On page load
// window.onload = function () {
//   updateBalance();
// };

// Initialize Stellar SDK and server
// const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// Remove the Buffer line and just use window.Buffer directly
StellarSdk.Networks.TESTNET; 

// Send transaction handler
document.getElementById("sendForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const destination = document.getElementById("destination").value.trim();
  const amount = parseFloat(document.getElementById("amount").value.trim());
  const memo = document.getElementById("memo").value.trim();
  const status = document.getElementById("statusMsg");

  if (!destination || isNaN(amount) || amount <= 0) {
    status.textContent = "⚠️ Enter a valid recipient and amount.";
    return;
  }

  status.textContent = "⏳ Sending...";

  try {
    await server.loadAccount(destination);
    const account = await server.loadAccount(sourceKeypair.publicKey());
    const fee = await server.fetchBaseFee();

    let transactionBuilder = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.payment({
        destination,
        asset: StellarSdk.Asset.native(),
        amount: amount.toString()
      }))
      .setTimeout(30);

    if (memo) {
      const memoText = memo.toString().trim();
      if (window.Buffer && window.Buffer.byteLength(memoText, 'utf8') > 28) {
        status.textContent = "⚠️ Memo must be 28 bytes or less.";
        return;
      }
      transactionBuilder = transactionBuilder.addMemo(StellarSdk.Memo.text(memoText));
    }

    const transaction = transactionBuilder.build();
    transaction.sign(sourceKeypair);
    const result = await server.submitTransaction(transaction);

    saveTransactionToFirestore(
      sourceKeypair.publicKey(),
      destination,
      amount,
      result.hash,
      memo
    );

    status.innerHTML = `
      ✅ Sent!<br>
      🔗 <a href="https://stellar.expert/explorer/testnet/tx/${result.hash}" target="_blank" style="color: #007bff;">
        View Transaction
      </a>
    `;

    addTransaction(amount, destination, result.hash, "Sent", memo);
    updateBalance();

  } catch (err) {
    console.error("❌ Transaction failed:", err);
    status.textContent = "❌ Transaction failed.";
  }
});

function updateBalance() {
  server.loadAccount(publicKey)
    .then(account => {
      const balance = account.balances.find(b => b.asset_type === "native").balance;
      document.getElementById("balance").innerText = balance;
    })
    .catch(error => {
      console.error("Error fetching balance:", error);
    });
}

function addTransaction(amount, recipient, transactionHash, type, memo = "") {
  const history = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
  history.push({
    amount,
    recipient,
    transactionHash,
    memo,
    type,
    date: new Date().toISOString()
  });
  localStorage.setItem('transactionHistory', JSON.stringify(history));
}

function saveTransactionToFirestore(sender, receiver, amount, transactionHash, memo = "") {
  console.log("Saving to Firestore:", sender, receiver, amount, transactionHash, memo);
  db.collection("transactions").add({
    sender,
    receiver,
    amount,
    transactionHash,
    memo,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(docRef => {
      console.log("Transaction saved with ID:", docRef.id);
    })
    .catch(error => {
      console.error("Firestore save error:", error);
    });
}

window.onload = function () {
  updateBalance();
};