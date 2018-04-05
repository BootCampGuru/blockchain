


function RegisterSupplier(id) {
window.location.href = "./SupplierRegistration.html?id=" + id;
}

function RegisterProvider(id) {
window.location.href = "./ProviderRegistration.html?id=" + id;
}

$(document).ready(function() {


  $.getJSON("http://localhost:8001/getAllHealthOrganizers", function(result) {
  
      for (var i = 0; i < result.length; i++) {
       let id = result[i];
       
       $.getJSON("http://localhost:8001/getHealthOrganizerById/" + id, function(item) {
       
           $('#OrgTable').append('<tr><td>' + id + '</td><td>' + item[0]  + '</td>' + '<td>' +  item[1] +'</td>' + '<td> <a href="./SupplierRegistration.html?id=' + id + '">Register</a></td>' 
      + '<td> <a href="./ProviderRegistration.html?id=' + id + '">Register</a></td></tr>');

       });
     

}
      

    });


            //alert(result);
              //  
            
   
});