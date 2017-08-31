
var socketInstance = function(io) {
  io.on('connection', function(socket) {
    socket.on('titleChange', function(data) {
      console.log('data 2', data);
      io.sockets.emit('titleChange', 'new-ish title');
      // TODO: .to(x) to SPECIFY SOCKET ID;
    });
  });
};

module.exports = socketInstance;