var express = require('express');
var router = express.Router();
var util = require('util');
var xbee = require('../src/xbee.js');

//***********************
var xbeeNode = new xbee();
//************************
/* GET home page. */
router.get('/', function(req, res) {
  if (!xbeeNode.nodeInfos.length) {
    xbeeNode.nodeDiscover();
  } else {
    console.log(xbeeNode.nodeInfos);
  }
  res.render('index', { title: 'Express' });
});

router.post('/colorChange', function colorChange(req, res) {
  console.log(req.body);
  //setColor(req.body);
  xbeeNode.sendData([req.body.red, req.body.green, req.body.blue, req.body.white]);
  res.send({
    data: 'Color where send'
  });
});

xbeeNode.on("discovered", function(res) {
  console.log('XBee Response:');
  console.log(res);
});

xbeeNode.on("error", function(err) {
  console.log('Error:');
  console.log(err);
});

module.exports = router;
