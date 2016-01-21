"use strict";
/* global  before  after */

var userTest= require("./api/test_user.js");

// These hooks/handlers are attached to the root suite, 
// as such, they will be run before and after *ALL* the tests
before(function () {
	console.log("Before All tests");
	
	// Login with master user to add temporary user(s). 
	return userTest.loginMasterUser()      
	.then(function(adminToken){
		return userTest.postUser(adminToken);	
	})
	.then(function(){
		console.log("Done Before Tests");
	});
});

after(function () {
	console.log("After All tests");
	
	// Login with master user to remove temporary user(s).
	return userTest.loginMasterUser()
	.then(function(adminToken){
		return userTest.deleteUser(adminToken);
	});
});

