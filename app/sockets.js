
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
      console.log('okay fine I will ask Alfred to change you');
      io.sockets.emit('imgChange', 'ok changing');
    });

    socket.on('imgChange2', function(img) {
      console.log(1, img)
      io.sockets.emit('imgChange2', img);
    });

  });
};

module.exports = socketInstance;