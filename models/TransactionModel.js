const mongoose = require('mongoose');

//TO_DO: verificar valores minimos e maximos para keys do tipo Number
let schema = mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
    min: 0,
  },
  category: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  month: {
    type: Number,
    require: true,
  },
  day: {
    type: Number,
    require: true,
  },
  yearMonth: {
    type: String,
    require: true,
  },
  yearMonthDay: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
});

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
