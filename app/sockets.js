
var socketInstance = function(io) {
  io.on('connection', function(socket) {

    // Title
    socket.on('titleChange', function(title) {
      console.log('title change')
      io.sockets.emit('titleChange2', title);
      // TODO: .to(x) to SPECIFY SOCKET ID;
    });

    // socket.on('titleChange2', function(title) {
    //   io.sockets.emit('titleChange2', title);
    // });

    // Image
    socket.on('imgChange', function(img) {
      io.sockets.emit('imgChange', 'ok changing');
    });

    socket.on('imgChange2', function(img) {
      io.sockets.emit('imgChange2', img);
    });

    // Header color
    socket.on('colorChangeDOM', function(data) {
      console.log('color change dom')
      io.sockets.emit('colorChange', data);
    });
    socket.on('orderChanged', function(data) {
      //send to dom 
      console.log('changed order dom')
      io.sockets.emit('orderChangedDOM', data);
    });

  });
};

module.exports = socketInstance;