$('#rangeRed').on('input', function(){
  ajaxRequest({ red: $('#rangeRed').val(),
                green: $('#rangeGreen').val(),
                blue: $('#rangeBlue').val(),
                white: $('#rangeWhite').val()
              },'/colorChange');
});

$('#rangeGreen').on('input', function(){
  ajaxRequest({ red: $('#rangeRed').val(),
                green: $('#rangeGreen').val(),
                blue: $('#rangeBlue').val(),
                white: $('#rangeWhite').val()
              },'/colorChange');
});

$('#rangeBlue').on('input', function(){
  ajaxRequest({ red: $('#rangeRed').val(),
                green: $('#rangeGreen').val(),
                blue: $('#rangeBlue').val(),
                white: $('#rangeWhite').val()
              },'/colorChange');
});

$('#rangeWhite').on('input', function(){
  ajaxRequest({ red: $('#rangeRed').val(),
                green: $('#rangeGreen').val(),
                blue: $('#rangeBlue').val(),
                white: $('#rangeWhite').val()
              },'/colorChange');
});

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
