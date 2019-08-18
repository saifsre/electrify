var mongoose = require('mongoose');
var Address = require('../models/electrician');

var address = {};

address.insert = function (req, res) {
    var address = new Address(req.body);
    Address.save(function(err) {
      if(err) {
        console.log(err);
        res.json(err);
      } else {
        console.log("Successfully created an address."); 
         res.json("Success!");
      }
    });
}

address.list = function (req, res) {
    Address.find({}).exec(((err, address)=> {
        if(err) {
        }
        else {
            res.json(address);
        }
    }))
}

module.exports = address;