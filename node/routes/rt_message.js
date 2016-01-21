/* global utils */
"use strict";

var express= require("express");
var router= express.Router();
var dbMessage= require("../db/db_message.js");



/**
 * @api {post} /message Inserts a new message 
 * @apiName PostMessage
 * @apiGroup message
 * 
 * @apiParam {String} title Title of the new message.
 * @apiParam {String} content Content of the new message.
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} data Information of the inserted message.
 */
router.post("/message", function (req, res){
	var username= req.user.username;
	var message={
		title	: req.body.title,
		content	: req.body.content
	};
	
	utils.responseHandler(req, res, function(){
		return dbMessage.postMessage(username, message);
	});
	
});



/**
 * @api {get} /message/:id Gets a given messages
 * @apiName GetMessage
 * @apiGroup message
 * 
 * @apiParam {String} id message id
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} id Information about the retrieved message.
 */
router.get("/message/:id", function (req, res){
	var messageId= req.params.id;
	
	utils.responseHandler(req, res, function(){
		return dbMessage.getMessage(messageId);
	});
});



/**
 * @api {get} /message Gets all Messages
 * @apiName GetMessages
 * @apiGroup message 
 * 
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} data An array of all messages.
 */
router.get("/message", function(req, res){
	utils.responseHandler(req, res, function(){
		return dbMessage.getAllMessages();
	});
});



/**
 * @api {delete} /message/:id Removes a message
 * @apiName DeleteMessage
 * @apiGroup message
 *
 * @apiParam {String} id message id
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} data Information about the deleted message.
 */
router.delete("/message/:id", function (req, res){
	var messageId= req.params.id;
	
	utils.responseHandler(req, res, function(){
		return dbMessage.deleteMessage(messageId);
	});
});



module.exports= {
	router: router
};