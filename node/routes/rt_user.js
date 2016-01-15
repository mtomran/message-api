"use strict";
/* global utils */

var express= require("express");
var router= express.Router();
var dbUser= require("../db/db_user.js");


/**
 * @api {post} /user Adds a new user
 * @apiName PostUser
 * @apiGroup user
 *
 * @apiSuccess {String} message Success message.
 */
router.post("/user", function(req, res){
	var user= { 
		username: req.body.username,
		password: req.body.password,
		first_name: req.body.first_name, 
		last_name: req.body.last_name
	};
	
	return utils.responseHandler(req, res, function(){
		return dbUser.postUser(user);
	});		
});




/**
 * @api {post} /user removes a user
 * @apiName DeleteUser
 * @apiGroup user
 *
 * @param {Number} username user's login name
 * @apiSuccess {String} message Success message.
 */
router.delete("/user/:username", function (req, res){
	var username= req.params.username;
	return utils.responseHandler(req, res, function(){
		return dbUser.deleteUser(username);
	});
});


module.exports= {
	router: router
};