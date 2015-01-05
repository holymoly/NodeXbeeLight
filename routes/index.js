var express = require('express');
var router = express.Router();
var util = require('util');

//************************
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/colorChange', function colorChange(req, res) {
  console.log(req.body);
  //setColor(req.body);
  //xbeeNode.sendData([req.body.red, req.body.green, req.body.blue, req.body.white]);
  res.send({
    data: 'Color where send'
  });
});

module.exports = router;
