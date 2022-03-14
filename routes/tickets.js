const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

router.get('/tickets/:id/new', ticketsCtrl.new);
router.post('/tickets/:id/', ticketsCtrl.add);

module.exports = router;