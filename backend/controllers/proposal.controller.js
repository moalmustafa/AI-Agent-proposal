const db = require('../config/db');
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');
const generatePDF = require('../utils/generatePDF');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateProposal = async (req, res) => {
    const clientId = req.params.id;

    db.get("SELECT * FROM clients WHERE id = ?", [clientId], async (err, client) => {
        if (err || !client) return res.status(404).json({ error: "Client not found" });

        const prompt = `
            Generate a professional proposal for:
            Company: ${client.company_name}
            Contact: ${client.contact_name}
            Email: ${client.email}
            Phone: ${client.phone}
            Location: ${client.installation_location}
            Vehicles: ${client.vehicle_count}
            Dashcam Type: ${client.dashcam_type}
            Online Option: ${client.online_option ? 'Yes' : 'No'}
            Dome Camera: ${client.additional_dome_camera ? 'Yes' : 'No'}
            Platform Subscription: ${client.platform_subscription ? 'Yes' : 'No'}
            Total Price: SAR${calculateTotalPrice(client)}
            Structure:
              Executive Summary
              Problem Statement
              Proposed Solution
              Key Features & Benefits
              Implementation Plan
              Pricing Summary
              Terms & Conditions
              Next Steps
            Use professional business language.
        `;

        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            });

            const content = response.data.choices[0].message.content;

            db.run(
                "INSERT INTO proposals (client_id, content, total_price) VALUES (?, ?, ?)",
                [clientId, content, calculateTotalPrice(client)],
                function (err) {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ proposalId: this.lastID, content });
                }
            );

        } catch (error) {
            console.error("AI Error:", error.response?.data || error.message);
            res.status(500).json({ error: "Failed to generate proposal." });
        }
    });
};

function calculateTotalPrice(client) {
    // This is simplified; fetch current prices from DB in real implementation
    return 1000;
}
