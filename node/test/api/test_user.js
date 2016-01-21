"use strict";
/* global describe it expect chai before */

/**
 * User module tests
 *  
 * @module 
 */

var bluebird= require("bluebird");
var app = "http://localhost:" + config.api.port;
var request= chai.request;


var masterUser= {
	username: "admin",
	password: "secret",
	first_name: "Administrator",
	last_name: "Master"
};

var user1 = {
	username: "test1",
	password: "secret1",
	first_name: "John",
	last_name: "Doe"
};

var user2 = {
	username: "test2",
	password: "secret2",
	first_name: "Dan",
	last_name: "Green"
};




describe("API:Route:User", function() {
	
	var adminToken;
	
	before(function() {
		return loginMasterUser()
		.then(function (token){
			adminToken= token;
		});
	});

	describe("User", function() {
		
		describe("GET /api/v1/user", function() {
			it("Should fail to return all users if user does not have a valid token.", function() {
				return getAllUsersInvalidToken("invalid token");
			});
		});
		
		describe("GET /api/v1/user", function() {
			it("Should return all users.", function() {
				return getAllUsers(adminToken);
			});
		});
		
		describe("POST /api/v1/user", function() {
			it("Should create a new user.", function() {
				return postUser(adminToken, user2);
			});
		});
		
		describe("POST /api/v1/user", function() {
			it("Should fail to post the same user.", function() {
				return postSameUser(adminToken, user2);
			});
		});

		
		describe("DELETE /api/v1/user/:username", function() {
			it("Should delete the given user.", function() {
				return deleteUser(adminToken, user2);
			});
		});
		
		describe("DELETE /api/v1/user/:username", function() {
			it("Should fail to delete a user that does not exist.", function() {
				return deleteNonUser(adminToken, user2);
			});
		});		
	});
});



/**
 * test for getting all users
 * 
 * @param {string} adminToken a token assigned to user admin  
 */
function getAllUsers(adminToken){
	return request(app)
	.get("/api/v1/user")
	.set("x-access-token", adminToken)
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * test for failing to get all users upon presenting an invalid token
 * 
 * @param {string} adminToken a token assigned to user admin  
 */
function getAllUsersInvalidToken(adminToken){
	return request(app)
	.get("/api/v1/user")
	.set("x-access-token", adminToken)
	.then(function(res) {
		expect(res).to.have.status(401);
		expect(res).to.be.json;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}




/**
 * Test for submitting a new user.
 * If no user is given, it adds user1 by default.
 * 
 * @param {string} adminToken a token assigned to user admin 
 * @param {object} user the user object to be added
 */
function postUser(adminToken, user){
	var postUser= user || user1;	
	return request(app)
	.post("/api/v1/user")
	.set("x-access-token", adminToken)
	.send(postUser)
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * Test for failing upon submitting an existing user.
 * If no user is given, it adds user1 by default.
 * 
 * @param {string} adminToken a token assigned to user admin 
 * @param {object} user the user object to be added
 */
function postSameUser(adminToken, user){
	var postUser= user || user1;	
	return request(app)
	.post("/api/v1/user")
	.set("x-access-token", adminToken)
	.send(postUser)
	.then(function(res) {
		expect(res).to.have.status(500);
		expect(res).to.be.json;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * Test for deleting a user.
 * If no user is given, it removes user1 by default.
 * 
 * @param {string} adminToken a token assigned to user admin 
 * @param {object} user the user object to be deleted
 */
function deleteUser(adminToken, user){
	var deleteUser= user || user1;
	return request(app)
	.delete("/api/v1/user/" + deleteUser.username)
	.set("x-access-token", adminToken)
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * Test for deleting a non-existent user.
 * If no user is given, it removes user1 by default.
 * 
 * @param {string} adminToken a token assigned to user admin 
 * @param {object} user the user object to be deleted
 */
function deleteNonUser(adminToken, user){
	var deleteUser= user || user1;
	return request(app)
	.delete("/api/v1/user/" + deleteUser.username)
	.set("x-access-token", adminToken)
	.then(function(res) {
		expect(res).to.have.status(500);
		expect(res).to.be.json;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * Logs in with the master user (admin)
 * 
 * @return {object} a promise containing the access token 
 */
function loginMasterUser(){
	return request(app)
	.post("/api/v1/auth/login")
	.send({ username: masterUser.username, password: masterUser.password })
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;				
		return bluebird.resolve(res.body.token);
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}

module.exports={
	masterUser		: masterUser,
	user1		 	: user1,
	postUser		: postUser,
	deleteUser	 	: deleteUser,
	loginMasterUser	: loginMasterUser		
};
