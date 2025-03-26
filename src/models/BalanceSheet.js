const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Client = require('./Client');

const BalanceSheet = sequelize.define(
  'BalanceSheet',
  {
    clientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'client_id',
      references: {
        model: Client,
        key: 'id',
      },
      comment: 'Client ID (foreign key)',
    },
    year: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      comment: 'Year of the balance sheet',
    },
    result: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'result',
      comment: 'Financial result for the year',
    },
  },
  {
    tableName: 'balance_sheets',
    timestamps: false,
    comment: 'Table storing balance sheet information by client and year',
  },
);

// Définition des associations
Client.hasMany(BalanceSheet, {
  foreignKey: 'clientId',
  onDelete: 'CASCADE',
});
BalanceSheet.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = BalanceSheet;

