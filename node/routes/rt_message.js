/* global utils */
"use strict";

var express= require("express");
var router= express.Router();
var dbMessage= require("../db/db_message.js");

router.post("/message", function (req, res){
	var username= req.body.username;
	var message={
		title	: req.body.title,
		content	: req.body.content
	};
	
	utils.responseHandler(req, res, function(){
		return dbMessage.postMessage(username, message);
	});
	
});

router.get("/message/:id", function (req, res){
	var messgaeId= req.params.id;
	res.json({message: "Message retrieved."});
});

router.delete("/message/:id", function (req, res){
	var messageId= req.params.id;
	res.json({message: "Message deleted."});
});

module.exports= {
	router: router
};