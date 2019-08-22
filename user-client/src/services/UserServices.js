import axios from 'axios';

function generateid() {
    var text = '';
    var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
export var getUserLocation = function() {
    return new Promise((resolve, reject)=> {
        navigator.geolocation.getCurrentPosition(
            position=>{
              const payload = {
                id: generateid(),
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
        console.log(user);
        return new Promise((resolve, reject) => {
                axios.post('', user).then((response)=> {
                        resolve(response);
                })
                .catch((err) => {
                        console.log(err);
                        reject(err);
                })
        })
}
