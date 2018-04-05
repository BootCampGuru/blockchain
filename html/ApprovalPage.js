

$(document).ready(function() {

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

var id = GetURLParameter('id');
var host = GetURLParameter('host');
var type = GetURLParameter('type');

if(type == 'provider')
{
var url = "http://localhost:8001/approveProvider/" + id + "/" + host;
  
   $.getJSON(url, function(result) {
  
       alert(result);
       
      });
 }
 if(type == 'supplier')
{
var url = "http://localhost:8001/approveSupplier/" + id + "/" + host;
  
   $.getJSON(url, function(result) {
  
       alert(result);
       
      });
 }

  $.getJSON("http://localhost:8001/getAllSuppliers", function(result) {
  
      for (var i = 0; i < result.length; i++) {
       let id = result[i];
       
       $.getJSON("http://localhost:8001/getSupplierByAddress/" + id, function(item) {
       
           $('#SuppTable').append('<tr><td>' + item[0] + '</td><td>' + item[2]  + '</td>'  

           	+ '</tr>');

       });
     

}
      

    });

  $.getJSON("http://localhost:8001/getAllProviders", function(result) {
  
      for (var i = 0; i < result.length; i++) {
       let id = result[i];
       
       $.getJSON("http://localhost:8001/getProviderByAddress/" + id, function(item) {
       
           $('#SuppTable').append('<tr><td>' + item[0] + '</td><td>' + item[2]  + '</td>'  

            + '</tr>');

       });
     

}
      

    });
   
});