const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/database")

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "Unique identifier for the client",
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "first_name",
      comment: "Client first name",
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "last_name",
      comment: "Client last name",
    },
  },
  {
    tableName: "clients",
    timestamps: false,
    comment: "Table storing client information",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
)

module.exports = Client

