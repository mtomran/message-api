/**
 * Application utility functions
 * 
 * @module
 */

var bluebird= require("bluebird");

/**
 * provides the proper response for routes
 * 
 */
var responseHandler = function (req, res, dbFunc, socketFunc) {
	return bluebird.try(function () {
		return dbFunc();
	})
	.then(function (result) {		
		res.json(result);
		if (socketFunc) {
			//add the code that sends the data through the socket
			//socket.sendHandler(reqObj);
		}
		return bluebird.resolve();
	})
	.catch(function (err) {	
		console.log("Request Failed.", err.stack);
		var status = err.status || 500;
		res.status(status);		
		res.json(err);
	});
};

module.exports = {
	responseHandler: responseHandler
};