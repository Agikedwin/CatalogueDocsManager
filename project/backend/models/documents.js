var mongoose = require('mongoose');

//schema
var catalogueSchema = mongoose.Schema({
 // render data without defined schema
 
     filename : String,
    description : String,
    filetype : String,
    classification : String,
    nature: String,
    source : String,
    destination : String,
    urgency: String,
    path : String,
    name : String,
    size : Number,
    type : String,
    lastModifiedDate : Date,
    state : Number,
    deleted : Number,
    dateuploaded : String,
    username: String,
    usergroup:String

});

var Catalogue= module.exports = mongoose.model('docs', catalogueSchema );

//add documents
module.exports.addDocument= function(documents, callback){
    Catalogue.create(documents,callback);
}


// get users
module.exports.getCatalogue = function (usergroup,callback, limit) {
    Catalogue.find(callback).limit(limit);
  
    /*if (usergroup=='super admin') {
       
   Catalogue.find({usergroup:"super admin"},callback).limit(limit);
    }
    else if (usergroup=='admin') {
    Catalogue.find(callback).limit(limit);
    }
	else if (usergroup=='user') {
      
       Catalogue.find({usergroup:"user"},callback).limit(limit);  
    }*/
}

module.exports.getCatalogueById = function (id, callback) {
Catalogue.findById(id,callback);	
}