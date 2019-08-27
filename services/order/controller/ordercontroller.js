var io = require('socket.io-client');
var socket =  io.connect('http://localhost:5000', {reconnect: true});

var order = {}


order.place = function(req, res) {
    socket.emit('userPosition', JSON.stringify(req.body));
     res.status(200).send('Ordered!');
}

module.exports = order;