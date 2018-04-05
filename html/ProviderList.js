$(document).ready(function() {

	function Transfer()
	{

		alert('hello');
	}

  $.getJSON("http://localhost:8001/getAllProviders", function(result) {
  
      for (var i = 0; i < result.length; i++) {
       let id = result[i];
       
       $.getJSON("http://localhost:8001/getProviderByAddress/" + id, function(item) {
       
           $('#SuppTable').append('<tr><td>' + item[0] + '</td><td>' + '<a href="./UserRecord.html?host=' + id + '">Register</a></td><td>' + item[1]  + '</td>' + '<td>' +  item[2] +'</td>' 

           	+ '<td><a href="./ApprovalPage.html?id='+ id + "&host=" + item[2] + "&type=provider" + '">Yes<a/>/<a href="./ApprovalPage.html?id=' + id + "&host=" + item[2] + "&type=provider"+'">No</a></td>'
           	+ '<td><a target="_blank" href="' + 'https://www.google.com/maps/@' + item[3] + ',' + item[4] +'">Map</a></td>' + '<td>' + item[5] + '</td>' + '<td>' + item[6] + '</td>' + '<td><a href="http://localhost:8001/readqrcode"><img src="QRCode.png"></a></td>' + '</tr>');

       });
     

}
      

    });
   
});