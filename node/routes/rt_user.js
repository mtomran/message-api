"use strict";
/* global utils */

var express= require("express");
var router= express.Router();
var dbUser= require("../db/db_user.js");



/**
 * @api {get} /user Gets all users
 * @apiName GetUsers
 * @apiGroup user
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} data An array of all users.
 */
router.get("/user", function(req, res){
	return utils.responseHandler(req, res, function(){
		return dbUser.getAllUsers();
	});		
});



/**
 * @api {post} /user Adds a new user
 * @apiName PostUser
 * @apiGroup user
 *  
 * @apiParam {String} username Username of the new user.
 * @apiParam {String} password Password of the new user.
 * @apiParam {String} firest_name First name of the new user.
 * @apiParam {String} last_name Last name of the new user.
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} data Information of the added user.
 * 
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
 * @api {delete} /user/:username Removes a user
 * @apiName DeleteUser
 * @apiGroup user
 *
 * @apiParam {String} username user's login name
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} data Information about the deleted user.
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