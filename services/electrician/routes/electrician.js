var express = require('express');
var router = express.Router();
var electrician = require('../controllers/ElectricianController');

// Get all electricians

router.get('/', function(req, res) {
    electrician.list(req, res);
})

// Get single electrician by id
router.get('/show/:id', function(req, res) {
    electrician.show(req, res);
});

//Save electrician
router.post('/save', function(req, res) {
    //console.log(req.body);
    electrician.save(req, res);
})

module.exports = router;
