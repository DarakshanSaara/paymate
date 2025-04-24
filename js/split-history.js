// document.addEventListener("DOMContentLoaded", function () {
//     const container = document.getElementById("splitHistoryContainer");
//     const user = localStorage.getItem("currentUser");
//     const storedData = localStorage.getItem("splitHistory_" + user);
  
//     if (!storedData) {
//       container.innerHTML = "<p>No past group splits found.</p>";
//       return;
//     }
  
//     const splitHistory = JSON.parse(storedData);
  
//     splitHistory.reverse().forEach((entry, index) => {
//       const div = document.createElement("div");
//       div.style.border = "1px solid #ccc";
//       div.style.padding = "10px";
//       div.style.marginBottom = "15px";
//       div.style.borderRadius = "10px";
//       div.style.backgroundColor = "#f9f9f9";
  
//       div.innerHTML = `
//         <p><strong>Group Name:</strong> ${entry.groupName}</p>
//         <p><strong>Members:</strong> ${entry.members.join(", ")}</p>
//         <p><strong>Total Amount:</strong> ${entry.totalAmount} XLM</p>
//         <p><strong>Amount per Member:</strong> ${entry.amountPerMember} XLM</p>
//         <p style="font-size: 12px; color: gray;"><em>${entry.timestamp}</em></p>
//       `;
//       container.appendChild(div);
//     });
//   });

// document.addEventListener("DOMContentLoaded", function() {
//   const container = document.getElementById("splitHistoryContainer");
  
//   try {
//     const user = localStorage.getItem("currentUser") || "default";
//     const key = `splitHistory_${user}`;
//     const storedData = localStorage.getItem(key);
    
//     console.log('Loading history for key:', key); // Debug log
//     console.log('Stored data:', storedData); // Debug log
    
//     if (!storedData || storedData === '[]') {
//       container.innerHTML = "<p class='no-splits'>No past group splits found.</p>";
//       return;
//     }

//     const splitHistory = JSON.parse(storedData);
    
//     // Clear previous content
//     container.innerHTML = '';
    
//     // Sort by timestamp (newest first)
//     splitHistory.sort((a, b) => b.timestamp - a.timestamp);
    
//     splitHistory.forEach((entry) => {
//       const div = document.createElement("div");
//       div.className = "split-history-item";
      
//       div.innerHTML = `
//         <div class="split-header">
//           <h3>${entry.groupName}</h3>
//           <span class="split-date">${entry.date}</span>
//         </div>
//         <div class="split-details">
//           <p><strong>Total:</strong> ${entry.totalAmount} XLM</p>
//           <p><strong>Each owes:</strong> ${entry.share} XLM</p>
//         </div>
//         <div class="split-members">
//           <ul>
//             ${entry.members.map(member => `
//               <li>
//                 <span class="member-wallet">${member}</span>
//                 <span class="member-amount">${entry.share} XLM</span>
//                 <button class="send-btn" onclick="sendPayment('${member}', ${entry.share})">
//                   Send
//                 </button>
//               </li>
//             `).join('')}
//           </ul>
//         </div>
//       `;
//       container.appendChild(div);
//     });
    
//   } catch (error) {
//     console.error('Error loading split history:', error);
//     container.innerHTML = "<p class='error-message'>Error loading history. Please try again.</p>";
//   }
// });
document.addEventListener("DOMContentLoaded", function() {
  loadSplitHistory(); // This will now load immediately on page load
});

function loadSplitHistory() {
  const container = document.getElementById("splitHistoryContainer");
  
  try {
    const user = localStorage.getItem("currentUser") || "default";
    const key = `splitHistory_${user}`;
    const storedData = localStorage.getItem(key);
    
    console.log('Loading history for:', key, 'Data:', storedData);
    
    if (!storedData || storedData === '[]') {
      container.innerHTML = "<p class='no-splits'>No past group splits found.</p>";
      return;
    }

    const splitHistory = JSON.parse(storedData);
    container.innerHTML = ''; // Clear previous content
    
    // Sort by timestamp (newest first)
    splitHistory.sort((a, b) => b.timestamp - a.timestamp);
    
    splitHistory.forEach((entry) => {
      const div = document.createElement("div");
      div.className = "split-history-item";
      
      div.innerHTML = `
        <div class="split-header">
          <h3>${entry.groupName}</h3>
          <span class="split-date">${entry.date}</span>
        </div>
        <div class="split-details">
          <p><strong>Total:</strong> ${entry.totalAmount} XLM</p>
          <p><strong>Each owes:</strong> ${entry.share} XLM</p>
        </div>
        <div class="split-members">
          <ul>
            ${entry.members.map(member => `
              <li>
                <span class="member-wallet">${member}</span>
                <span class="member-amount">${entry.share} XLM</span>
                <button class="send-btn" onclick="sendPayment('${member}', ${entry.share})">
                  Send
                </button>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
      container.appendChild(div);
    });
    
  } catch (error) {
    console.error('Error loading history:', error);
    container.innerHTML = `<p class="error">Error loading history. ${error.message}</p>`;
  }
}

// Ensure sendPayment function is available
window.sendPayment = function(wallet, amount) {
  alert(`Preparing to send ${amount} XLM to ${wallet}`);
  // Add your actual payment logic here
};
  
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