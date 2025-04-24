// server.js (or app.js)
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy transaction data (you can replace this with a database later)
let transactions = [
  { id: 1, type: 'Sent', amount: 100, recipient: 'Address1', transactionHash: 'hash1', date: '2025-04-23' },
  { id: 2, type: 'Received', amount: 50, recipient: 'Address2', transactionHash: 'hash2', date: '2025-04-22' },
];

// Routes
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
  const newTransaction = req.body;
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// Server listening on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
