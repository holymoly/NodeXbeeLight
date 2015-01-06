var xbee = require('../src/xbee.js');
var fs = require("fs");

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
        readColor(node.remote64, node,function(err,colors){
          sessionSocket.emit('addNodes', node, colors );
        });
      });
    }
  }
};

// Set color event
exports.setColor = function(socket){
  socket.on('setColor', function(data) {
    fs.writeFile('./session/' + data.remote64, JSON.stringify( data , null, 2), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + data.remote64);
      }
    });
    xbeeNode.sendData([parseInt(data.red,10), parseInt(data.green,10),parseInt(data.blue,10), parseInt(data.white,10)],data.remote64);
  });
};


xbeeNode.on("discovered", function(res) {
  readColor(res.remote64, res,function(err,colors){
    sessionSocket.emit('addNodes', res, colors );
  });
});

function readColor(remote64,res,cb) {
  fs.readFile('./session/' + remote64, 'utf8', function (err,data) {
    if (err) {
      colorValues = {remote64 : res.remote64, red : 0, green : 0, blue : 0, white : 0 };
      console.log(err);
      cb(err, colorValues);
    } else {
      cb(null, data);
    }
  });
}

xbeeNode.on("error", function(err) {
  console.log('Error:');
  console.log(err);
});
