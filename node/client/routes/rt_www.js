/* global __dirname */
var express = require("express");
var router= express.Router();
var path= require("path");


router.get("/", function(req, res){
	if(req.username){
		res.redirect("/main");
	}else{
		res.sendFile(path.join(__dirname,"/../public/views/login.html"));
	}
});


router.get("/main", function(req, res){
	res.sendFile(path.join(__dirname,"/../private/views/main.html"));
});


module.exports = {
	router: router
};


