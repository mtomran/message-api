"use strict";
/* global before describe it expect chai */

/**
 * Message module tests
 *  
 * @module 
 */

var app = "http://localhost:" + config.api.port;
var request= chai.request;
var mongoose= require("mongoose");
var userTest= require("./test_user.js");

var user1 = userTest.user1;


describe("API:Route:Message", function() {
	
	var adminToken;
	
	before(function() {
		return userTest.loginMasterUser()
		.then(function (token){
			adminToken= token;
		});
	});

	describe("Message", function() {
		var messageId;
		var messageId2;
		
		describe("POST /api/v1/message", function() {
			it("Should store the fist new message.", function() {
				return postMessage(adminToken, "test1", "not palindrom")
				.then(function(id){
					messageId= id;
					
					return Promise.resolve(messageId);
				});		
			});
		});
		
		describe("POST /api/v1/message", function() {
			it("Should store the second new message.", function() {
				return postMessage(adminToken, "test2", "aba aba")
				.then(function(id){
					messageId2= id;
					
					return Promise.resolve(messageId);
				});		
			});
		});
		
		describe("POST /api/v1/message", function() {
			it("Should fail to store a new message if not authorized.", function() {
				return postMessageInvalidToken("invalid token");
			});
		});		
		
		describe("GET /api/v1/message", function() {
			it("Should retrieve all messages.", function() {
				return getAllMessages(adminToken);		
			});
		});
		
		describe("GET /api/v1/message/:id", function() {
			it("Should retrieve a non-palindrom message by ID.", function() {
				return getMessageNonPalindrome(adminToken, messageId);		
			});
		});
		
		describe("GET /api/v1/message/:id", function() {
			it("Should retrieve a palindrom message by ID.", function() {
				return getMessagePalindrome(adminToken, messageId2);		
			});
		});
		
		describe("GET /api/v1/message/:id", function() {
			it("Should fail retrieve a message if ID is not valid.", function() {
				var wrongId = "4edd40c86762e0fb12000003";
				return getMessageWrongId(adminToken, wrongId);		
			});
		});		
		
		describe("DELETE /api/v1/message/:id", function() {
			it("Should delete the first message by ID.", function() {
				return deleteMessage(adminToken, messageId);		
			});
		});		
		
		describe("DELETE /api/v1/message/:id", function() {
			it("Should delete the second message by ID.", function() {
				return deleteMessage(adminToken, messageId2);		
			});
		});
	});
});



/**
 * test for sending a new successful message
 * 
 * @param {string} adminToken a token assigned to user admin 
 */
function postMessage(adminToken, title, content){
	return request(app)
	.post("/api/v1/message")
	.send({ title: title, content: content })
	.set("x-access-token", adminToken)	
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;
		expect(res.body.data._id).to.exist;
				
		return Promise.resolve(res.body.data._id);
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * test for failing upon sending a new message without a valid token
 * 
 * @param {string} adminToken a token assigned to user admin 
 */
function postMessageInvalidToken(adminToken){
	return request(app)
	.post("/api/v1/message")
	.send({ title: "message_title", content: "message_content" })
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
 * test for getting a non-palindrome message that has been submitted
 * 
 * @param {string} adminToken a token assigned to user admin 
 * @param {string} messageId id of the message to be retrieved
 */
function getMessageNonPalindrome(adminToken, messageId){
	return request(app)
	.get("/api/v1/message/"+ messageId)
	.set("x-access-token", adminToken)	
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;		
		expect(res.body.data._id).to.exist;
		expect(res.body.data._user.username).to.exist;
		expect(res.body.isPalindrome).to.equal(false);
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}



/**
 * test for getting a palindrome message that has been submitted
 * 
 * @param {string} adminToken a token assigned to user admin 
 * @param {string} messageId id of the message to be retrieved
 */
function getMessagePalindrome(adminToken, messageId){
	return request(app)
	.get("/api/v1/message/"+ messageId)
	.set("x-access-token", adminToken)	
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;		
		expect(res.body.data._id).to.exist;
		expect(res.body.data._user.username).to.exist;
		expect(res.body.isPalindrome).to.equal(true);
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}




/**
 * test for getting all the messages 
 * 
 * @param {string} adminToken a token assigned to user admin 
 */
function getAllMessages(adminToken){
	return request(app)
	.get("/api/v1/message")
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
 * test for failing upon trying to get a message with wrong ID
 * 
 * @param {string} adminToken a token assigned to user admin 
 * @param {string} messageId id of the message to be retrieved
 */
function getMessageWrongId(adminToken, messageId){
	return request(app)
	.get("/api/v1/message/"+ messageId)
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
 * test for successfully deleting a message
 * 
 * @param {string} adminToken a token assigned to user admin 
 * @param {string} messageId id of the message to be deleted
 */
function deleteMessage(adminToken, messageId){
	return request(app)
	.delete("/api/v1/message/"+ messageId)
	.set("x-access-token", adminToken)	
	.then(function(res) {
		expect(res).to.have.status(200);
	})
	.catch(function(err) {
		expect(res).to.be.json;		
		console.log(err.stack);
		throw err;
	});
}
