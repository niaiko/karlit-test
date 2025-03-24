const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express")

const app = express()

// Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

module.exports = app