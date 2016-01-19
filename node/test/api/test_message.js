"use strict";
/* global before describe it expect chai */

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
		
		describe("POST /api/v1/message", function() {
			it("Should store a new message.", function() {
				return postMessage(adminToken)
				.then(function(id){
					messageId= id;
					
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
			it("Should retrieve a message by ID.", function() {
				return getMessage(adminToken, messageId);		
			});
		});
		
		describe("GET /api/v1/message/:id", function() {
			it("Should fail retrieve a message if ID is not valid.", function() {
				var wrongId = "4edd40c86762e0fb12000003";
				return getMessageWrongId(adminToken, wrongId);		
			});
		});
		
		
		describe("DELETE /api/v1/message/:id", function() {
			it("Should delete a message by ID.", function() {
				return deleteMessage(adminToken, messageId);		
			});
		});
		
	});

});


function postMessage(adminToken){
	return request(app)
	.post("/api/v1/message")
	.send({ title: "message_title", content: "message_content" })
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


function getMessage(adminToken, messageId){
	return request(app)
	.get("/api/v1/message/"+ messageId)
	.set("x-access-token", adminToken)	
	.then(function(res) {
		expect(res).to.have.status(200);
		expect(res).to.be.json;		
		expect(res.body.data._id).to.exist;
		expect(res.body.data._user.username).to.exist;
	})
	.catch(function(err) {
		console.log(err.stack);
		throw err;
	});
}

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


function deleteMessage(adminToken, messageId){
	return request(app)
	.delete("/api/v1/message/"+ messageId)
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
