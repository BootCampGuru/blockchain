pragma solidity ^0.4.21;

contract ImmuContract
{

 event userRegistered(address from, uint amount);


 address public owner;
 address[] public Orgs;
 address[] public Supps;
 address[] public Provs;
 address[] public Users;

struct Supplier 
{

      string name;
      address org;
      string supplierLon;
      string supplierLat;
      bool isApproved;
}

struct WorldHealthOrg
{

    string Name;
    string Region;

}

struct Provider
{
      string name;
      address org;
      string Lon;
      string Lat;
      bool isApproved;
}

 struct User
 {
     string firstName;
     string lastName;
     address provider;
     string certificateHash;

 }

 struct Fund
 {
   uint amount;  
   address to;
}

 mapping(address => uint) clearedTransactions;
// //mapping(address => uint) clearedProviderTransactions;
// //mapping(address => uint) clearedSupplierTransactions;
// //mapping(address => uint) clearedUserTransactions;

mapping(address => Fund) pendingTransactions;
// mapping(address => Fund) pendingProviderTransactions;
// mapping(address => Fund) pendingSupplierTransactions;
// mapping(address => Fund) pendingUserTransactions;


// mapping(address => uint) public SuppliersPaid;
// mapping(address => uint) public ProvidersPaid;
// mapping(address => uint) public UsersPaid;
 mapping(address => WorldHealthOrg) public WorldHealthList;
 mapping(address => Supplier) public SupplierList;
 mapping(address => Provider) public ProviderList;
 mapping(address => User) public UserList;

 mapping(address => bool) public OrgList;
 mapping(address => bool) public SuppList;
  mapping(address => bool) public ProvList;
 mapping(address => bool) public UList;

// function SupplierPay() payable public returns(bool success)
// {
//   SuppliersPaid[msg.sender] = msg.value;
//   NumOfSuppliers++;

// }

 function kill() public {
       if(msg.sender == owner) selfdestruct(owner);
    }



 function ImmuContract() public
 {
    owner = msg.sender;


 }

 function getAddress() view public returns(address)
 {
     return owner;
 }

 function getBalance() view public returns(uint)
 {
  return owner.balance;
 }

 function getHash(address user) view public returns(string)
 {
  return UserList[user].certificateHash;
 }


function uploadDocument(string hash, address user) public returns(bool)
{

  UserList[user].certificateHash = hash;
  //Transfer funds
 // if(pendingTransactions[user].amount >0)
  //{
     clearedTransactions[msg.sender] = clearedTransactions[msg.sender] + pendingTransactions[msg.sender].amount;
     pendingTransactions[msg.sender].amount = 0;

     //msg.sender.transfer(clearedTransactions[msg.sender]);
     // clearedTransactions[msg.sender] = 0;
   //}
  return true;
}


function getHealthOrganizer() view public returns(string, string, address)
{
    address host = Orgs[0];
    return (WorldHealthList[host].Name, WorldHealthList[host].Region, host );

} 

function getHealthOrganizerByAddress(address host) view public returns(string, string, address)
{
    return (WorldHealthList[host].Name, WorldHealthList[host].Region, host );

}

function getSupplierByAddress(address host) view public returns(string, bool, address)
{
    return (SupplierList[host].name,SupplierList[host].isApproved, SupplierList[host].org );

}

 function getProviderByAddress(address host) view public returns(string, bool, address, string, string, uint, uint)
{
     return (ProviderList[host].name,ProviderList[host].isApproved, ProviderList[host].org, ProviderList[host].Lat, ProviderList[host].Lon, pendingTransactions[host].amount, clearedTransactions[host]);

}

 function getUserByAddress(address host) view public returns(string, string, address, string, uint)
 {
     return (UserList[host].firstName, UserList[host].lastName,UserList[host].provider, UserList[host].certificateHash, host.balance );

 }

 function getAllProviders() view public returns(address[])
 {
   return Provs;
 }

 function getAllSuppliers() view public returns(address[])
 {
     return Supps;
 }

function getAllHealthOrganizers()view public returns(address[])
{

    return Orgs;
}

 function getAllUsers()view public returns(address[])
 {
   return Users;
 }

function AddAuthorizerInfo(address host, string name, string region) public returns(bool)
{
  require(OrgList[msg.sender] == false);
  OrgList[msg.sender] = true;
  WorldHealthList[msg.sender].Name = name;
  WorldHealthList[msg.sender].Region = region;
  Orgs.push(msg.sender);


  return true;

}

function AddSupplierInfo(address host, string name) public returns(bool)
{
    
  require(SuppList[msg.sender] == false);
  SuppList[msg.sender] = true;
  SupplierList[msg.sender].org = host;
  SupplierList[msg.sender].isApproved = false;
  SupplierList[msg.sender].name = name;
  Supps.push(msg.sender);
  //NumOfSuppliers = NumOfSuppliers + 1;
  //Send Eth to the Contract

   //uint cost = WorldHealthList[host].supplierCertificationCost;
  // owner.send(1 ether);
  // emit supplierPaid(msg.sender, 1);

   //pendingTransactions[host].from = msg.sender;
   //pendingTransactions[host].amount = cost;
   return true;
}

function AddProviderInfo(address host, string name) public returns(bool)
{
    
  require(ProvList[msg.sender] == false);
  ProvList[msg.sender] = true;
  ProviderList[msg.sender].org = host;
  ProviderList[msg.sender].isApproved = false;
  ProviderList[msg.sender].name = name;
  ProviderList[msg.sender].Lon = "-77.290685";
  ProviderList[msg.sender].Lat = "38.596236";
  clearedTransactions[msg.sender]  = 0;

  Provs.push(msg.sender);

  //Send Eth to the Contract

   //uint cost = WorldHealthList[host].providerCertificationCost;
   // owner.send(1 ether);
   // emit supplierPaid(msg.sender, 1);
    //pendingTransactions[host].from = msg.sender;
    //pendingTransactions[host].amount = cost;
   return true;
}

// function ApproveSupplier(address supplier, address host) public{
//   //Transfer money from Transaction account
  
//   uint suppcost = WorldHealthList[host].supplierCertificationCost;
//   pendingTransactions[host].amount = pendingTransactions[host].amount - suppcost;
//   clearedTransactions[host] = clearedTransactions[host] + suppcost;
//   //Send money to the Org

//   SupplierList[supplier].isApproved = true;
// }

// function DenySupplier(address supplier, address host) public{

//    SupplierList[supplier].isApproved = false;
//    uint suppcost = WorldHealthList[host].supplierCertificationCost;
//    pendingTransactions[host].amount = pendingTransactions[host].amount - suppcost;
//    clearedTransactions[host] = clearedTransactions[host] + suppcost - 10;
//    //clearedSupplierTransactions[supplier] = clearedSupplierTransactions[supplier]  + 10;


//    //send eth to org minus the deny fee

//    //send rest back to the supplier
   
// }


// function ApproveProvider(address provider, address host) public{
  
//    ProviderList[provider].isApproved = true;
//    //Money transactions internally
//   uint provcost = WorldHealthList[host].providerCertificationCost;
//   pendingTransactions[host].amount = pendingTransactions[host].amount - provcost;
//   clearedTransactions[host] = clearedTransactions[host] + provcost;
//   //Send money to the Org

 
// }

// function DenyProvider(address provider, address host) public{

//    SupplierList[provider].isApproved = false;
//    //Money transactions internally
//    uint provcost = WorldHealthList[host].supplierCertificationCost;
//    pendingTransactions[host].amount = pendingTransactions[host].amount - provcost;
//    clearedTransactions[host] = clearedTransactions[host] + provcost - 10;
//    //clearedSupplierTransactions[provider] = clearedSupplierTransactions[provider]  + 10;
  
// }

 function RegisterUser(string firstname, string lastname, address provider, uint amount) public returns(bool) {

   require(UList[msg.sender] == false);
   UList[msg.sender] = true;
   UserList[msg.sender].firstName = firstname;
   UserList[msg.sender].lastName = lastname;
   //UserList[msg.sender].certificateHash = "QmRmQPYk1qQjUEhiEdr8jQ8qTxgWcQb666bcNBgw1p6FBk";
   UserList[msg.sender].provider = provider;
   owner.send(amount);
   pendingTransactions[provider].to = provider;
   pendingTransactions[provider].amount +=  amount;
  
   Users.push(msg.sender);
   userRegistered(msg.sender, amount);
   
   return true;
 }


// function HasAddress(address host)view public returns(bool)
// {
//     return OrgList[host];
// }




// //Helper functions

// function bytes32ArrayToString(bytes32[] data) pure public returns (string) {
//         bytes memory bytesString = new bytes(data.length * 32);
//         uint urlLength;
//         for (uint i=0; i<data.length; i++) {
//             for (uint j=0; j<32; j++) {
//                 byte char = byte(bytes32(uint(data[i]) * 2 ** (8 * j)));
//                 if (char != 0) {
//                     bytesString[urlLength] = char;
//                     urlLength += 1;
//                 }
//             }
//         }
//         bytes memory bytesStringTrimmed = new bytes(urlLength);
//         for (i=0; i<urlLength; i++) {
//             bytesStringTrimmed[i] = bytesString[i];
//         }
//         return string(bytesStringTrimmed);
//     }

// function bytes32ToString(bytes32 x) pure public  returns (string) {
//     bytes memory bytesString = new bytes(32);
//     uint charCount = 0;
//     for (uint j = 0; j < 32; j++) {
//         byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
//         if (char != 0) {
//             bytesString[charCount] = char;
//             charCount++;
//         } 
//     }
//     bytes memory bytesStringTrimmed = new bytes(charCount);
//     for (j = 0; j < charCount; j++) {
//         bytesStringTrimmed[j] = bytesString[j];
//     }
//     return string(bytesStringTrimmed);
// }


}