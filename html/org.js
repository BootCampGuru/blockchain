
function RegisterOrganization() {


  var name = $("#name").val();
  var region = $("#region").val();
  //var supprice = $("#supprice").val();
  //var provprice = $("#provprice").val();
  var address = $("#dropdown").val();

  var url = "http://localhost:8001/addOrganizer/" + name + "/" + region + "/" + address;

   $.getJSON(url, function(result) {
  
       
        
      });

   window.location.href = "./Org.html";

};

$(document).ready(function() {

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