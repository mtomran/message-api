/* global db */
var bluebird= require("bluebird");
var mongoose= require("mongoose");
var _= require("lodash");


function postMessage(username, message){	
	return db.User.findOne({ username: username }).exec().bind({})
	.then(function(user){		
		if(!user) throw new Error("Could not find user '"+ username+ "'.");
		
		this.user= user;
		message._user= user._id;
		var messageObj = new db.Message(message);
				
		return messageObj.save();
	})
	.tap(function(newMessage){
		this.user.messages.push(newMessage);
		
		return this.user.save();
	})
	.then(function(newMessage){
		var message= "Message '"+ newMessage.title+ "' inserted.";
		console.log(message);
		return bluebird.resolve({ message: message, data: newMessage });		
	});
}


function getMessage(messageId){
	var messageIdObj= mongoose.Types.ObjectId(messageId);
	return db.Message.findOne({ _id: messageIdObj })
	.populate("_user")
	.exec()
	.then(function(message){
		if(!message) throw new Error("Could not find message with id: '"+ messageId+"'.");	
		
		var successMessage= "Retrieved message with id '"+ message._id+ "'.";
		console.log(successMessage);		
		return bluebird.resolve({ 
			message: successMessage, 
			data: message, 
			isPalindrome: checkPalindrome(message.content) 
		});
	});
}


function getAllMessages(){
	return db.Message.find()
	.populate("_user")
	.exec()
	.then(function(messages){
		var successMessage= "Retrieved "+ messages.length+ " message(s)";
		console.log(successMessage);
		return bluebird.resolve({ message: successMessage, data: messages });
	});
}


function deleteMessage(messageId){
	return getMessage(messageId)
	.tap(function(result){
		var message= result.data;
		var userId= message._user._id;
		
		_.remove(message._user.messages, function(item){
			return (item == userId); 
		});
		
		return message._user.save();
			
	})
	.then(function(result){
		var message= result.data;
		return message.remove();
	});
}

function checkPalindrome(str) {
	return str == str.toLowerCase().split("").reverse().join("");
}

module.exports={
	postMessage		: postMessage,
	getMessage 		: getMessage,
	getAllMessages	: getAllMessages,
	deleteMessage	: deleteMessage
};