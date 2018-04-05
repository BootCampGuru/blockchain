
// function AuthorizeUser() {


//   var hash = $("#hash").val();

//    var id = $("userid").val();  

//    var host = $("host").val();

//   var url = "http://localhost:8001/uploadDocument/" + id + "/" + host + "/" + hash;

//    $.getJSON(url, function(result) {
  
       
        
//       });


//  window.location.href = "./UserRecords.html";

// };




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


var url = "http://localhost:8001/uploadDocument/" + id + "/" + host;
  
   $.getJSON(url, function(result) {
  
  window.location.href = "./UserRecords.html";
        //window.location.href = "./UserRecords.html";

       // $('input[type=text].hashrecord').val(result);
       
      });
 

   
});