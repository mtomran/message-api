/* global utils */
"use strict";

var express= require("express");
var router= express.Router();
var dbMessage= require("../db/db_message.js");

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

router.get("/message/:id", function (req, res){
	var messageId= req.params.id;
	
	utils.responseHandler(req, res, function(){
		return dbMessage.getMessage(messageId);
	});
});

router.get("/message", function(req, res){
	utils.responseHandler(req, res, function(){
		return dbMessage.getAllMessages();
	});
});

router.delete("/message/:id", function (req, res){
	var messageId= req.params.id;
	
	utils.responseHandler(req, res, function(){
		return dbMessage.deleteMessage(messageId);
	});
});

module.exports= {
	router: router
};