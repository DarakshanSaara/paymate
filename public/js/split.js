const splitForm = document.getElementById('splitForm');
const resultDiv = document.getElementById('splitResult');

splitForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const groupName = document.getElementById('groupName').value.trim();
  const membersInput = document.getElementById('members').value.trim();
  const totalAmount = parseFloat(document.getElementById('totalAmount').value.trim());

  if (!groupName || !membersInput || isNaN(totalAmount) || totalAmount <= 0) {
    resultDiv.innerHTML = "<p style='color: red;'>❌ Please enter valid group details.</p>";
    return;
  }

  const memberWallets = membersInput.split(',').map(wallet => wallet.trim()).filter(wallet => wallet !== "");
  const share = (totalAmount / memberWallets.length).toFixed(2);

  const splitRecord = {
    groupName,
    members: memberWallets,
    totalAmount,
    share,
    date: new Date().toLocaleString()
  };

  saveSplitToHistory(splitRecord);
  displaySplit(splitRecord);
  loadSplitHistory(); // Refresh history view after each split
});

// Save new split to localStorage
// function saveSplitToHistory(record) {
//   const splits = JSON.parse(localStorage.getItem('splitHistory')) || [];
//   splits.unshift(record); // newest first
//   localStorage.setItem('splitHistory', JSON.stringify(splits));
// }
// Modified save function
// Modified save function with proper data structure
function saveSplitToHistory(record) {
  const user = localStorage.getItem("currentUser") || "default";
  const key = `splitHistory_${user}`;
  
  try {
    const existingData = localStorage.getItem(key);
    const splits = existingData ? JSON.parse(existingData) : [];
    
    // Ensure complete record structure
    const completeRecord = {
      groupName: record.groupName,
      members: record.members,
      totalAmount: record.totalAmount,
      share: record.share,
      date: new Date().toLocaleString(),
      timestamp: new Date().getTime() // For sorting
    };
    
    splits.unshift(completeRecord);
    localStorage.setItem(key, JSON.stringify(splits));
    console.log('Split saved:', completeRecord); // Debug log
  } catch (error) {
    console.error('Error saving split:', error);
  }
}

// Display one split
function displaySplit(record) {
  let html = `<h3>Group: ${record.groupName}</h3>`;
  html += `<p>Total Amount: ${record.totalAmount} XLM | Each: ${record.share} XLM</p>`;
  html += `<p>Members: ${record.members.length} | Date: ${record.date}</p>`;
  html += `<ul>`;
  record.members.forEach(wallet => {
    html += `<li><strong>${wallet}</strong> owes <strong>${record.share} XLM</strong> 
      <button onclick="sendPayment('${wallet}', ${record.share})">Send</button></li>`;
  });
  html += `</ul><hr>`;

  resultDiv.innerHTML = html;
}

// Load and show all history
function loadSplitHistory() {
  const user = localStorage.getItem("currentUser") || "default";
  const key = `splitHistory_${user}`;
  const splits = JSON.parse(localStorage.getItem(key)) || [];

  if (splits.length === 0) {
    resultDiv.innerHTML = "<p>No past group splits.</p>";
    return;
  }

  let html = "<h2>📋 Past Group Splits</h2>";
  splits.forEach((record, i) => {
    html += `<div style="border:1px solid #ddd; padding: 10px; margin:10px 0; border-radius: 8px;">`;
    html += `<strong>${record.groupName}</strong> (${record.date})<br>`;
    html += `Total: ${record.totalAmount} XLM | Each: ${record.share} XLM<br>`;
    html += `<ul>`;
    record.members.forEach(wallet => {
      html += `<li>${wallet} owes ${record.share} XLM 
        <button onclick="sendPayment('${wallet}', ${record.share})">Send</button></li>`;
    });
    html += `</ul></div>`;
  });

  resultDiv.innerHTML = html;
}

// Placeholder send function
function sendPayment(wallet, amount) {
  alert(`🚀 Send ${amount} XLM to ${wallet}`);
}

// Load history on page load
// window.onload = loadSplitHistory;
window.addEventListener("DOMContentLoaded", loadSplitHistory);

const viewHistoryBtn = document.getElementById('viewHistoryBtn');

viewHistoryBtn.addEventListener('click', function () {
  loadSplitHistory();
});

// Existing form handling code continues below...

// Set theme from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.add('dark-theme');
  }
});

// Example toggle function
function toggleTheme() {
  if (document.body.classList.contains('light-theme')) {
    document.body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('theme', 'light');
  }
}
