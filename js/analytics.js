// Global variables to store chart instances
let spendingChart = null;
let recipientChart = null;

document.addEventListener("DOMContentLoaded", function () {
  // Initial load
  updateCharts();

  // Optional: Auto-refresh every 5 seconds
  setInterval(updateCharts, 5000);
});

function updateCharts() {
  const txHistory = JSON.parse(localStorage.getItem("transactionHistory") || "[]");
  const sentTransactions = txHistory.filter(tx => tx.type?.toLowerCase() === "sent");

  // Process data
  const { dateLabels, spendingData, recipientLabels, recipientData } = processTransactionData(sentTransactions);

  // Update or create charts
  updateSpendingChart(dateLabels, spendingData);
  updateRecipientsChart(recipientLabels, recipientData);
}

function processTransactionData(transactions) {
  const spendingByDate = {};
  const topRecipients = {};

  transactions.forEach(tx => {
    if (!tx.date || typeof tx.date !== "string") return;
    
    try {
      // Parse date (handles both "13/4/2025, 1:48:54 pm" and ISO formats)
      const txDate = parseTransactionDate(tx.date);
      if (isNaN(txDate.getTime())) return;

      // Group by date
      const formattedDay = txDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      spendingByDate[formattedDay] = (spendingByDate[formattedDay] || 0) + parseFloat(tx.amount);

      // Group by recipient
      if (tx.recipient) {
        topRecipients[tx.recipient] = (topRecipients[tx.recipient] || 0) + parseFloat(tx.amount);
      }
    } catch (err) {
      console.warn("Error processing transaction:", err);
    }
  });

  // Prepare chart data
  const dateLabels = Object.keys(spendingByDate).sort((a, b) => new Date(a) - new Date(b));
  const spendingData = dateLabels.map(label => spendingByDate[label]);
  
  const sortedRecipients = Object.entries(topRecipients)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  return {
    dateLabels,
    spendingData,
    recipientLabels: sortedRecipients.map(r => r[0]),
    recipientData: sortedRecipients.map(r => r[1])
  };
}

function parseTransactionDate(dateString) {
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
    console.error("Date parsing error:", e);
    return new Date(NaN);
  }
}

function updateSpendingChart(labels, data) {
  const ctx = document.getElementById("spendingChart").getContext("2d");
  
  if (spendingChart) {
    // Update existing chart
    spendingChart.data.labels = labels;
    spendingChart.data.datasets[0].data = data;
    spendingChart.update();
  } else {
    // Create new chart
    spendingChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Amount Spent per Day (XLM)",
          data: data,
          fill: true,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 2,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Spending Over Time', font: { size: 16 } },
          tooltip: {
            callbacks: {
              label: context => `${context.dataset.label}: ${context.parsed.y} XLM`
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Amount (XLM)' } },
          x: { title: { display: true, text: 'Date' } }
        }
      }
    });
  }
}

function updateRecipientsChart(labels, data) {
  const ctx = document.getElementById("recipientChart").getContext("2d");
  
  if (recipientChart) {
    // Update existing chart
    recipientChart.data.labels = labels;
    recipientChart.data.datasets[0].data = data;
    recipientChart.update();
  } else {
    // Create new chart
    recipientChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Total Sent (XLM)",
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Top 5 Recipients', font: { size: 16 } },
          tooltip: {
            callbacks: {
              label: context => `${context.dataset.label}: ${context.parsed.y} XLM`
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Amount (XLM)' } },
          x: { title: { display: true, text: 'Recipient Address' } }
        }
      }
    });
  }
}

// Make refresh available globally
window.refreshCharts = updateCharts;

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", 
    document.body.classList.contains("dark-theme") ? "dark" : "light"
  );
  updateCharts(); // Refresh charts to apply theme changes
}