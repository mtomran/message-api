"use strict";
/* global describe it expect chai */
var bluebird= require("bluebird");
var app = "http://localhost:" + config.api.port;
var request= chai.request;
//var now = Math.round(new Date().getTime() / 1000);

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
		return request(app)
			.post("/api/v1/auth/login")
			.send({ username: masterUser.username, password: masterUser.password })
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;				
				adminToken = res.body.token;
			})
			.catch(function(err) {
				console.log(err.stack);
				throw err;
			});
	});

	describe("User", function() {
		
		describe("GET /api/v1/user", function() {
			it("Should return all users.", function() {
				return getAllUsers(adminToken);
			});
		});
		//postUser(adminToken);
/*		describe("POST /api/v1/user", function() {
			it("Should create a new user.", function() {
				return postUser(adminToken);
			});
		});
		
		describe("DELETE /api/v1/user/:username", function() {
			it("Should delete the given user.", function() {
				return deleteUser(adminToken);
			});
		});
*/		
	});
});


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


function postUser(adminToken){	
	return request(app)
	.post("/api/v1/user")
	.set("x-access-token", adminToken)
	.send(user1)
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



function deleteUser(adminToken){
	return request(app)
	.delete("/api/v1/user/" + user1.username)
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