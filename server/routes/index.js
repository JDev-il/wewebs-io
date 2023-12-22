var express = require('express');
var router = express.Router();

const controller = require('../controllers/data.controller');

/* GET home page. */
router.post('/', controller.returnData);

module.exports = router;
