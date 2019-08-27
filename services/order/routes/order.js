var express = require('express');

var router = express.Router();


var order = require('../controller/ordercontroller')


router.post('/', (req, res)=> {
     order.place(req, res);
})

module.exports = router;