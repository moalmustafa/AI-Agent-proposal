const jsPDF = require('jspdf');
require('jspdf-autotable');

exports.generatePDF = (proposal, client, prices, callback) => {
    const doc = new jsPDF.default();
    doc.setFontSize(16);
    doc.text(`Proposal for ${client.company_name}`, 15, 20);

    doc.autoTable({
        startY: 30,
        head: [["Item", "Quantity", "Unit Price", "Total"]],
        body: [
            ["Hero-ME40-02", client.vehicle_count, prices["Hero-ME40-02"], client.vehicle_count * prices["Hero-ME40-02"]],
            ["Installation", client.vehicle_count, prices["Installation"], client.vehicle_count * prices["Installation"]],
        ],
    });

    const filename = `Proposal-${client.company_name}.pdf`;
    const buffer = doc.output('arraybuffer');
    callback(buffer, filename);
};
