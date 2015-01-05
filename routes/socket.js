var xbee = require('../src/xbee.js');

var xbeeNode = new xbee();
var sessionSocket = undefined;

// Set session socket
exports.setSessionSocket = function(socket) {
  sessionSocket = socket;
};

// Reset session socket
exports.resetSessionSocket = function() {
  console.log('Reset Socket');
  sessionSocket = undefined;
};

// Init session socket
exports.init = function(socket) {
  console.log('init');
  if(sessionSocket !== undefined) {
    if (!xbeeNode.nodeInfos.length) {
      xbeeNode.nodeDiscover();
    } else {
      xbeeNode.nodeInfos.forEach(function(node){
        sessionSocket.emit('addNodes', node);
      });
    }
  }
};

// Set color event
exports.setColor = function(socket){
  socket.on('setColor', function(data) {
    xbeeNode.sendData([parseInt(data.red,10), parseInt(data.green,10),parseInt(data.blue,10), parseInt(data.white,10)],data.remote64);
  });
};

xbeeNode.on("discovered", function(res) {
  console.log(res);
  sessionSocket.emit('addNodes',res);
});

xbeeNode.on("error", function(err) {
  console.log('Error:');
  console.log(err);
});
