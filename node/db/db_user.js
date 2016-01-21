/* global db*/

/**
 * DB Mechanics for User module
 * 
 * @module
 */

var bluebird= require("bluebird");
var bcrypt= require("bcrypt");



/**
 * Adds the master user to the DB 
 */
function addMasterUser(){
	return postUser(config.masterUser);	
}



/**
 * Gets all users from the DB 
 */
function getAllUsers(){	
	return db.User.find().exec()
	.then(function(users){
		var successMessage= "Retrieved "+ users.length+ " user(s)";
		console.log(successMessage);
		return bluebird.resolve({ message: successMessage, data: users });
	});
}



/**
 * Creates a new user
 * 
 * @param {Object} user An object containing the information of the user to be stored.
 */
function postUser(user){
	var userObj = new db.User(user);
	userObj.password= bcrypt.hashSync(userObj.password, 8);
	
	return db.User.findOne({ username: userObj.username }).exec()	
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



/**
 * Deletes a user by ID
 * 
 * @praram {String} username Username of the user to be deleted.
 */
function deleteUser(username){
	if (username == "admin") throw new Error("Cannot remove the master user.");
	return db.User.findOne({ username: username}).exec()
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
	getAllUsers		: getAllUsers,
	postUser		: postUser,
	deleteUser		: deleteUser,
	addMasterUser	: addMasterUser
};