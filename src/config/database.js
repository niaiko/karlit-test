const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")

dotenv.config()

// Création de l'instance Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || "accounting",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "3306"),
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
)

module.exports = { sequelize }

