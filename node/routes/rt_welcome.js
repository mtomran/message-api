var express= require("express");
var router= express.Router();



/**
 * @api {get} /welcome Provides a welcome message and the application version
 * @apiName GetWelcome
 * @apiGroup welcome
 * 
 * @apiSuccess {String} message Welcome message.
 * @apiSuccess {String} version Current version of the application.
 */
router.get("/welcome", function (req, res) {
	var pkg= require("../package.json");	
	res.json({ message: "Welcome to the Messaging REST API.", version: pkg.version});
});

module.exports={
	router: router
};