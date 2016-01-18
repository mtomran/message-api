/* global process */
module.exports= {
	api: {
		port: 8000
	},	
	mongo: {
		host: "mongodb",
		user: "admin",
		pass: "secret",
		database: "message"
	},
	token: {
		expiry: 7,	//in days
		secret: "jwt.secret.message"	
	},
	masterUser: {
		username: process.env.MONGODB_USER || "admin",
		password: process.env.MONGODB_PASS || "secret",
		first_name: "Administrator",
		last_name: "Master"
	}
};
