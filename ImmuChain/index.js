var express = require('express')
var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');
var http = require('http');
var app = express();
var bigInt = require("big-integer");
var ipfsAPI = require('ipfs-api');
var fs = require('fs');
var nodepgp = require('node-pgp');
var cmd = require('node-cmd');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values
var ipfs = ipfsAPI();
//var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')

code = fs.readFileSync('ImmuContract.sol').toString()

compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':ImmuContract'].interface)
ImmuContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':ImmuContract'].bytecode
let contractInstance = "";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 app.get('/readqrcode', function (req, res) {
   
         //const file = fs.readFileSync('encryptedfile.txt.gpg').toString();

         cmd.get(
        'gpg --decrypt encryptedfile.txt.gpg > filetest.txt',
        function(err, data, stderr){
            console.log('File has been encrypted');
            code = fs.readFileSync('filetest.txt').toString()
            res.send(code);
         }
         );
 
         //res.send(nodepgp.message.read(file));

  })
 
   app.get('/', function (req, res) {
   
         res.send(abiDefinition);
	})

    app.get('/getHash/:id', function (req, res) {
   
         res.send(contractInstance.getHash(req.params.id));
  })

   app.get('/uploadDocument/:useraddress/:host', function(req, res){


    const files = [
  {
    path: './tmp/' + 'authentication.txt.gpg'
  }]


ipfs.files.add(files, function(err, hash) {

  
  if (err) throw err; // If connection is closed
    console.log(hash[0].hash);  

    contractInstance.uploadDocument(hash[0].hash, req.params.useraddress, {from: req.params.host, gas:3000000});

    res.send(hash[0].hash);
});


   })

    app.get('/downloadDocument/:hash', function(req, res){
    

var wstream = fs.createWriteStream('encryptedfile.txt.gpg');


const validCID = "QmUEDpDzdxYeyNFHE7avqDHUKYiby7sCbrmA2QRV6eTe6a";

const stream = ipfs.files.getReadableStream(validCID)

stream.on('data', (file) => {

  if(file.type !== 'dir') {
    file.content.on('data', (data) => {
     wstream.write(data);
     console.log(data);
     //data.pipe(wstream)
    })
    file.content.resume()
  }
})


})



   app.get('/approveSupplier/:id/:host', function (req, res) {
   
    returnVal = contractInstance.ApproveSupplier(req.params.id, req.params.host, {from: req.params.id, gas:3000000});
     
         res.send('Approved');
  })

  app.get('/denySupplier/:id/:host', function (req, res) {
   
    returnVal = contractInstance.DenySupplier(req.params.id, req.params.host, {from: req.params.id, gas:3000000});
     
         res.send('Denied');
  })
   

    app.get('/approveProvider/:id/:host', function (req, res) {
   
    returnVal = contractInstance.ApproveSupplier(req.params.id, {from: req.params.id, gas:3000000});
     
         res.send('Approved');
  })

  app.get('/denyProvider/:id/:host', function (req, res) {
   
    returnVal = contractInstance.DenySupplier(req.params.id, {from: req.params.id, gas:3000000});
     
         res.send('Denied');
  })

     app.get('/getHealth', function (req, res, next) {
   
          res.send(contractInstance.getHealthOrganizer());
	})

     app.get('/TransferFunds/:id/:host', function(req,res,next)
     {

       web3.eth.sendTransaction(web3.toWei(0.1,'ether'), {from: req.params.id, to: req.params.host});

     })

       app.get('/AddSupplierInfo/:name/:id/:host', function (req, res, next) {
   try
   {
    returnVal = contractInstance.AddSupplierInfo(req.params.host,req.params.name, {from: req.params.id, gas:3000000}
     
      );
     res.send('Supplier Added');
}
  catch(error)
    {
res.send('Duplicate entry');
    }
     
  })


       app.get('/RegisterUser/:firstname/:lastname/:id/:amount/:host', function (req, res, next) {
  

 returnVal = contractInstance.RegisterUser(req.params.firstname,req.params.lastname,req.params.host, req.params.amount, {from: req.params.id, gas:3000000}
     
      );
   try
   {
   
     res.send('User Registered');
}
  catch(error)
    {
res.send('Duplicate entry');
    }
     
  })

  app.get('/AddProviderInfo/:name/:id/:host', function (req, res, next) {
   try
   {
    returnVal = contractInstance.AddProviderInfo(req.params.host,req.params.name, {from: req.params.id, gas:3000000}
     
      );
     res.send('Provider Added');
}
  catch(error)
    {
res.send('Duplicate entry');
    }
     
  })

  app.get('/getAllSuppliers', function (req, res, next) {
   
          res.send(contractInstance.getAllSuppliers());
  })

    app.get('/getAllProviders', function (req, res, next) {
   
          res.send(contractInstance.getAllProviders());
  })

 app.get('/getAllUsers', function (req, res, next) {
   
          res.send(contractInstance.getAllUsers());
  })

 app.get('/getUserByAddress/:id', function (req, res, next) {
   
          res.send(contractInstance.getUserByAddress(req.params.id));
  })


  app.get('/getSupplierByAddress/:id', function (req, res, next) {
   
          res.send(contractInstance.getSupplierByAddress(req.params.id));
  })

   app.get('/getProviderByAddress/:id', function (req, res, next) {
   
          res.send(contractInstance.getProviderByAddress(req.params.id));
  })

app.get('/getAllHealthOrganizers', function (req, res, next) {
   
          res.send(contractInstance.getAllHealthOrganizers());
	})


app.get('/getOrganizersList', function (req, res) {
   
          res.send(web3.eth.accounts);
  })


      app.get('/getHealthOrganizerById/:id', function (req, res) {
   
          res.send(contractInstance.getHealthOrganizerByAddress(req.params.id));
	})


  app.get('/addOrganizer/:name/:region/:id', function (req, res, next) {
   try
   {
    returnVal = contractInstance.AddAuthorizerInfo(req.params.id,req.params.name, req.params.region, {from: req.params.id, gas:3000000}
     
      );
     res.send('Organization Added');
}
	catch(error)
		{
res.send('Duplicate entry');
		}
     
  })


app.get('/getBalance', function (req, res, next) {
 res.send(contractInstance.getBalance());
    }

);
app.get('/start', function (req, res, next) {

  deployedContract = ImmuContract.new({data:byteCode, from: web3.eth.accounts[0], gas: 4700000},
  	 (err, res) => {
    if (err) {
        console.log(err);
        return;
    }

    // Log the tx, you can explore status with eth.getTransaction()
    //console.log(res.transactionHash);

    // If we have an address property, the contract was deployed
    if (res.address) {
        console.log('Contract address: ' + res.address);
        contractInstance = ImmuContract.at(res.address)
 

	}	  

});
   res.send('Contract Added');
})

app.listen(8001, function () {
  console.log('Example app listening on port 8001!')
})