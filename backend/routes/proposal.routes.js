const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposal.controller');

router.post('/:id/generate', proposalController.generateProposal);
router.get('/:id/pdf', proposalController.generatePDF);

module.exports = router;
