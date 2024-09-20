const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();
// create transaction 
router.post('/create', authMiddleware, async (req, res) => {
    try {
      const transaction = new Transaction({
        userId: req.user._id,
        ...req.body,
      });
      await transaction.save();
      res.status(201).json({ message: 'Transaction created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  });

// Get all transactions for a user
router.get('/get', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Add a transaction
router.put('/update/:id', authMiddleware, async (req, res) => {
    try {
      const transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update transaction' });
    }
  });
// Delete a transaction
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete transaction' });
    }
  });

module.exports = router;
