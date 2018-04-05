$(document).ready(function() {

  $.getJSON("http://localhost:8001/getAllSuppliers", function(result) {
  
      for (var i = 0; i < result.length; i++) {
       let id = result[i];
       
       $.getJSON("http://localhost:8001/getSupplierByAddress/" + id, function(item) {
       
           $('#SuppTable').append('<tr><td>' + item[0] + '</td><td>' + item[1]  + '</td>' + '<td>' +  item[2] +'</td>' 

           	+ '<td><a href="./ApprovalPage.html?id='+ id + "&host=" + item[2] + "&type=supplier" +  '">Yes<a/>/<a href="./DenialPage.html?id=' + id + "&host=" + item[2] + "&type=supplier" + '">No</a></td>'
           + '<td><a href="Buy">Buy</a></td>' 	+ '</tr>');

       });
     

}
      

    });
   
});