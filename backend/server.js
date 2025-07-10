const express = require("express")
const cors = require("cors")
const app = express()
const fs = require("fs")
const path = require("path")

// Routes
app.use(express.json())
app.use(cors())

// Initialize DB if not exists
if (!fs.existsSync(path.resolve(__dirname, "database.sqlite"))) {
  fs.writeFileSync(path.resolve(__dirname, "database.sqlite"), "")
}

// API Routes
app.use("/api/clients", require("./routes/client.routes"))
app.use("/api/prices", require("./routes/price.routes"))
app.use("/api/proposals", require("./routes/proposal.routes"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
