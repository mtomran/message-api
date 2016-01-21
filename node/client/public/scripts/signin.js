/* global angular window */

/**
 * Angular controller
 */
angular.module("messageApp", [])
.controller("loginController", ["$scope", "$http" , function($scope, $http) {
	$scope.showError= false;
	
	$scope.signIn= function(){
		login($http, $scope);
	};
}]);

function login($http, $scope){
	var loginData= {
		username: $scope.username, 
		password: $scope.password
	};
	
	return $http({
		data 	: loginData,
		method 	: "post",
		url		: "/api/v1/auth/login"		
	})
	.then(function(response){
		var data= response.data;
		console.log(data.message);
		
		if(data.token){
			window.location.replace("/main");
			window.localStorage.setItem("user", data.user);
		}
	})
	.catch(function(err){
		console.log(err);
		$scope.showError= true;
	});
}
