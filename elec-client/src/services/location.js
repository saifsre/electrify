 var elecServices = function() {
    this.emitLocation = function(socket, myPosition, state) {
      return new Promise((resolve, reject)=> {
        var elec = state.state.electrician;
        navigator.geolocation.getCurrentPosition(
          position=>{
            const payload = {
              id: state.id,
              coords: {
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed
              },
              timestamp: position.timestamp,
              electrician: elec
            } 
          socket.emit('elecPosition', JSON.stringify(payload)); 
          let tempPosition = { ...myPosition };
          tempPosition.latitude = position.coords.latitude;
          tempPosition.longitude = position.coords.longitude;
          state.setState({
            myPosition: tempPosition,
            isLoading: false,
          });
          resolve("Success");
        },
        error => reject(error),
        { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 }
        );
      })
    }
    this.getUserLocation = function(t) {
        t.socket.on('otherUserPositions', (positionsData)=> {
          positionsData = JSON.parse(positionsData)
          let tempUsers = {...t.state.users};
          tempUsers[positionsData.id] = {...positionsData};
          t.setState({
            users: tempUsers
          })
        })
    }
}

export default new elecServices;


