/* global config */

"use strict";

var express= require("express");
var dbAuth= require("../db/db_auth.js");
var blacklist= require("express-jwt-blacklist");
var router= express.Router();



/**
 * @api {post} /auth/login Login to the platform
 * @apiName PostAuthLogin
 * @apiGroup auth
 *
 * @apiSuccess {String} token Generated Jason Web Token.
 * @apiSuccess {String} message Success message.
 */
router.post("/auth/login", function (req, res){
	var loginInfo= { 
		username: req.body.username, 
		password: req.body.password 
	};
	
	return dbAuth.authLogin(loginInfo)
	.then(function (result) {
		setCookie(res, result);		
		res.json(result);		
	})
	.catch(function (err) {	
		console.log("Request Failed.", err.stack);
		var status = err.status || 500;
		res.status(status);		
		res.json(err);
	});	
});



/**
 * @api {post} /auth/logout Logout of the platform
 * @apiName PostAuthLogout
 * @apiGroup auth
 *
 * @apiSuccess {String} message Success message.
 */
router.post("/auth/logout", function (req, res){
	blacklist.revoke(req.user);
	res.clearCookie("accesstoken");
	res.json({message: "Logout Successful."});	
});



function setCookie(res, result){
	if(result && result.token){		
		var expiry= getCookieExpiry();		
		res.cookie("accesstoken", result.token, { maxAge: expiry});
	}
}	



function getCookieExpiry(){
	return parseInt(config.token.expiry)*24*60*60*1000;
}



module.exports= {
	router: router
};