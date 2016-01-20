var mongoose = require("mongoose");
var Schema= mongoose.Schema;

var userSchema= new Schema({
	username	: String,
	password	: String,
	first_name	: String,
	last_name	: String,
	messages	: [{type: Schema.Types.ObjectId, ref: "Message"}]		
});

var User = mongoose.model("User", userSchema);

module.exports = {
	User: User
};