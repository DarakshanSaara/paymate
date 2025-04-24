// document.addEventListener("DOMContentLoaded", () => {
//   const historyDiv = document.getElementById("transactionHistory");
//   let allTransactions = loadTransactions();

//   // Initial render
//   renderHistory(allTransactions);

//   // Filter handler
//   window.applyFilters = () => {
//     const address = document.getElementById("searchAddress")?.value.toLowerCase();
//     const amount = document.getElementById("searchAmount")?.value;
//     const type = document.getElementById("typeFilter")?.value;

//     const filtered = allTransactions.filter(transaction => {
//       const matchesAddress = address ? 
//         (transaction.recipient && transaction.recipient.toLowerCase().includes(address)) : true;
//       const matchesAmount = amount ? transaction.amount == amount : true;
//       const matchesType = type ? transaction.type === type : true;
//       return matchesAddress && matchesAmount && matchesType;
//     });

//     renderHistory(filtered);
//   };

//   // Reset filters
//   window.resetFilters = () => {
//     document.getElementById("searchAddress").value = "";
//     document.getElementById("searchAmount").value = "";
//     document.getElementById("typeFilter").value = "";
//     renderHistory(allTransactions);
//   };

//   // Refresh transaction list
//   window.refreshTransactions = () => {
//     allTransactions = loadTransactions();
//     renderHistory(allTransactions);
//     console.log('Transactions refreshed', allTransactions.length);
//   };

//   // Load from localStorage
//   // function loadTransactions() {
//   //   try {
//   //     const primary = JSON.parse(localStorage.getItem('transactionHistory')) || [];
//   //     if (primary.length === 0) {
//   //       // If primary is empty, try loading from backup
//   //       const backup = JSON.parse(localStorage.getItem('transactionHistoryBackup')) || [];
//   //       if (backup.length > 0) {
//   //         localStorage.setItem('transactionHistory', JSON.stringify(backup));
//   //         return backup;
//   //       }
//   //     }
//   //     return primary;
//   //   } catch (e) {
//   //     console.error("Error loading transactions:", e);
//   //     return [];
//   //   }
//   // }
//   function loadTransactions() {
//     try {
//       const primary = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
//       if (!Array.isArray(primary)) throw new Error("Data is not an array");
//       return primary;
//     } catch (e) {
//       console.error("Loading failed, restoring backup:", e);
//       const backup = JSON.parse(localStorage.getItem('transactionHistoryBackup') || '[]');
//       return Array.isArray(backup) ? backup : [];
//     }
//   }

//   // Main render function
//   function renderHistory(transactions) {
//     historyDiv.innerHTML = "";

//     if (!transactions || transactions.length === 0) {
//       historyDiv.innerHTML = "<p>No transactions found.</p>";
//       return;
//     }

//     calculateAnalytics(transactions);
//     renderTransactionItems(transactions);
//   }

//   // Render each transaction item
//   function renderTransactionItems(transactions) {
//     transactions.forEach(transaction => {
//       if (!transaction || !transaction.amount || !transaction.transactionHash) {
//         console.warn("Skipping invalid transaction:", transaction);
//         return;
//       }

//       const type = transaction.type || "Unknown";
//       const amount = transaction.amount;
//       const recipient = transaction.recipient || "N/A";
//       const hash = transaction.transactionHash;

//       const div = document.createElement("div");
//       div.className = "transaction-item";
//       div.innerHTML = `
//         <p><strong>Type:</strong> <span class="tx-type ${type.toLowerCase()}">${type}</span></p>
//         <p><strong>Amount:</strong> ${amount} XLM</p>
//         <p><strong>${type === "Sent" ? "To" : "From"}:</strong> 
//           <span class="tx-address">${recipient}</span>
//         </p>
//         <p><strong>Hash:</strong> <a href="https://testnet.stellar.expert/tx/${hash}" target="_blank">${hash.substring(0, 12)}...</a></p>
//         <p class="tx-date"><small>${formatDate(transaction.date)}</small></p>
//         <hr/>
//       `;
//       historyDiv.appendChild(div);
//     });
//   }

//   // Format date safely
//   function formatDate(dateString) {
//     try {
//       if (dateString.includes(",")) return dateString;
//       return new Date(dateString).toLocaleString();
//     } catch (e) {
//       console.error("Date format error:", e);
//       return dateString;
//     }
//   }

//   // Analytics
//   function calculateAnalytics(transactions) {
//     const now = new Date();
//     let weeklyTotal = 0;
//     let monthlyTotal = 0;

//     transactions.filter(tx => tx.type === "Sent").forEach(tx => {
//       try {
//         const txDate = parseDate(tx.date);
//         if (isNaN(txDate.getTime())) return;
        
//         const diffInDays = (now - txDate) / (1000 * 60 * 60 * 24);
//         const amount = parseFloat(tx.amount) || 0;

