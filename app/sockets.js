
var socketInstance = function(io) {
  io.on('connection', function(socket) {

    // Title
    socket.on('titleChange', function(title) {
      io.sockets.emit('titleChange', title);
      // TODO: .to(x) to SPECIFY SOCKET ID;
    });

    socket.on('titleChange2', function(title) {
      io.sockets.emit('titleChange2', title);
    });

    // Image
    socket.on('imgChange', function(img) {
      io.sockets.emit('imgChange', 'ok changing');
    });

    socket.on('imgChange2', function(img) {
      io.sockets.emit('imgChange2', img);
    });

    // Header color
    socket.on('colorChange', function(data) {
      io.sockets.emit('colorChange', data);
    });

  });
};

module.exports = socketInstance;