/**
 * Angular controllers and services
 */
angular.module("messageApp", [])
.controller("mainController", ["$scope", "MainService" , function($scope, MainService) {
	$scope.refreshMessages= function(){
		MainService.getAllMessages()
		.then(function(messages){			
			$scope.messages= messages.data;
		});
	};
	
	$scope.refreshUsers= function(){
		MainService.getAllUsers()
		.then(function(users){			
			$scope.users= users.data;
		});
	};
	
	$scope.logout= function(){		
		MainService.logout()
		.then(function(response){
			window.location.replace("/");
		});
	};
	
	$scope.sendNewMessage= function(){
		MainService.postMessage($scope.newTitle, $scope.newContent)
		.then(function(response){
			var message= response.data;
			$scope.messages.push(message);
			$scope.newTitle= "";
			$scope.newContent= "";
			console.log(response);
		});
	};
	
	$scope.addNewUser= function(){
		MainService.postUser($scope.newUsername, $scope.newPassword, $scope.newFirstName, $scope.newLastName)
		.then(function(response){
			var user= response.data;
			$scope.users.push(user);
			$scope.cancelUser();
			console.log(response);
		});
	};
	
	$scope.cancelUser= function(){
		$scope.newUsername= "";
		$scope.newPassword= "";
		$scope.newFirstName= "";
		$scope.newLastName= "";
		$scope.showNewUser= !$scope.showNewUser;
	}
	
	$scope.getMessage= function(message){
		MainService.getMessage(message._id)
		.then(function(response){
			message.showMessage= !message.showMessage;
			message._user= response.data._user;
			message.isPalindrome= response.isPalindrome;
			console.log(response);			
		});	
	};
	
	$scope.deleteMessage= function(messageId){
		MainService.deleteMessage(messageId)
		.then(function(response){
			console.log(response);
			return _.remove($scope.messages, function(message){				
				return (messageId == message._id);
			});
		});	
	};
	
	$scope.deleteUser= function(deleteUser){
		MainService.deleteUser(deleteUser)
		.then(function(response){
			console.log(response);
			return _.remove($scope.users, function(user){				
				return (deleteUser._id == user._id);
			});
		});	
	};
	
	MainService.getAllUsers()
	.then(function(users){
		console.log(users);
		$scope.users= users.data;
	});
	
	MainService.getAllMessages()
	.then(function(messages){		
		$scope.messages= messages.data;
	});	

}])
.factory("MainService", ["$http", function($http){
	function MainService(){}
	
	MainService.getAllUsers= function(){
		return serviceHelper($http, {
			method: "GET",
			url: "/api/v1/user"
		});
	};
	
	MainService.postMessage= function(title, content){
		return serviceHelper($http, {
			method: "POST",
			data: { 
				title: title, 
				content: content 
			},
			url: "/api/v1/message"
		});
	};
	
	MainService.deleteMessage= function(messageId){
		return serviceHelper($http, {
			method: "DELETE",
			url: "/api/v1/message/"+messageId
		});
	};
	
	MainService.getMessage= function(messageId){
		return serviceHelper($http, {
			method: "GET",
			url: "/api/v1/message/"+messageId
		});
	};
	
	MainService.getAllMessages= function(){
		return serviceHelper($http, {
			method: "GET",
			url: "/api/v1/message"
		});
	};
	
	MainService.postUser= function(username, password, first_name, last_name){
		return serviceHelper($http, {
			method: "POST",
			data: { 
				username: username, 
				password: password,
				first_name: first_name,
				last_name: last_name 
			},
			url: "/api/v1/user"
		});
	};
	
	MainService.deleteUser= function(user){
		return serviceHelper($http, {
			method: "DELETE",
			url: "/api/v1/user/"+user.username
		});
	};
	
	MainService.logout= function(){
		return serviceHelper($http, {
			method: "POST",
			url: "/api/v1/auth/logout"
		});
	};
	
	return MainService;
}]);

function serviceHelper($http, options){	
	return $http(options)
	.then(function(response){
		return Promise.resolve(response.data);			
	})
	.catch(function(err){
		console.log(err);
	});
}