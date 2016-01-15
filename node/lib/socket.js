/* global log */
/* global config */

/**
 * WebSockets are used to inform logged in users of a change in the database in real-time. 
 * For more information about WebSockets visit: https://www.websocket.org/
 * 
 * Socket.io package for Nodejs is used for WebSocket communication in the platform. 
 * For detailed information about the Socket.io package visit: http://socket.io/
 * 
 * @module 
 */

var socketioJwt = require("socketio-jwt");

var SOCKETS = {}, // stores sockets by socket_id
	SOCKET_IDS = {}, // stores socket ids by user_id
	CLUSR_IDS = {}; // stores client_id, user_id combination for socket_id



/**
 * Initializes the socket connections
 * 
 * @param {object} io - socket.io object
 */
function init(io) {
	io.sockets
	.on("connection", socketioJwt.authorize({
		secret: config.token.secret
	}))
	.on("authenticated", function (socket) {
		log.info("Socket connected.", {
			"socket_id":socket.id, 
			"ip": socket.handshake.address
		});
		processSocket(socket);

		log.info("Number of connections:", Object.keys(SOCKETS).length);

		socket.on("disconnect", function () {
			log.info("Socket disconnected:", socket.id, "IP:", socket.handshake.address);
			delete SOCKETS[socket.id];
			var obj = CLUSR_IDS[socket.id];

			if (typeof obj == "undefined") {
				return;
			}

			delete CLUSR_IDS[socket.id];

			var socketIndex = SOCKET_IDS[obj.user_id].indexOf(socket.id);
			if (socketIndex >= 0) {
				SOCKET_IDS[obj.user_id].splice(socketIndex, 1);
			}
		});
	});
}


/**
 * processing the socket data
 */
function processSocket(socket) {
	var user = socket.decoded_token;
	var userId = user.user_id;
	SOCKETS[socket.id] = socket;

	CLUSR_IDS[socket.id] = user;
	if (typeof SOCKET_IDS[userId] == "undefined") {
		SOCKET_IDS[userId] = [];
	}

	SOCKET_IDS[userId].push(socket.id);
}



module.exports = {
	init: init
};