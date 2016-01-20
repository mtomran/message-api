"use strict";
/* global before describe it expect chai */

/**
 * Authentication module tests
 *  
 * @module 
 */

var app = "http://localhost:" + config.api.port;
var request= chai.request;

var userTest= require("./test_user.js");

var user1 = userTest.user1;

var adminToken;

describe("API:Route:Auth", function() {	
	
	before(function() {
		return userTest.loginMasterUser()
		.then(function (token){
			adminToken= token;
		});
	});

	describe("Auth", function() {

		describe("POST /api/v1/auth/login", function() {
			it("Should login successfully.", function() {
				return postLogin();		
			});
		});
		
		describe("POST /api/v1/auth/login", function() {
			it("Should not allow login if user does not exit.", function() {
				return postLoginWrongUser();
			});
		});					
		
		describe("POST /api/v1/auth/login", function() {
			it("Should not allow login if password is not correct.", function() {
				return postLoginWrongPassword();
			});
		});
	
		describe("POST /api/v1/auth/logout", function() {
			it("Should fail to logout if a valid token is not provided.", function() {
				return postLogoutNoToken();
			});
		});	
		
		describe("POST /api/v1/auth/logout", function() {
			it("Should successfully log the user out.", function() {
				return postLogout();
			});
		});	
		
		describe("POST /api/v1/auth/logout", function() {
			it("Should fail to logout if already logged out and the token is blacklisted.", function() {
				return postLogoutBlacklisted();
			});
		});		
	});
});



/**
 * Test for login with user1
 */
function postLogin(){
	return request(app)
	.post("/api/v1/auth/login")
	.send({username: user1.username, password: user1.password})	
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;
							
		//Asserts that the target is neither null nor undefined.
		expect(res.body.token).to.exist;
		
		expect(res).to.have.cookie("accesstoken");
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * Test for failing upon trying to login with wrong username
 */
function postLoginWrongUser(){
	return request(app)
	.post("/api/v1/auth/login")
	.send({username: "wrong", password: user1.password})	
	.then(function(res) {					
		expect(res).to.have.status(401);					
		expect(res).to.be.json;
		expect(res.cookie).to.not.exist;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * Test for failing upon trying to login with wrong password
 */
function postLoginWrongPassword(){
	return request(app)
	.post("/api/v1/auth/login")
	.send({username: user1.username, password:"wrong"})	
	.then(function(res) {					
		expect(res).to.have.status(401);
		expect(res).to.be.json;					
		expect(res.cookie).to.not.exist;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * Test for a successful logout of user1
 */
function postLogout(){
	return request(app)
	.post("/api/v1/auth/logout")			
	.send({})
	.set("x-access-token", adminToken)
	.then(function(res) {
		expect(res).to.have.status(200);				
		expect(res).to.be.json;
		expect(res.cookie).to.not.exist;				
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * Test for failing to logout upon providing an invalid token
 */
function postLogoutNoToken(){
	return request(app)
	.post("/api/v1/auth/logout")			
	.send({})
	.set("x-access-token", "invalid token")
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
 * Test to confirm that user can not access routes such as /logout
 * after they already logged out of the platform.
 */
function postLogoutBlacklisted(){
	return request(app)
	.post("/api/v1/auth/logout")			
	.send({})
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