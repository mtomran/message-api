/* global db*/
var bluebird= require("bluebird");
var bcrypt= require("bcrypt");

function addMasterUser(){
	return postUser(config.masterUser);	
}


function postUser(user){
	var userObj = new db.User(user);
	userObj.password= bcrypt.hashSync(userObj.password, 8);
	
	return db.User.findOne({ username: userObj.username })
	.then(function(existingUser){
		if(existingUser) throw new Error("User already exists.");
		
		return userObj.save();
	})
	.then(function(newUser){
		var message= "User '"+ newUser.username+ "' created.";
		console.log(message);
		return bluebird.resolve({ message: message, data: newUser });		
	});
}


function deleteUser(username){
	return db.User.findOne({ username: username})
	.then(function(user){
		if(!user) throw new Error("User does not exist.");
		
		return user.remove();		
	})
	.then(function(user){
		var message= "User '"+ user.username+ "' removed.";
		console.log(message);
		return bluebird.resolve({ message:message, data:user });			
	});
}

module.exports= {
	postUser		: postUser,
	deleteUser		: deleteUser,
	addMasterUser	: addMasterUser
};