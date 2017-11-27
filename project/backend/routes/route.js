


//connect to mongoose 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/catalogue');
var db= mongoose.connection;
var formidable = require('formidable');

var _ = require('underscore'); // npm install underscore to install
var secret='ilovehen';
var Regex = require("regex");
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcrypt');
app.set('superSecret', secret); // secret variable

Users =require('../models/users');
Catalogue = require('../models/documents');


app.post('/uploadfile', function (req, res){
  

  //io.emit('file-progress', {message:'start upload'});
  // console.log(req);
   //console.log("post params  "+req.params);
   var documents={};

    var form = new formidable.IncomingForm();

    form.parse(req);
     //console.log(form);
    

    form.on('fileBegin', function (name, file){
      //console.log(file);
      //var regex = new Regex(/(image)(/)/);
      //console.log(regex.test("image/");  

      var nameString = file.type;
       var nameArray = nameString.split('/');
         var name = nameArray[nameArray.length - 2];
        // console.log(name);

      //console.log("my file type  ",file.type)
      //define the folder to upload the document in
      if(name==="image"){
        file.path = __dirname + '/project/frontend/uploads/photos/' + file.name;
      }
      else if(name ==="audio"){
      file.path = __dirname + '/project/frontend/uploads/audios/' + file.name;
      }else if(name ==="video"){
        file.path = __dirname + '/project/frontend/uploads/videos/' + file.name;
      }else if(name ==="document"){
        file.path = __dirname + '/project/frontend/uploads/documents/' + file.name;
      }else{
      file.path = __dirname + '/project/frontend/uploads/others/' + file.name;
      }
        
        
        
        //console.log(file.metadata);
    });

    form.on('file', function (name, file){
      //console.log(file.upload);
       
    });

     form.on('field', function(name, value) {
      //console.log(name);
     // console.log(value);
      
})
    
   
    
    form.on('file', function(name, file) {
     
      //console.log(file);
    });

    form.on('error', function(err) {
      console.log('ERROR!');
      res.end();
    });
    
    form.on('aborted', function() {
      console.log('ABORTED!');
      res.end();
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
      console.log('bytes received  '+bytesReceived);
      io.emit('file-progress', bytesReceived,bytesExpected);
     // console.log('bytes expected : '+bytesExpected);
});
     form.parse(req, function(err,fields,files){
       console.log(fields.filename);
       console.log(files.upload.path);

    documents={
    filename : fields.filename,
    description : fields.description,
    filetype : fields.type,
    classification : fields.classification,
    nature: fields.nature,
    source : fields.source,
    destination : fields.destination,
    urgency: fields.urgency,
    size : files.upload.size,
    path : files.upload.path,
    name : files.upload.name,
    type : files.upload.type,
    lastModifiedDate :files.upload.lastModifiedDate,
    state : 0,
    deleted : 0,
    dateuploaded : new Date()
       }

   });


// when done/ end insert into mongodb
     form.on('end', function() {
      
      /*Catalogue.addDocument(documents,function(err, docs){
        if(err){
          throw err
        }
        res.json(docs);
      });*/
      //res.end();
      //res.end();
      //res.json({success: true, message: 'Done uploading'});

    });

});


// fet uploaded files


appRoutes.get('/fileUpload', function  (req,res) {

 Catalogue.getCatalogue(function(err,catalogue){
    if (err) {
      throw err;
  }
  res.json(catalogue);
  //console.log('fetching documents  '+catalogue);
  });

});

//get usrs
appRoutes.get('/getUsers', function (req, res) {
  console.log("reached at get users");
  Users.getUsers(function(err,usrs){
    if (err) {
      throw err;
  }
  res.json(usrs);
  //console.log('fetching users  '+usrs);
  });
});


// add users
appRoutes.post('/addUsers', function (req, res) {
  var user= req.body;
  console.log("at post ......... "+ req.body.firstname)
  Users.addUsers(user, function(err,user){
    if (err) {
      throw err;
  }
  //res.json(user);
  //console.log('fetching users////////////////  '+user);
  });
});

// update user
appRoutes.put('/updateUser/:id', function (req, res) {
  console.log("user id "+req.url)
 var user= req.body;
 
  Users.updateUsers(req.params.id,user , function(err,user){
    if (err) {
      throw err;
  }
  res.json(user);
  console.log('updating  users  '+user);
  });
});

//edit user
appRoutes.get('/editUser/:id', function (req, res) {
  
 Users.editUsers(req.params.id, function(err,user){
    if (err) {
      throw err;
  }
  res.json(user);
  
  });
});


// delete users

appRoutes.delete('/deleteUser/:id', function (req, res) {
  
  Users.removeUsers(req.params.id , function(err,user){
    if (err) {
      throw err;
  }
  res.json(user);
  
  });
});
appRoutes.post('/authenticate', function(req,res){
console.log("authenticate user ");
console.log(req.body);
var query=  "agik";
var pwd="agik";
  //password:req.body.password

console.log(query);
Users.authenticateUser(query , function(err,user){
  console.log(".............user "+user)
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      var result = bcrypt.compareSync(pwd, user.password);
          if (result) {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
           expiresIn : 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });

          } else {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          console.log("Password wrong");
          }
          return result;

    }

  });
});




appRoutes.get('/api/catalogue', function (req, res) {
  Catalogue.getCatalogue(function(err,catalogue){
    if (err) {
      throw err;
  }
  res.json(catalogue);
  console.log('fetching documents  '+catalogue);
  });
});

appRoutes.get('/api/catalogue/:_id', function (req, res) {
  Catalogue.getCatalogueById(req.params._id , function(err,catalogue){
    if (err) {
      throw err;
  }
  res.json(catalogue);
  console.log('fetching documents  '+catalogue);
  });
});
