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
    socket.on('imgChange', function(id) {
      io.sockets.emit('imgChange', id);
    });

    socket.on('imgChange2', function(data) {
      io.sockets.emit('imgChange2', data);
    });

    // Header color
    socket.on('colorChange', function(data) {
      io.sockets.emit('colorChange', data);
    });

    socket.on('colorChange2', function(color) {
      io.sockets.emit('colorChange2', color);
    });

  });
};

module.exports = socketInstance;
