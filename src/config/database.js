const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Création de l'instance Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'accounting',
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: console.log, // Activer les logs SQL pour le débogage
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      // Pour MySQL 8.0+
      charset: 'utf8mb4',
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  },
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Afficher les informations de connexion (sans les mots de passe)
    console.log('Database connection info:', {
      database: process.env.DB_NAME || 'accounting',
      host: process.env.DB_HOST || 'localhost',
      port: Number.parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
    });

    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

// Exporter la fonction de test
module.exports = { sequelize, testConnection };

