var mongoose = require('mongoose');
var Address = require('../models/electrician');

var address = {};

address.insert = function () {
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