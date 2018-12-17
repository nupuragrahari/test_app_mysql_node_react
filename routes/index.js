var express = require('express');
var app= express;
var router = express.Router();
var db = require('./../config/db');

var mainController = require("../controllers/mainController");
mainController.init(app);
/* GET home page. */

router.get('/', mainController.renderIndex);
router.get('/list',mainController.getLocations);
router.get('/count',mainController.getNumberOfBattles);
router.get('/stats',mainController.getStats);
router.get('/search',mainController.searchData);

module.exports = router;