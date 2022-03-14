var express = require('express');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');

/* GET home page. */
router.get('/flights', flightsCtrl.index);

router.get('/flights/new', flightsCtrl.new);

router.post('/flights', flightsCtrl.add);

router.get('/flights/:id', flightsCtrl.show)

router.post('/flights/:id/destinations', flightsCtrl.addDestination)

module.exports = router;
