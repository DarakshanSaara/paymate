// routes/transactions.js
const router = require('express').Router();
const auth = require('../middleware/auth');
const Transaction = require('../routes/Transaction');

// Get all transactions for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new transaction (sent/received)
router.post('/', auth, async (req, res) => {
  try {
    const transaction = new Transaction({ ...req.body, userId: req.user.id });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
