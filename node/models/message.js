var mongoose = require("mongoose");
var Schema= mongoose.Schema;

var messageSchema= new Schema({
	title	: String,
	content	: String,
	_user	: {type: Schema.Types.ObjectId, ref: "User"},	
	date	: {type: Date, default: Date.now}	
});

var Message = mongoose.model("Message", messageSchema);

module.exports = {
	Message: Message
};