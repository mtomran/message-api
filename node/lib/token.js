/* global config */

/**
 * token generation and validation middleware
 * 
 * documentation:
 * https://self-issued.info/docs/draft-ietf-oauth-json-web-token.html
 * 
 * @module
 */

"use strict";
var jwt= require("jsonwebtoken");

// a seed value to be used for creating unique ID for tokens (jti)
var tokenIdSeed= Math.round(new Date().getTime() / 1000);

/**
 * extracts the tocken from the request
 */
var getToken = function (req) {
	var token = (req.body && req.body.access_token)
		|| req.params.token
		|| (req.query && req.query.access_token)
		|| req.headers["x-access-token"]
		|| req.cookies.accesstoken;

	return (token);
};

/**
 * Generates the token phrase for a given token json object 
 */
function genToken(tokenData) {
	tokenData.jti= tokenIdSeed++;
	var token = jwt.sign(tokenData, config.token.secret, { expiresIn: config.token.expiry+"d" });
	return token;
}


module.exports = {
	genToken: genToken,
	getToken: getToken
};