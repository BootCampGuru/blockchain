


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
       
           $('#OrgTable').append('<tr><td>' + item[4] + '</td><td>' + item[0]  + '</td>' + '<td>' +  item[1] +'</td>' + '<td>' +  item[2] +'</td>' + '<td>' +  item[3] +'</td>' + '<td> <a href="./SupplierRegistration.html?id=' + item[4] + '">Register</a></td>' 
      + '<td> <a href="./ProviderRegistration.html?id=' + item[4] + '">Register</a></td></tr>');

       });
     

}
      

    });


            //alert(result);
              //  
            
   
});