var express = require('express');
var router = express.Router();
var util = require('util');
var SerialPort = require("serialport").SerialPort
var xbee_api = require('xbee-api');
//***********************
var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

var serialport = new SerialPort("/dev/tty.usbserial-A600eIjY", {
  baudrate: 9600,
  parser: xbeeAPI.rawParser()
});

//************************
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/colorChange', function colorChange(req, res) {
  console.log(req.body);
  setColor(req.body);
  res.send({
    data: 'Color where send'
  });
});

serialport.on("open", function() {
  console.log('Serial Port open');
  discover();
});

serialport.on("error", function(err) {
  console.log(err);
});

// All frames parsed by the XBee will be emitted here
xbeeAPI.on("frame_object", function(frame) {
    console.log(frame);
});

function setColor(data){
  //console.log(data.red);
  var frame_obj = {
    type: 0x10, // xbee_api.constants.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST
    id: 0x01, // optional, nextFrameId() is called per default
    destination64: "0013A20040B17FCE", // default is broadcast address
    destination16: "fffe", // default is "fffe" (unknown/broadcast)
    sourceEndpoint: 0xA0,
    destinationEndpoint: 0xA1,
    clusterId: "1554",
    profileId: "C105",
    broadcastRadius: 0x00, // optional, 0x00 is default
    options: 0x00, // optional, 0x00 is default
    data: [data.red, data.white, data.blue, data.green] // Can either be string or byte array.
  }
  //console.log(xbeeAPI.buildFrame(frame_obj));
  serialport.write(xbeeAPI.buildFrame(frame_obj));
}

function discover(){
  //console.log(data.red);
  var frame_obj = {
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "ND",
    commandParameter: [],
  };
  console.log(xbeeAPI.buildFrame(frame_obj));
  serialport.write(xbeeAPI.buildFrame(frame_obj));
}


module.exports = router;
