const express = require("express")
const router = express.Router()
const db = require("../config/db")

router.get("/", (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

router.post("/", (req, res) => {
  const data = req.body
  const sql = `INSERT INTO clients (company_name, contact_name, email, phone, vehicle_count, dashcam_type, installation_location, online_option, additional_dome_camera, platform_subscription)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  const params = Object.values(data)

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: this.lastID })
  })
})

module.exports = router
