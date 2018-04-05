
function RegisterSupplier() {


  var name = $("#name").val();
  
  var id = $("#dropdown").val();
  
  var host = $("#host").val();
  

  var url = "http://localhost:8001/AddSupplierInfo/" + name + "/" + id + "/" + host;

   $.getJSON(url, function(result) {
  
       
        
      });



   window.location.href = "./SupplierList.html";

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

  var h = $('#host');
  h.val(GetURLParameter('id'));

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