
var socketInstance = function(io) {
  io.on('connection', function(socket) {

    socket.on('titleChange', function(title) {
      io.sockets.emit('titleChange', title);
      // TODO: .to(x) to SPECIFY SOCKET ID;
    });

    socket.on('titleChange2', function(title) {
      io.sockets.emit('titleChange2', title);
    });

    socket.on('imgChange', function(img) {
      io.sockets.emit('imgChange', 'ok changing');
    });

    socket.on('imgChange2', function(img) {
      io.sockets.emit('imgChange2', img);
    });

  });
};

module.exports = socketInstance;