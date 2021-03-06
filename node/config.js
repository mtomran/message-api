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
		username: "admin",
		password: "secret",
		first_name: "Administrator",
		last_name: "Master"
	}
};
