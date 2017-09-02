var socketInstance = function(io) {
  io.on('connection', function(socket) {

    // Title
    socket.on('changeTitle', function(title) {
      io.sockets.emit('launchTitleModal', title);
      // TODO: .to(x) to SPECIFY SOCKET ID;
    });

    socket.on('changeTitleDom', function(title) {
      io.sockets.emit('changeTitleDom', title);
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
