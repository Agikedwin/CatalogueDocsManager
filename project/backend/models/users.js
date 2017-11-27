
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

//add users schema
var usersSchema = new Schema({
	firstname: String,
	lastname: String,
	email: String,
	username: { type: String,  required: true, index: { unique: true }},
	password: String,
	access:String,
	date_created:{
		type: Date,
		default: Date.now
	},
	createdby: String

});

//change passwrd username  schema
var changeAuthSchema = new Schema({
	
	newusername: String,
	newpassword: String,
	date_updated:{
		type: Date,
		default: Date.now
	}

});


var Users= module.exports = mongoose.model('users', usersSchema );

usersSchema.pre('save', function(next){
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);

			user.password = hash;
			next();
		});
	});
	console.log("at user hash ========= .."+user.password);
});

var changeAuth= module.exports = mongoose.model('users', usersSchema );

usersSchema.pre('find', function(next){
	console.log("at user hash");
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);

			user.password = hash;
			next();
		});
	});
	console.log("at user hash  .."+user.password);
});



// get users
module.exports.getUsers = function (callback, limit) {
	Users.find(callback).limit(limit);	
}

// add users
module.exports.addUsers =function(user, callback){
	
	Users.create(user, callback);
}

module.exports.updateUsers =function(id,user, callback){
	var query={ _id: id };
	var update={

		firstname : user.firstname,
		lastname : user.lastname,
		access:user.access
		
	};
	
	Users.findOneAndUpdate(query, update,callback);
}
module.exports.userExists =function(user, callback){
	var query={ username: user.username };
	
		
	Users.findOne(query, callback).count();
}

module.exports.editUsers =function(id,callback){
	var query={ _id: id };
	
	Users.findOne(query ,callback);
}

module.exports.removeUsers =function(id, callback){
	var query={ _id: id };
	
	Users.remove(query,callback);
}
module.exports.authenticateUser=function (user, callback) {
	
	var query={
		username: user.username
	}

	Users.findOne(query ,callback);
}

module.exports.changeUnamePwd = function (user, callback) {
	var hashedPwd="";
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);

		bcrypt.hash(user.newpassword, salt, function(err, hash){
			if(err) throw  err;

			user.newpassword = hash;


			var query={
				username:user.username
			};
			var update={
				username: user.newusername,
				password: user.newpassword
			}

			changeAuth.findOneAndUpdate(query, update,callback);


		});

	});

	

}





