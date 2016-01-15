"use strict";

var _ = require("lodash");
var bluebird= require("bluebird");
var db= {};
module.exports = function(){
	var mongoose = require("mongoose");
	mongoose.Promise = bluebird;
	var util= require("util");
	var options = {
		db: { native_parser: true },
		server: { poolSize: 20, keepAlive: 1 }
	};
	
	var connString= util.format("mongodb://%s:%s@%s/%s?authSource=%s", 
		config.mongo.user, 
		config.mongo.pass, 
		config.mongo.host, 
		config.mongo.database, 
		config.mongo.user
	);
	
	mongoose.connect(connString, options);
	
	
	var fs= require("fs");
	var path= require("path");
	var normalizedPath = path.join(__dirname, "");
	
	fs
	.readdirSync(normalizedPath)
	.forEach(function(file) {
		if (file == "index.js" || path.extname(file)!=".js") return;
		
		var model= require("./"+file);
		db= _.merge(db, model);
	});
	
	return db;
};