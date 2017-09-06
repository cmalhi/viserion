var socketInstance = function(io) {
  io.on('connection', function(socket) {

    // Title
    socket.on('launchTitleModal', function(textData) {
      io.sockets.emit('launchTitleModal', textData);
      // TODO: .to(x) to SPECIFY SOCKET ID;
    });

    socket.on('changeTitleDom', function(data) {
      io.sockets.emit('changeTitleDom2', data);
    });

    // Long Text
    socket.on('launchLongTextModal', function(id) {
      io.sockets.emit('launchLongTextModal', id);
    });

    socket.on('changeLongTextDom', function(data) {
      io.sockets.emit('changeLongTextDom2', data);
    })

    // Image
    socket.on('launchImageModal', function(id) {
      io.sockets.emit('launchImageModal', id);
    });

    socket.on('changeImageDom', function(data) {
      io.sockets.emit('changeImageDom2', data);
    });

    // Header color
    socket.on('colorChange', function(data) {
      io.sockets.emit('colorChange', data);
    });

    socket.on('colorChange2', function(color) {
      io.sockets.emit('colorChange2', color);
    });

    // Add new component
    socket.on('newPref', function(name){
      // Display new component in webview
      console.log('name', name)
      // socket.emit('changePref')
    });

  });
};

module.exports = socketInstance;
