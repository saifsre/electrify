var mongoose = require('mongoose');
var Electrician = require('../models/electrician');
var io = require('socket.io-client');
var GeoPoint = require('geopoint');
var electricianController = {};

var locationHistory = []

var socket =  io.connect('http://localhost:5000');

socket.on('connect', function onConnect(){
  console.log('This socket is now connected to the location server.');
});

 socket.on('otherElecPositions', positionsData => {
   console.log("Electricians Detected!")
   locationHistory.push(positionsData);
});


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
  electricianController.find =  function(req, res) {
     var userLocation = req.body;
     var response = [];
     var point1 = new GeoPoint(userLocation.coords.latitude, userLocation.coords.longitude);
     for(var i = 0; i < locationHistory.length; i++) {
      var loc = JSON.parse(locationHistory[i]);

      var lat = loc.coords.latitude;
      var lon = loc.coords.longitude;

      var point2 = new GeoPoint(lat, lon);
      var distance = point1.distanceTo(point2, true);
      if (isNaN(distance)) {
       distance = 0;
      }
      var obj = {
        name: "test",
        location:"test",
        distance: distance,
        description:"test"
      }
      response.push(obj);
     }
    res.json(response);
  }
  module.exports = electricianController;
