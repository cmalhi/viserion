
var socketInstance = function(io) {
  io.on('connection', function(socket) {

    socket.on('titleChange', function(title) {
      console.log('title', title)
      io.sockets.emit('titleChange', title);
      // TODO: .to(x) to SPECIFY SOCKET ID;
    });

  });
};

module.exports = socketInstance;