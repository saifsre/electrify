var mongoose = require('mongoose');
var Address = require('../models/address');

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
    console.log("Get Address Received")
    Address.find({}).exec(((err, address)=> {
        if(err) {
             res.json(err);
        }
        else {
            res.json(address);
        }
    }))
}
address.save = function(req, res) {
    return new Promise((resolve, reject)=> {
        var address = new Address(req.body.address);
        address.save(function(err, add) {
          if(err) {
              res.json(err, 404);
             reject(err);
          } else {
            console.log("Successfully created an Address."); 
            resolve(add.id); 
          }
        });
    })

  };

module.exports = address;