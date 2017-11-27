var express = require('express');
var app = express();
var formidable = require('formidable');
var morgan = require('morgan');


var _ = require('underscore'); // npm install underscore to install
var secret = 'ilovehen';

var Regex = require("regex");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcrypt');
var port=3000;
var server = app.listen(port)
var io = require('socket.io').listen(server);
/*
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.listen(3030);*/
console.log("server listening on port "+port);

var mongoose = require('mongoose');
var appRoutes = express.Router();


// include external files 
Users = require('./project/backend/models/users');
Catalogue = require('./project/backend/models/documents');
SendMail = require('./project/backend/models/sendMail');

//connect to mongoose 
mongoose.connect('mongodb://localhost/catalogue');
var db = mongoose.connection;



var bodyParser = require('body-parser');
//app.use(morgan('dev'));


app.use(express.static(__dirname + "/project/frontend"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.set('superSecret', secret); // secret variable

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


app.use('', appRoutes);



// upload files
io.on('connection', function(socket) {
  console.log('new connection');


});

appRoutes.post('/uploadfile', function(req, res) {
 // console.log(req.body)


  //io.emit('file-progress', {message:'start upload'});
  // console.log(req);
  //console.log("post params  "+req.params);
  var documents = {};

  var form = new formidable.IncomingForm();

  form.parse(req);
  //console.log(form);


  form.on('fileBegin', function(name, file) {
    //console.log(file);
    //var regex = new Regex(/(image)(/)/);
    //console.log(regex.test("image/"); 
    //
    file.path = __dirname + '/project/frontend/uploads/' + file.name;

    /*var nameString = file.type;
    var nameArray = nameString.split('/');
    var name = nameArray[nameArray.length - 2];
    // console.log(name);

    //console.log("my file type  ",file.type)
    //define the folder to upload the document in
    if (name === "image") {
      file.path = __dirname + '/project/frontend/uploads/photos/' + file.name;
    } else if (name === "audio") {
      file.path = __dirname + '/project/frontend/uploads/audios/' + file.name;
    } else if (name === "video") {
      file.path = __dirname + '/project/frontend/uploads/videos/' + file.name;
    } else if (name === "document") {
      file.path = __dirname + '/project/frontend/uploads/documents/' + file.name;
    } else {
      file.path = __dirname + '/project/frontend/uploads/others/' + file.name;
    }*/



    //console.log(file.metadata);
  });

  form.on('file', function(name, file) {
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
   // console.log('bytes received  ' + bytesReceived);
    io.emit('file-progress', bytesReceived, bytesExpected);
    // console.log('bytes expected : '+bytesExpected);
  });
  form.parse(req, function(err, fields, files) {
    
    console.log(fields);
     console.log("'''''''''files'''''''''")
     // console.log(req)

 
   documents = {
      filename: fields.filename,
      description: fields.description,
      filetype: fields.type,
      classification: fields.classification,
      nature: fields.nature,
      source: fields.source,
      destination: fields.destination,
      urgency: fields.urgency,
      size: files.upload.size,
      path: files.upload.path,
      name: files.upload.name,
      type: files.upload.type,
      lastModifiedDate: files.upload.lastModifiedDate,
      state: 0,
      deleted: 0,
      dateuploaded: new Date(),
      username:fields.username,
      usergroup:fields.usergroup
    }

  

  });


  // when done/ end insert into mongodb
  form.on('end', function() {

   Catalogue.addDocument(documents,function(err, docs){
      if(err){
        throw err
      }
      //res.json(docs);
    });
    //res.end();
    //res.end();
    //res.json({success: true, message: 'Done uploading'});

  });

});


// fet uploaded files


appRoutes.get('/fileUpload/:accessGroup', function(req, res) {
  console.log(req.params.accessGroup);

  Catalogue.getCatalogue(req.params.accessGroup,function(err, catalogue) {
    if (err) {
      throw err;
    }
    res.json(catalogue);
    //console.log('fetching documents  '+catalogue);
  });

});

appRoutes.post('/loggedUser/:user', function(req, res) {
  console.log("getting user session");

});
//get usrs
appRoutes.get('/getUsers', function(req, res) {
  
  Users.getUsers(function(err, usrs) {
    if (err) {
      throw err;
    }
    res.json(usrs);
    //console.log('fetching users  '+usrs);
  });
});


// add users
appRoutes.post('/addUsers', function(req, res) {
  console.log(req.body);
  console.log('................................');
  
 Users.userExists(req.body,function (err,user) {
    console.log(user);
    if(!user) {
      console.log(user);
      
      Users.addUsers(req.body, function(err, user){
        if (err) {
          throw err;
        }else {
          
          res.json({
            success:true,
            message:"User successfully saved",
            data: user

          })
          //send mail to the user
         SendMail.sendMail(req.body);
          
        }
    //res.json(user);
    //console.log('fetching users////////////////  '+user);
  });
    }else {
     
     res.json({
      success:true,
      message:"Username alreay exist, enter a different username"

    })
   }
 })
 });


// update user
appRoutes.put('/updateUser/:id', function(req, res) {

  var user = req.body;

  Users.updateUsers(req.params.id, user, function(err, user) {
    if (err) {
      throw err;
    }
    res.json(user);
    
  });
});

//edit user
appRoutes.get('/editUser/:id', function(req, res) {

  Users.editUsers(req.params.id, function(err, user) {
    if (err) {
      throw err;
    }
    res.json(user);

  });
});


// delete users

appRoutes.delete('/deleteUser/:id', function(req, res) {

  Users.removeUsers(req.params.id, function(err, user) {
    if (err) {
      throw err;
    }
    res.json(user);

  });
});
appRoutes.post('/authenticate2', function(req, res) {
SendMail.sendMail();

 
});
appRoutes.post('/authenticate', function(req, res) {
  
  Users.authenticateUser(req.body, function(err, user) {
    
    console.log(user);
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {
      console.log("..................");
         console.log(user.password)
      // check if password matches
      var result = bcrypt.compareSync(req.body.password, user.password);
      if (result ) {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(req.body, app.get('superSecret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'login successful : Loading..!',
          accessToken: token,
          username:user.username,
          accessLevel:user.access
        });

      } else {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
        console.log("Password wrong");
      }
      return result;

    }

  });
});

appRoutes.post('/changeUnamePwd', function(req, res) {

  Users.changeUnamePwd(req.body,function(err, user){
    if (err) {
      throw err;
    }

    if (user) {
      res.json({
        success:true,
        message : 'User credentials successfully updated',
        data: user
      }) 
    }else {
     res.json({
      success :false,
      message :'User not found, valid username or/and password required',
      data: user
    }) 
   }

 })
});


appRoutes.get('/api/catalogue', function(req, res) {
  Catalogue.getCatalogue(function(err, catalogue) {
    if (err) {
      throw err;
    }
    res.json(catalogue);
    console.log('fetching documents  ' + catalogue);
  });
});

appRoutes.get('/api/catalogue/:_id', function(req, res) {
  Catalogue.getCatalogueById(req.params._id, function(err, catalogue) {
    if (err) {
      throw err;
    }
    res.json(catalogue);
    console.log('fetching documents  ' + catalogue);
  });
});


// securing routes
/*
appRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});
*/