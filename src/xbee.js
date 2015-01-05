// Xbee
// Sending and receiving API frames to XBee coordinator over a serial port
var util        = require('util');
var serialPort  = require('serialport').SerialPort
var xbee_api    = require('xbee-api');
var config      = require('../src/config.json');
var util        = require('util');
var events      = require('events');

var C           = xbee_api.constants;
var xbeeApi     = new xbee_api.XBeeAPI({ api_mode: 2 });
var serialPort  = new serialPort(config.port, {
                        baudrate: config.baudrate,
                        parser: xbeeApi.rawParser()
                      });

// Constructor.
// Setup variables and Events.
// this.nodeInfos contains all XBee nodes after nodeDiscovver.
function Xbee() {
  self = this;
  this.nodeInfos = [];

  // All frames parsed by the XBee will be emitted here
  xbeeApi.on('frame_object', function(frame) {
    console.log(frame);
    if(frame.command === 'ND'){
      self.nodeInfos.push(frame.nodeIdentification);
      self.emit('discovered',frame.nodeIdentification);
    }
  });

  serialPort.on('error', function(err) {
    self.emit('error',err);
  });

  serialPort.on('open', function() {
    console.log('Serial Port open');
  });
}

// Add emit event (inherits)
Xbee.prototype = new events.EventEmitter;

// Find available XBees.
// If XBee is discovered, thei nformation is pushed to this.nodeInfos and the
// discovered event is emited.
Xbee.prototype.nodeDiscover = function() {
  var frame_obj = {
    type: C.FRAME_TYPE.AT_COMMAND,
    command: 'ND',
    id: 1,
    commandParameter: [],
  };
  this.nodeInfos = [];
  serialPort.write(xbeeApi.buildFrame(frame_obj));
};

// Send data to XBee.
Xbee.prototype.sendData = function(data, destination64) {
  var frame_obj = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // optional, nextFrameId() is called per default
    destination64: destination64, // default is broadcast address
    destination16: 'fffe', // default is 'fffe' (unknown/broadcast)
    broadcastRadius: 0x00, // optional, 0x00 is default
    options: 0x00, // optional, 0x00 is default
    data: data // Can either be string or byte array.
  }
  serialPort.write(xbeeApi.buildFrame(frame_obj));
}
/*
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err);
});
*/
module.exports = Xbee;
