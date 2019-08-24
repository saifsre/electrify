var express = require('express');

var router = express.Router();

var address = require('../controllers/AddressController');

router.get('/', (req, res)=> {
    address.list(req, res);
});

router.post('/', (req, res) => {
    //address.insert(req, res);
})

module.exports = router;
