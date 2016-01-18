"use strict";
/* global before describe it expect chai*/

//var app = "http://localhost:" + config.api.port;
var app= require("../../app").app;

var request = chai.request;
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
		describe("POST /api/v1/message", function() {
			it("Should store a new message.", function() {
				return postMessage(adminToken);		
			});
		});
	});
});


function postMessage(adminToken){
	return request(app)
	.post("/api/v1/message")
	.send({username: user1.username, title: "message_title", content: "message_content"})
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
