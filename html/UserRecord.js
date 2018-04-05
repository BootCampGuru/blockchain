
function RegisterUser() {


  var firstname = $("#firstname").val();

  var lastname = $("#lastname").val();
  
  var id = $("#dropdown").val();
  
  var cost = $("#cost").val();

  var host = $("#hostname").val();
  

  var url = "http://localhost:8001/RegisterUser/" + firstname + "/" + lastname + "/" + id + "/" + cost + "/" + host;

   $.getJSON(url, function(result) {
  
       
        
      });


 window.location.href = "./UserRecords.html";

};

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

  var h = GetURLParameter('host');
   $("#hostname").val(h);

    var s = $('<select />');
    s.attr('id', 'dropdown');
    ddlurl = "http://localhost:8001/getOrganizersList";
      $.getJSON(ddlurl, function(result){
          var i = 0;
            for(var val in result) {
              
    $('<option />', {value: result[i], text: result[i]}).appendTo(s);
      i = i + 1;
        }
      s.appendTo('#selectaddress'); 

      });
   
});