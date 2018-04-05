$(document).ready(function() {

  $.getJSON("http://localhost:8001/getAllUsers", function(result) {
  
      for (var i = 0; i < result.length; i++) {
       let id = result[i];
       
       $.getJSON("http://localhost:8001/getUserByAddress/" + id, function(item) {
       
           $('#SuppTable').append('<tr><td>' + item[0] + '</td><td>' + item[1]  + '<td>' + item[4] +'</td>' + '</td>' + '<td>' + item[3] + '</td>'

           	+ '<td><a href="./UserApprovalPage.html?id=' + id  + '&host=' + item[2] + '">Immunize<a/></td>'
           	
	+ '<td><a href="./ViewPage.html?id='+ id + "&hash=" + item[3] + '">View<a/></td>'
           	

           	+ '</tr>');

       });
     

}
      

    });
   
});