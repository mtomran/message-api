/* global db */

/**
 * DB Mechanics for Authentication module
 * 
 * @module
 */

var bluebird= require("bluebird");
var token= require("../lib/token.js");
var bcrypt= require("bcrypt");



/**
 * Authenticates a user login
 * 
 * @param {Object} loginInfo An object containing user's username and password
 */
function authLogin(loginInfo){
	return queryUser(loginInfo)	
	.then(function(user){
		if(user){
			var tokenStr= token.genToken(user);
			var message= "User "+ user.username+ " login successful.";
			console.log(message);			
			return bluebird.resolve({ message: message, token: tokenStr, user: user});		
		}else{
			throw new Error("Login Failed.");
		}
	});
}



/**
 * Query the DB to retrieve the requested user.
 * 
 * @param {Object} loginInfo An object containing user's username and password
 */
function queryUser(loginInfo){
	var username= loginInfo.username;
	var password= loginInfo.password;
	return db.User.findOne({ username: username }).exec()
	.then(function(user){
		var eUser= new Error("User "+ username+ " does not exist.");
		eUser.status= 401;
		if(!user) throw eUser;
		
		var ePass= new Error("Wrong password provided for user "+ username);
		ePass.status= 401;
		if(!bcrypt.compareSync(password, user.password)) throw ePass;
			
		return bluebird.resolve({ 
			username: user.username, 
			first_name: user.first_name, 
			last_name: user.last_name
		});		
	});
}


module.exports={
	authLogin: authLogin
};