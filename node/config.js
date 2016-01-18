/* global process */
module.exports= {
	api: {
		port: 8000
	},	
	mongo: {
		host: "127.0.0.1",//"mongodb",
		user: process.env.MONGODB_USER || "",
		pass: process.env.MONGODB_PASS || "",
		database: "message"
	},
	token: {
		expiry: 7,	//in days
		secret: "jwt.secret.message"	
	},
	masterUser: {
		username: "admin",
		password: "secret",
		first_name: "Administrator",
		last_name: "Master"
	}
};
