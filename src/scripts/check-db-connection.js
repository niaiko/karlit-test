// Script pour vérifier la connexion à la base de données
require("dotenv").config()
const { sequelize, testConnection } = require("../config/database")
const logger = require("../utils/logger")

async function checkDatabaseConnection() {
  try {
    logger.info("Testing database connection...")

    // Tester la connexion
    const isConnected = await testConnection()

    if (isConnected) {
      logger.info("Database connection successful!")

      // Vérifier les modèles
      logger.info("Checking models...")
      const models = Object.keys(sequelize.models)
      logger.info(`Found models: ${models.join(", ")}`)

      // Tester la synchronisation
      logger.info("Testing model synchronization...")
      await sequelize.sync({ force: false })
      logger.info("Model synchronization successful!")

      // Afficher les tables
      const [results] = await sequelize.query("SHOW TABLES")
      const tables = results.map((r) => Object.values(r)[0])
      logger.info(`Database tables: ${tables.join(", ")}`)
    } else {
      logger.error("Database connection failed!")
    }
  } catch (error) {
    logger.error("Error during database check:", error)
  } finally {
    // Fermer la connexion
    await sequelize.close()
    process.exit(0)
  }
}

// Exécuter la fonction
checkDatabaseConnection()

