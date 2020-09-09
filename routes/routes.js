const express = require('express');
const transactionRouter = express.Router();
const TransactionModel = require('../models/TransactionModel.js');

transactionRouter.get('/', async (req, res, next) => {
  try {
    const period = req.query.period;
    const transactions = await TransactionModel.find({
      yearMonth: period,
    }).sort({ yearMonthDay: 1 });
    if (!period) {
      throw new Error(
        'Período inválido. Por favor, informe um período no formato period=YYYY-MM'
      );
    } else {
      res.send(transactions);
      console.log(`GET ${period}`);
    }
  } catch (err) {
    next(err);
  }
});

transactionRouter.get('/:id', async (req, res, next) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id);
    if (!transaction) {
      throw new Error('ID inválido. Por favor, forneça um ID válido.');
    } else {
      res.send(transaction);
      console.log(`GET ID: ${req.params.id}`);
    }
  } catch (err) {
    next(err);
  }
});

transactionRouter.post('/', async (req, res, next) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    await newTransaction.save();
    res.send(newTransaction);
    console.log(
      `POST ${newTransaction.category} -> ${newTransaction.type}${newTransaction.value}`
    );
  } catch (err) {
    next(err);
  }
});

transactionRouter.delete('/:id', async (req, res, next) => {
  try {
    await TransactionModel.findByIdAndDelete(req.params.id);
    console.log(`DELETE: ID ${req.params.id}`);
    res.send(`ID ${req.params.id} deletado com sucesso!`);
  } catch (err) {
    next(err);
  }
});

transactionRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(`PUT: ID ${req.params.id}`);
    res.send(updatedTransaction);
  } catch (err) {
    next(err);
  }
});

transactionRouter.use((err, req, res, next) => {
  console.log(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(500).send({ error: err.message });
});
module.exports = transactionRouter;
