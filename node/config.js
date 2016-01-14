/* global process */
module.exports= {
	api: {
		port: 8000
	},	
	mongo: {
		host: "mongo",
		user: "admin",
		pass: "secret",
		database: "message"
	},
	token: {
		expiry: 7,	//in days
		secret: "jwt.secret.message"	
	}
};
