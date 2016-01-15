/* global db */
var bluebird= require("bluebird");


function postMessage(username, message){	
	return db.User.findOne({ username: username })
	.then(function(user){		
		if(!user) throw new Error("Could not find user '"+ username+ "'.");
		
		
		
		message._user= user._id;
		console.log("******", user);
		console.log("******", message);
		var messageObj = new db.Message(message);
				
		return messageObj.save();
	})
	.then(function(newMessage){
		var message= "Message '"+ newMessage.title+ "' inserted.";
		console.log(message);
		return bluebird.resolve({ message: message, data: newMessage });		
	});
}


module.exports={
	postMessage	: postMessage
};