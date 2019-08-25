var mongoose = require('mongoose');
var Electrician = require('../models/electrician');
var io = require('socket.io-client');
var GeoPoint = require('geopoint');
var address = require('./AddressController');
var electricianController = {};

var locationHistory = []

var socket =  io.connect('http://localhost:5000', {reconnect: true});

socket.on('connect', function onConnect(){
  console.log('This socket is now connected to the location server.');
});

 socket.on('otherElecPositions', positionsData => {
   console.log("Electricians Detected!");
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
  electricianController.save = async function(req, res) {
    var adId = await address.save(req, res);
    var elec = req.body.electrician;
    elec.address = adId;
    console.log(elec);
    var electrician = new Electrician(elec);

    electrician.save(function(err, elec) {
      if(err) {
        console.log(err);
        res.json("User already exists",404);
      } else {
        console.log("Successfully created an electrician."); 
         res.json("Success!" + elec.id);
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

  // Given user lat lon, find the nearest electrician available within 10km radius
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
      if(distance < 10) {
      var obj = {
        name: "Saif Khan",
        location:"Vancouver",
        distance: distance,
        description:"5 star rated electrician"
      }
      response.push(obj);
    }
    }
    console.log(response);
    console.log(locationHistory)
    res.json(response);
  }

  electricianController.findUserByEmailandPassword = function(req, res) {
    console.log(req.body)
    Electrician.findOne({email: req.body.email, password: req.body.password}).exec((err, elec)=> {
      if(err) {
         res.json(err, 404);
      }
      else {
        console.log(elec);
        if(elec) {
        console.log("success")
        res.json(elec, 200);
        }
        else {
          res.json("Invalid Login", 404);
        }
      }
    })
  }
  module.exports = electricianController;
