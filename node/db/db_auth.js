/* global db */

var bluebird= require("bluebird");
var token= require("../lib/token.js");
var bcrypt= require("bcrypt");

function authLogin(loginInfo){
	return queryUser(loginInfo)	
	.then(function(login){
		if(login){
			var tokenStr= token.genToken(login);
			var message= "User "+ login.username+ " login successful.";
			console.log(message);			
			return bluebird.resolve({ message: message, token: tokenStr });			
		}else{
			throw new Error("Login Failed.");
		}
	});
}

function queryUser(loginInfo){
	var username= loginInfo.username;
	var password= loginInfo.password;
	return db.User.findOne({ username: username })
	.then(function(user){
		var eUser= new Error("User "+ username+ " does not exist.");
		eUser.status= 401;
		if(!user) throw eUser;
		
		var ePass= new Error("Wrong password provided for user "+ username);
		ePass.status= 401;
		if(!bcrypt.compareSync(password, user.password)) 
			throw ePass;
		
		return bluebird.resolve({ username: username });
	});
}


module.exports={
	authLogin: authLogin
};