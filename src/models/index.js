const Client = require('./Client');
const BalanceSheet = require('./BalanceSheet');
const { sequelize } = require('../config/database');

module.exports = {
  Client,
  BalanceSheet,
  sequelize,
};

