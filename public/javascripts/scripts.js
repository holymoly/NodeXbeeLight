var socket = io.connect();

socket.on('addNodes',function(data, colorValues){
  createXbeeNode(data, colorValues);
});

function createXbeeNode(data, colorValues){
  var root = $('#xbeeNodeList');
  var colors = ['red', 'green', 'blue', 'white'];
  var values = JSON.parse(colorValues);

  var div1 = $("<div/>")
    .addClass('col-md-6')
    .attr('id', data.remote64);
  var h3 = $("<H3/>")
    .text(data.remote64)
    .appendTo(div1);
  colors.forEach(function(color) {
    var div2 = $("<div/>")
      .addClass('col-md-12')
      .appendTo(div1);
    var div3 = $("<div/>")
      .addClass('col-md-1')
      .text(color)
      .appendTo(div2);
    var div4 = $("<div/>")
      .addClass('col-md-3')
      .appendTo(div2);
    var input1 = $("<input/>")
      .attr('type', 'range')
      .attr('value', values[color])
      .attr('data-color', color)
      .attr('data-node', data.remote64)
      .attr('min', '0')
      .attr('max', '255')
      .attr('step', '1')
      .attr('oninput',"setColor('" + data.remote64 + "')")
      .attr('onchange',"setColor('" + data.remote64 + "')")
      .appendTo(div4);
  });
  div1.appendTo(root);

  var nodeInfo = $("<div/>")
    .addClass('col-md-6');
  h3 = $("<H3/>")
    .text('Node info')
    .appendTo(nodeInfo);
  var ul = $("<ul/>")
    .appendTo(nodeInfo);

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var li = $("<li/>")
      .text(key + ' : ' + data[key])
      .appendTo(ul);
    }
  }
  nodeInfo.appendTo(root);
}

function setColor(remote64) {
  var nodeElement = document.getElementById(remote64);
  var colors = $(nodeElement).find("[data-node='" + remote64 + "']");
  var data = {};

  data['remote64'] = remote64;
  data[$(colors[0]).data('color')] = $(colors[0]).val();
  data[$(colors[1]).data('color')] = $(colors[1]).val();
  data[$(colors[2]).data('color')] = $(colors[2]).val();
  data[$(colors[3]).data('color')] = $(colors[3]).val();

  socket.emit('setColor', data );
}
