var socketInstance = function(io) {
  io.on('connection', function(socket) {

    // Title
    socket.on('launchTitleModal', function(textData) {
      io.sockets.emit('launchTitleModal', textData);
      // TODO: .to(x) to SPECIFY SOCKET ID;
    });

    // deprecated
    // Editable Short Text
    // socket.on('changeTitleDom', function(data) {
    //   io.sockets.emit('changeTitleDom2', data);
    // });
    // socket.on('changeLongTextDom', function(data) {
    //   io.sockets.emit('changeLongTextDom2', data);
    // });

    // Long Text
    socket.on('launchLongTextModal', function(id) {
      io.sockets.emit('launchLongTextModal', id);
    });

    // Image
    socket.on('launchImageModal', function(data) {
      io.sockets.emit('launchImageModal', data);
    });

    // deprecated
    // socket.on('changeImageDom', function(data) {
    //   io.sockets.emit('changeImageDom2', data);
    // });

    // Header color
    socket.on('colorChange', function(data) {
      io.sockets.emit('colorChange', data);

    });

    // deprecated
    // socket.on('colorChange2', function(color) {
    //   io.sockets.emit('colorChange2', color);
    // });

    //Pricing component
    socket.on('launchPricingModal', function(list) {
      io.sockets.emit('launchPricingModal2', list);
    });

    socket.on('updatePricingList', function(list) {
      io.sockets.emit('updatePricingList2', list);
    });

    //Pricing component
    socket.on('launchListModal', function(list) {
      io.sockets.emit('launchListModal2', list);
    });

    // Add new component 
    // socket.on('updatePref', function(sampleData){
    //   // Display new component in webview
    //   io.sockets.emit('changePref', sampleData)
    // });

    socket.on('addPref', function(addition) {
      io.sockets.emit('addPrefDom', addition);
      io.sockets.emit('addPrefStore', addition.newComponent)
    });

    socket.on('updatePref', function(newPref) {
      // console.log('updatePref')
      // console.log('newPref', newPref)
      io.sockets.emit('updatePrefDom', newPref);
      io.sockets.emit('updatePrefStore', newPref.newPref);
    });

    socket.on('getPrefs', (message) => {
      io.sockets.emit('getPrefsUserEdit', 'Getting prefs from user edit file')
    });

    socket.on('sendPrefsFromUserEdit', (prefs) => {
      io.sockets.emit('updatePrefWebviewMount', prefs);
    });
    
  });
};

module.exports = socketInstance;
