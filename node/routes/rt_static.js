/* global __dirname */
var express = require("express");
var router= express.Router();
var oneYear = 31557600000;

router.use("/client", express.static(__dirname + "/../client", { maxAge: oneYear, etag: false }));
router.use("/apidoc", express.static(__dirname + "/../apidoc"));
router.use("/jsdoc", express.static(__dirname + "/../jsdoc"));

module.exports = {
	router: router
};
