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
    socket.on('newPref', function(sampleData){
      // Display new component in webview
      // console.log('sockets.js newPref', name)
      // const sampleData = JSON.stringify({
      //         components: [
      //           {
      //             name: 'Hero1',
      //             attr: {
      //               bgColor: '#eee',
      //               title: 'Custom title',
      //             }
      //           },
      //           {
      //             name: 'TextContent',
      //             attr: {
      //               title: 'With All Eyes on the South, the Most Important Art Show in America Is Underway in Pittsburgh',
      //               body: 'The exhibition—which features works from the likes of Kerry J. Marshall, Jenny Holzer, Kara Walker, and Lorna Simpson—begins with “A More Perfect Union,” an examination of national identity and symbols.'
      //             }
      //           },
      //           {
      //             name: 'Footer',
      //             attr: {
      //               text: 'I am good foot'
      //             }
      //           }
      //         ]
      //       });

      // sampleData = {
      //   name: 'TextContent',
      //   attr: {
      //     title: 'hello',
      //     body: 'goodbye',
      //   }
      // }

      io.sockets.emit('changePref', sampleData)
    });

  });
};

module.exports = socketInstance;
