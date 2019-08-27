import axios from 'axios';
var uuid = require('uuid');

export var getUserLocation = function() {
  console.log("User position!")
    return new Promise((resolve, reject)=> {
      // console.log("Inside promise");
        navigator.geolocation.getCurrentPosition(
            position=>{
              const payload = {
                id: uuid.v1(),
                coords: {
                  accuracy: position.coords.accuracy,
                  altitude: position.coords.altitude,
                  altitudeAccuracy: position.coords.altitudeAccuracy,
                  heading: position.coords.heading,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  speed: position.coords.speed
                },
                timestamp: position.timestamp
              }
              resolve(payload);
            }, error => {
                reject(error);
            }
        )
    })
}

export var getElectriciansNearby = function(user) {
        return new Promise((resolve, reject) => {
                axios('http://localhost:4000/electrician/find',{
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json'
                  },
                  data: user
                }).then((response)=> {
                        resolve(response);
                })
                .catch((err) => {
                        console.log(err);
                        reject(err);
                })
        })
}
