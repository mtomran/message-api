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