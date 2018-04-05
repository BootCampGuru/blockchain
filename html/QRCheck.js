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

var hash = GetURLParameter('hash');

var url = "http://localhost:8001/readqrcode/";
  
   $.getJSON(url, function(result) {
  
  	alert(result);
    //window.location.href = "./UserRecords.html";
        //window.location.href = "./UserRecords.html";

       // $('input[type=text].hashrecord').val(result);
       
      });
});