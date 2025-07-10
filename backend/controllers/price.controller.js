const db = require('../config/db');

exports.getPrices = (req, res) => {
    db.all("SELECT * FROM prices", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.updatePrices = (req, res) => {
    const prices = req.body;
    let updatedCount = 0;

    Object.entries(prices).forEach(([itemName, price]) => {
        db.run(
            "UPDATE prices SET unit_price = ? WHERE item_name = ?",
            [price, itemName],
            function (err) {
                if (err) console.error(`Error updating ${itemName}:`, err.message);
                updatedCount++;
                if (updatedCount === Object.keys(prices).length) {
                    res.json({ message: "Prices updated successfully" });
                }
            }
        );
    });
};
