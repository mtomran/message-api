/* global global */
/* global config */
global.config = require("./config.js");
global.utils= require("./lib/utils.js");
global.db = require("./models")();

console.log("*********", config);
var dbUser= require("./db/db_user.js");
dbUser.addMasterUser();

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var _= require("lodash");
var logger = require("morgan");
var token = require("./lib/token.js");
var exjwt = require("express-jwt");
var blacklist = require("express-jwt-blacklist");
var app = exports.app = express();
var http = require("http");
var server = http.createServer(app);

var io = require("socket.io")(server);
var socket = require("./lib/socket.js");
socket.init(io);

server.listen(config.api.port, function () {
	console.log("The Messaging REST API started on port " + config.api.port);
});


blacklist.configure({
	tokenId: "jti",
	strict: false,
	store: {
		type: "redis",
		host: "redis",
		port: 6379,
		keyPrefix: "blacklist:",
		options: {
			timeout: 1000
		}
	}
});

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("Messaging.REST.API"));

app.all("/*", function (req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	
	// Set custom headers for CORS
	res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token");
	if (req.method == "OPTIONS") {
		res.status(200).end();
	} else {
		next();
	}
});

// preventing browsers to cache get routes
app.get("/api/v1/*", function (req, res, next) {
	var skipPaths= ["/api/v1/client/lib/scc.min.js"];
	
	if(_.contains(skipPaths, req.path)) {
		//var oneYear = 31557600;
		//res.header("Cache-Control", "public, max-age=" + (oneYear));
		//res.set("Expires", new Date(Date.now() + 345600000).toUTCString());
	}else{
		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
		res.header("Pragma", "no-cache");
		res.header("Expires", 0);		
	}
	next();
});


// adding the token validation middleware.
var validatedRoutes = ["/api/v1/*"]; 
var skippedRoutes = ["/api/v1/auth/login", "/api/v1/welcome"];

app.use(validatedRoutes, exjwt({
	secret: config.token.secret,
	credentialsRequired: true,
	isRevoked: blacklist.isRevoked,
	getToken: token.getToken

}).unless({ path: skippedRoutes }));

app.get("/api/v1/welcome", function (req, res) {
	var pkg= require("./package.json");	
	res.json({ message: "Welcome to the Messaging REST API.", version: pkg.version});
});

var routes = require("./routes");
app.use("/api/v1", routes.router);

//If no route is matched by now, it must be a 404
app.use(function (err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({ status: false, message: "Unauthorized Access" });
		return;
	}

	err = err || new Error("Not Found");
	err.status = 404;
	next(err);
});