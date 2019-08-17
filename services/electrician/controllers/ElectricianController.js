var mongoose = require('mongoose');
var Electrician = require('../models/electrician');

var electricianController = {};

electricianController.list = function(req, res) {
    Electrician.find({}).exec((err, electrician) => {
        if(err) {

        }
        else {
            res.json(electrician);
        }
    })
}

electricianController.show = function(req, res) {
    Electrician.findOne({_id: req.params.id}).exec(function (err, electrician) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.json(electrician);
      }
    });
  };

  electricianController.save = function(req, res) {
    var electrician = new Electrician(req.body);
    electrician.save(function(err) {
      if(err) {
        console.log(err);
        res.json(err);
      } else {
        console.log("Successfully created an electrician."); 
         res.json("Success!");
      }
    });
  };


  electricianController.edit = function(req, res) {
    Electrician.findOne({_id: req.params.id}).exec(function (err, electrician) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.json(electrician);
      }
    });
  };

  electricianController.delete = function(req, res) {
    Electrician.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("Electrician deleted!");
      }
    });
  };

  module.exports = electricianController;