//         if (diffInDays <= 7) weeklyTotal += amount;
//         if (diffInDays <= 30) monthlyTotal += amount;
//       } catch (e) {
//         console.error("Analytics error:", e);
//       }
//     });

//     updateAnalyticsUI(weeklyTotal, monthlyTotal);
//   }

//   // Safe date parser
//   function parseDate(dateString) {
//     try {
//       if (dateString.includes(",")) {
//         const [datePart, timePart] = dateString.split(", ");
//         const [day, month, year] = datePart.split("/").map(Number);
//         const [time, period] = timePart.split(" ");
//         let [hours, minutes] = time.split(":").map(Number);

//         if (period?.toLowerCase() === "pm" && hours < 12) hours += 12;
//         if (period?.toLowerCase() === "am" && hours === 12) hours = 0;

//         return new Date(year, month - 1, day, hours, minutes || 0);
//       }
//       return new Date(dateString);
//     } catch (e) {
//       console.error("Parse date error:", e);
//       return new Date(NaN);
//     }
//   }

//   // Update analytics section
//   function updateAnalyticsUI(weekly, monthly) {
//     let analyticsDiv = document.querySelector(".analytics-section");

//     if (!analyticsDiv) {
//       analyticsDiv = document.createElement("div");
//       analyticsDiv.className = "analytics-section";
//       historyDiv.prepend(analyticsDiv);
//     }

//     analyticsDiv.innerHTML = `
//       <h3>📊 Weekly & Monthly Analytics</h3>
//       <p>🗓️ You spent <strong>${weekly.toFixed(2)} XLM</strong> this week.</p>
//       <p>📆 You spent <strong>${monthly.toFixed(2)} XLM</strong> this month.</p>
//       <hr/>
//     `;
//   }

//   // Add this to your history.js to implement localStorage backup
//   function backupTransactions() {
//     localStorage.setItem('transactionHistoryBackup', 
//       JSON.stringify(allTransactions));
//   }

//   // Save transactions to localStorage and backup
//   function saveTransactions(transactions) {
//     localStorage.setItem('transactionHistory', JSON.stringify(transactions));
//     backupTransactions();
//   }

//   // Load sample data only if empty and on demo environment
//   function initializeSampleData() {
//     const isDemo = window.location.host.includes('github.io') || 
//                    window.location.search.includes('demo=true');
    
//     if (isDemo && (!localStorage.getItem('transactionHistory') || 
//         JSON.parse(localStorage.getItem('transactionHistory')).length === 0)) {
      
//       const sampleTransactions = [
//         {
//           type: "Received",
//           amount: "150",
//           recipient: "GCPD3XK5VQ4AJVKQHICGZPGMJBJEDTVJ4NSTFJO7VYHYJ2UROJQEXAMPLE",
//           transactionHash: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6",
//           date: new Date().toLocaleString()
//         },
//         {
//           type: "Sent",
//           amount: "75.5",
//           recipient: "GDT5KD2KEZJIGTC63IGW6UMUSMVUVG5IHG64H3W2B5XU7W6UGQ4EXAMPLE",
//           transactionHash: "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1",
//           date: new Date(Date.now() - 86400000).toLocaleString() // Yesterday
//         },
//         {
//           type: "Received",
//           amount: "200",
//           recipient: "GBMDRY3K5VQ4AJVKQHICGZPGMJBJEDTVJ4NSTFJO7VYHYJ2UROJQEXAMPLE",
//           transactionHash: "b2a1c3d4e5f6b2a1c3d4e5f6b2a1c3d4e5f6b2a1c3d4e5f6b2a1c3d4e5f6",
//           date: new Date(Date.now() - 172800000).toLocaleString() // 2 days ago
//         }
//       ];

//       localStorage.setItem('transactionHistory', JSON.stringify(sampleTransactions));
//       console.log("%cDEMO MODE: Sample transactions loaded", 
//         "color: white; background: #4CAF50; padding: 2px 5px; border-radius: 3px");
//     }
//   }

//   // Call this when your app starts
//   initializeSampleData();
// });

