var socket = io.connect();

socket.on('addNodes',function(data){
  console.log(data);
  createXbeeNode(data);
});

function createXbeeNode(data){
  var root = $('#xbeeNodeList');
  var colors = ['red', 'green', 'blue', 'white'];

  var div1 = $("<div/>")
    .addClass('col-md-6');
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
      .attr('value', '0')
      .attr('min', '0')
      .attr('max', '255')
      .attr('step', '1')
      .attr('oninput','setColor(this)')
      .attr('onchange','setColor(this)')
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

function setColor(color){
  console.log('change');
}
/*
$("[name='range']").on('change', function(){
  console.log('change');
  ajaxRequest({ red: $('#rangeRed').val(),
                green: $('#rangeGreen').val(),
                blue: $('#rangeBlue').val(),
                white: $('#rangeWhite').val()
              },'/colorChange');
});
*/
function ajaxRequest(data,url){
  $.ajax({
    url: url,
    data: data,
    type: 'post',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    },
    error: function (request, status, error) {
      console.log('Error during request. request.responseText: ' + request.responseText + ' Error: ' + error + ' Status: ' + status);
    }
  });
  return false;
}
