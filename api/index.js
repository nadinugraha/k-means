var express = require('express');
var router = express.Router();
var apis = require('./apis.js');

router.post('/grouporders', apis.groupOrders);
router.post('/assigndrivers', apis.assignDrivers);

module.exports = router;
