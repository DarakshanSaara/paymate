// // Connect to the Stellar Testnet server
// const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// // Paste your public key here 👇
// const publicKey = "GAP2CGWD2XI26RIAEQ5SP5KCNKYV55UVYOJZZE2L74P2UTRVH36RXEN4"; // Replace with your key

// // Fetch and display the balance
// server.loadAccount(publicKey)
//   .then(account => {
//     const balance = account.balances.find(b => b.asset_type === "native").balance;
//     document.getElementById("balance").innerText = balance;
//   })
//   .catch(error => {
//     console.error("Error loading account:", error);
//     document.getElementById("balance").innerText = "Error";
//   });

//   // handle payment
//   const secretKey = "SD6AKIS7QAVJ4CAIKO5P53ACNCI5KLELS5Z6JSJ3G3Z6SBXS5XJWENME"; // replace with yours
// const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);

// document.getElementById("sendForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const destination = document.getElementById("destination").value.trim();
//   const amount = parseFloat(document.getElementById("amount").value.trim());
//   const status = document.getElementById("statusMsg");

//   // Validation
//   if (!destination || isNaN(amount) || amount <= 0) {
//     status.textContent = "⚠️ Please enter a valid recipient and amount.";
//     return; // exit function if validation fails
//   }

//   // Showing loader
//   status.textContent = "⏳ Sending...";

//   try {
//     // Verify if destination account exists
//     await server.loadAccount(destination);

//     // Load the source account (your account)
//     const account = await server.loadAccount(sourceKeypair.publicKey());
    
//     // Fetch the base fee
//     const fee = await server.fetchBaseFee();

//     // Build the transaction
//     const transaction = new StellarSdk.TransactionBuilder(account, {
//       fee,
//       networkPassphrase: StellarSdk.Networks.TESTNET
//     })
//     .addOperation(StellarSdk.Operation.payment({
//       destination,
//       asset: StellarSdk.Asset.native(),
//       amount: amount.toString() // Ensure it's a string
//     }))
//     .setTimeout(30)
//     .build();

//     // Sign the transaction
//     transaction.sign(sourceKeypair);

//     // Submit the transaction
//     const result = await server.submitTransaction(transaction);

//     // Successful transaction message
//     status.textContent = `✅ Sent! Transaction hash: ${result.hash}`;

//     // Add the transaction to history
//     addTransaction(amount, destination, result.hash, "Sent");

//     // Update transaction history
//     displayTransactionHistory();

//     // Refresh balance
//     updateBalance();

//   } catch (err) {
//     console.error("Transaction failed", err);
//     status.textContent = "❌ Transaction failed. See console for details.";
//   }
// });

// // update live balance
// async function updateBalance() {
//   try {
//     const account = await server.loadAccount(publicKey);
//     const xlmBalance = account.balances.find(b => b.asset_type === "native").balance;
//     document.getElementById("balance").textContent = xlmBalance;
//   } catch (e) {
//     console.error("Error fetching balance:", e);
//   }
// }

// // trannsaction history
// // Transaction history array
// // let transactionHistory = [];
// let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory') || '[]');

// // Example function to add transaction details
// function addTransaction(amount, recipient, transactionHash, type) {
//   if (!amount || !recipient || !transactionHash || !type) {
//     console.error("Invalid transaction details:", { amount, recipient, transactionHash, type });
//     return;
//   }

//   transactionHistory.push({
//     amount,
//     recipient,
//     transactionHash,
//     type,
//     date: new Date().toLocaleString(),
//   });

//   localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
// }

// // Function to display transaction history on the page
// function displayTransactionHistory() {
//   const historyDiv = document.getElementById("transactionHistory");
//   historyDiv.innerHTML = ''; // Clear existing content
  
//   const history = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
  
//   // Show a message if there are no transactions
//   if (history.length === 0) {
//     historyDiv.innerHTML = "<p>No transactions yet.</p>";
//     return; // Exit the function if no transactions are found
//   }

//   history.forEach((transaction) => {
//     // Add validation to check if transaction data is valid
//     if (!transaction || !transaction.amount || !transaction.recipient || !transaction.transactionHash) {
//       console.error("Invalid transaction data:", transaction);
//       return;
//     }

//     const transactionDiv = document.createElement("div");
//     transactionDiv.innerHTML = `
//       <p><strong>Sent:</strong> ${transaction.amount} XLM</p>
//       <p><strong>Recipient:</strong> ${transaction.recipient}</p>
//       <p><strong>Transaction Hash:</strong> <a href="https://testnet.stellar.expert/tx/${transaction.transactionHash}" target="_blank">${transaction.transactionHash}</a></p>
//       <p><small>Time: ${transaction.date}</small></p>
//       <p><strong>Type:</strong> ${transaction.type}</p>
//       <hr/>
//     `;
//     historyDiv.appendChild(transactionDiv);
//   });
// }

// // Display your public key
// document.getElementById("publicKeyDisplay").textContent = publicKey;

// // Copy to clipboard function
// function copyPublicKey() {
//   navigator.clipboard.writeText(publicKey)
//     .then(() => {
//       alert("Wallet address copied to clipboard!");
//     })
//     .catch(err => {
//       console.error("Failed to copy!", err);
//     });
// }

// //QR code
// document.getElementById("qrCode").src =
//   `https://api.qrserver.com/v1/create-qr-code/?data=${publicKey}&size=150x150`;



