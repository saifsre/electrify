var io = require('socket.io-client');
var socket =  io.connect('http://location:5000', {reconnect: true});
socket.on('connect', function onConnect(){
    console.log('This Order Service is now connected to the location server.');
  });
  
var order = {}


order.place = function(req, res) {
    socket.emit('userPosition', JSON.stringify(req.body));
     res.status(200).send('Ordered!');
}

module.exports = order;