document.addEventListener("DOMContentLoaded", () => {
  const historyDiv = document.getElementById("transactionHistory");
  let allTransactions = loadTransactions();

  // Fetch Firestore data on load
  fetchTransactionsFromFirestore();

  // Initial render
  renderHistory(allTransactions);

  // Filter handler
  window.applyFilters = () => {
    const address = document.getElementById("searchAddress")?.value.toLowerCase();
    const amount = document.getElementById("searchAmount")?.value;
    const type = document.getElementById("typeFilter")?.value;

    const filtered = allTransactions.filter(transaction => {
      const matchesAddress = address ? 
        (transaction.recipient && transaction.recipient.toLowerCase().includes(address)) : true;
      const matchesAmount = amount ? transaction.amount == amount : true;
      const matchesType = type ? transaction.type === type : true;
      return matchesAddress && matchesAmount && matchesType;
    });

    renderHistory(filtered);
    saveTransactions(filtered); // Save filtered transactions
  };

  // Reset filters
  window.resetFilters = () => {
    document.getElementById("searchAddress").value = "";
    document.getElementById("searchAmount").value = "";
    document.getElementById("typeFilter").value = "";
    renderHistory(allTransactions);
  };

  // Refresh transaction list
  window.refreshTransactions = () => {
    allTransactions = loadTransactions();
    renderHistory(allTransactions);
    console.log('Transactions refreshed', allTransactions.length);
  };

  function loadTransactions() {
    try {
      const primary = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
      if (!Array.isArray(primary)) throw new Error("Data is not an array");
      return primary;
    } catch (e) {
      console.error("Loading failed, restoring backup:", e);
      const backup = JSON.parse(localStorage.getItem('transactionHistoryBackup') || '[]');
      return Array.isArray(backup) ? backup : [];
    }
  }

  function renderHistory(transactions) {
    historyDiv.innerHTML = "";

    if (!transactions || transactions.length === 0) {
      historyDiv.innerHTML = "<p>No transactions found.</p>";
      return;
    }

    calculateAnalytics(transactions);
    renderTransactionItems(transactions);
  }

  function renderTransactionItems(transactions) {
    transactions.forEach(transaction => {
      if (!transaction || !transaction.amount || !transaction.transactionHash) {
        console.warn("Skipping invalid transaction:", transaction);
        return;
      }

      const type = transaction.type || "Unknown";
      const amount = transaction.amount;
      const recipient = transaction.recipient || "N/A";
      const hash = transaction.transactionHash;

      const div = document.createElement("div");
      div.className = "transaction-item";
      div.innerHTML = ` 
        <p><strong>Type:</strong> <span class="tx-type ${type.toLowerCase()}">${type}</span></p>
        <p><strong>Amount:</strong> ${amount} XLM</p>
        <p><strong>${type === "Sent" ? "To" : "From"}:</strong> 
          <span class="tx-address">${recipient}</span>
        </p>
        <p><strong>Hash:</strong> <a href="https://testnet.stellar.expert/tx/${hash}" target="_blank">${hash.substring(0, 12)}...</a></p>
        <p class="tx-date"><small>${formatDate(transaction.date)}</small></p>
        <hr/>
      `;
      historyDiv.appendChild(div);
    });
  }

  function formatDate(dateString) {
    try {
      if (dateString.includes(",")) return dateString;
      return new Date(dateString).toLocaleString();
    } catch (e) {
      console.error("Date format error:", e);
      return dateString;
    }
  }

  function calculateAnalytics(transactions) {
    const now = new Date();
    let weeklyTotal = 0;
    let monthlyTotal = 0;

    transactions.filter(tx => tx.type === "Sent").forEach(tx => {
      try {
        const txDate = parseDate(tx.date);
        if (isNaN(txDate.getTime())) return;
        
        const diffInDays = (now - txDate) / (1000 * 60 * 60 * 24);
        const amount = parseFloat(tx.amount) || 0;

        if (diffInDays <= 7) weeklyTotal += amount;
        if (diffInDays <= 30) monthlyTotal += amount;
      } catch (e) {
        console.error("Analytics error:", e);
      }
    });

    // updateAnalyticsUI(weeklyTotal, monthlyTotal);
  }

  function parseDate(dateString) {
    try {
      if (dateString.includes(",")) {
        const [datePart, timePart] = dateString.split(", ");
        const [day, month, year] = datePart.split("/").map(Number);
        const [time, period] = timePart.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (period?.toLowerCase() === "pm" && hours < 12) hours += 12;
        if (period?.toLowerCase() === "am" && hours === 12) hours = 0;

        return new Date(year, month - 1, day, hours, minutes || 0);
      }
      return new Date(dateString);
    } catch (e) {
      console.error("Parse date error:", e);
      return new Date(NaN);
    }
  }

  // function updateAnalyticsUI(weekly, monthly) {
  //   let analyticsDiv = document.querySelector(".analytics-section");

  //   if (!analyticsDiv) {
  //     analyticsDiv = document.createElement("div");
  //     analyticsDiv.className = "analytics-section";
  //     historyDiv.prepend(analyticsDiv);
  //   }

  //   analyticsDiv.innerHTML = `
  //     <h3>📊 Weekly & Monthly Analytics</h3>
  //     <p>🗓️ You spent <strong>${weekly.toFixed(2)} XLM</strong> this week.</p>
  //     <p>📆 You spent <strong>${monthly.toFixed(2)} XLM</strong> this month.</p>
  //     <hr/>
  //   `;
  // }

  function backupTransactions() {
    localStorage.setItem('transactionHistoryBackup', 
      JSON.stringify(allTransactions));
  }

  function saveTransactions(transactions) {
    localStorage.setItem('transactionHistory', JSON.stringify(transactions));
    backupTransactions();
  }

  function initializeSampleData() {
    const isDemo = window.location.host.includes('github.io') || 
                   window.location.search.includes('demo=true');
    
    if (isDemo && (!localStorage.getItem('transactionHistory') || 
        JSON.parse(localStorage.getItem('transactionHistory')).length === 0)) {
      
      const sampleTransactions = [
        {
          type: "Received",
          amount: "150",
          recipient: "GCPD3XK5VQ4AJVKQHICGZPGMJBJEDTVJ4NSTFJO7VYHYJ2UROJQEXAMPLE",
          transactionHash: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6",
          date: new Date().toLocaleString()
        },
        {
          type: "Sent",
          amount: "75.5",
          recipient: "GDT5KD2KEZJIGTC63IGW6UMUSMVUVG5IHG64H3W2B5XU7W6UGQ4EXAMPLE",
          transactionHash: "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1",
          date: new Date(Date.now() - 86400000).toLocaleString()
        },
        {
          type: "Received",
          amount: "200",
          recipient: "GBMDRY3K5VQ4AJVKQHICGZPGMJBJEDTVJ4NSTFJO7VYHYJ2UROJQEXAMPLE",
          transactionHash: "b2a1c3d4e5f6b2a1c3d4e5f6b2a1c3d4e5f6b2a1c3d4e5f6b2a1c3d4e5f6",
          date: new Date(Date.now() - 172800000).toLocaleString()
        }
      ];

      localStorage.setItem('transactionHistory', JSON.stringify(sampleTransactions));
    }
  }

  // Call initializeSampleData for demo mode setup
  initializeSampleData();

  // Fetch transactions from Firestore
  function fetchTransactionsFromFirestore() {
    db.collection("transactions")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        const transactionList = document.getElementById("transaction-list");
        if (transactionList) transactionList.innerHTML = '';
        querySnapshot.forEach((doc) => {
          const transaction = doc.data();
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>Sender:</strong> ${transaction.sender} <br>
            <strong>Receiver:</strong> ${transaction.receiver} <br>
            <strong>Amount:</strong> ${transaction.amount} XLM <br>
            <strong>Date:</strong> ${new Date(transaction.timestamp.seconds * 1000).toLocaleString()}
          `;
          if (transactionList) transactionList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching transactions from Firestore:", error);
      });
  }
  // function resetTransactionFilter() {
  //   fetchTransactionsFromFirestore(); // Re-fetches all transactions and re-renders the list
  // }
});

function applyFirestoreFilters() {
  const address = document.getElementById("searchAddress")?.value.toLowerCase();
  const amount = document.getElementById("searchAmount")?.value;
  const type = document.getElementById("typeFilter")?.value;

  db.collection("transactions")
    .orderBy("timestamp", "desc")
    .limit(50) // fetch more to allow better filtering
    .get()
    .then((querySnapshot) => {
      const filtered = [];

      querySnapshot.forEach((doc) => {
        const tx = doc.data();
        const matchesAddress = address
          ? (tx.sender?.toLowerCase().includes(address) || tx.receiver?.toLowerCase().includes(address))
          : true;
        const matchesAmount = amount ? tx.amount == amount : true;
        const matchesType = type ? tx.type === type : true;

        if (matchesAddress && matchesAmount && matchesType) {
          filtered.push(tx);
        }
      });

      renderFirestoreTransactions(filtered);
    })
    .catch((error) => {
      console.error("Error filtering Firestore transactions:", error);
    });
}

function renderFirestoreTransactions(transactions) {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  if (transactions.length === 0) {
    list.innerHTML = "<li>No matching transactions found.</li>";
    return;
  }

  transactions.forEach(tx => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>Sender:</strong> ${tx.sender} <br>
      <strong>Receiver:</strong> ${tx.receiver} <br>
      <strong>Amount:</strong> ${tx.amount} XLM <br>
      <strong>Type:</strong> ${tx.type || "N/A"} <br>
      <strong>Date:</strong> ${new Date(tx.timestamp.seconds * 1000).toLocaleString()}
      <hr/>
    `;
    list.appendChild(listItem);
  });
}

function resetTransactionFilter() {
  // Clear input fields (if present)
  const receiverInput = document.getElementById("receiverInput");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  if (receiverInput) receiverInput.value = "";
  if (startDateInput) startDateInput.value = "";
  if (endDateInput) endDateInput.value = "";

  // Call the original function to reload the latest 10 transactions
  fetchTransactionsFromFirestore();
}

