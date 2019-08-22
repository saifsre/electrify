var mongoose = require('mongoose');
var Electrician = require('../models/electrician');
var io = require('socket.io-client');
var electricianController = {};

//list all the electricians

electricianController.list = function(req, res) {
    Electrician.find({}).exec((err, electrician) => {
        if(err) {

        }
        else {
            res.json(electrician);
        }
    })
}

//list an electrician where id = req.params.id

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

  //create and save an electrician
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

// Edit an electrician
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
// Delete an electrician
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

  //Find registered electricians from the given lat lon range;
  electricianController.find = function(req, res) {
     
  }

  module.exports = electricianController;
