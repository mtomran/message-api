/* global __dirname */
var express = require("express");
var router= express.Router();
var oneYear = 31557600000;

router.use("/public", express.static(__dirname + "/../public", { maxAge: oneYear, etag: false }));
router.use("/private", express.static(__dirname + "/../private", { maxAge: oneYear, etag: false }));
router.use("/apidoc", express.static(__dirname + "/../../apidoc"));
router.use("/jsdoc", express.static(__dirname + "/../../jsdoc"));

module.exports = {
	router: router
};
