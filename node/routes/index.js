/* global __dirname */
var express = require('express');
var router = express.Router();

var fs = require("fs");
var path = require("path");
var normalizedPath = path.join(__dirname, "");

fs
	.readdirSync(normalizedPath)
	.forEach(function (file) {
		if (file == "index.js" || path.extname(file)!=".js") return;

		var rt = require("./" + file).router;
		router.use('/', rt);
	});

module.exports = {
	router: router
};
