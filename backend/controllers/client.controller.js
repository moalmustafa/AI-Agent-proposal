const db = require('../config/db');

exports.createClient = (req, res) => {
    const { companyName, contactName, email, phone, vehicleCount, dashcamType, installationLocation, onlineOption, additionalDomeCamera, platformSubscription } = req.body;

    const sql = `
        INSERT INTO clients (
            company_name, contact_name, email, phone, vehicle_count,
            dashcam_type, installation_location, online_option,
            additional_dome_camera, platform_subscription
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        companyName, contactName, email, phone, vehicleCount,
        dashcamType, installationLocation, onlineOption,
        additionalDomeCamera, platformSubscription
    ];

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
};

exports.getClients = (req, res) => {
    db.all("SELECT * FROM clients", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getClientById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM clients WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Client not found" });
        res.json(row);
    });
};
