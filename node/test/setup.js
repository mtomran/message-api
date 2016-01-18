"use strict";
/* global  before  after */

var userTest= require("./api/test_user.js");
var app= require("../app").app;


// These hooks/handlers are attached to the root suite, 
// as such, they will be run before and after *ALL* the tests
before(function (done) {
	console.log("Before All tests");
	app.on("listening", function() {
        return userTest.loginMasterUser()
		.then(function(adminToken){
			return userTest.postUser(adminToken);	
		}).then(function(){
			done();
		});        
    });
	
});

after(function () {
	console.log("After All tests");
	return userTest.loginMasterUser()
	.then(function(adminToken){
		return userTest.deleteUser(adminToken);
	});
	
});

