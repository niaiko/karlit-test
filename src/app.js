const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express")
const { errorHandler } = require("./middlewares/errorHandler")
const clientRoutes = require("./routes/clientRoutes")
const swaggerDocument = require("./config/swagger")
const { testConnection } = require("./config/database")

const app = express()

// Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routes
app.use("/api/clients", clientRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Database connection check endpoint
app.get("/db-check", async (req, res) => {
  const isConnected = await testConnection()
  if (isConnected) {
    res.status(200).json({ status: "connected", message: "Database connection successful" })
  } else {
    res.status(500).json({ status: "error", message: "Database connection failed" })
  }
})

// Error handling middleware
app.use(errorHandler)

module.exports = app