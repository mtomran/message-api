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
	
	$http({
		method 	: "get",
		url		: "/api/v1/welcome"	
	})
	.then(function(response){
		var data= response.data;
		console.log(data.message);
		
		$scope.version= data.version;
	});
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
			window.localStorage.setItem("user", data.user.first_name+ " "+ data.user.last_name+ " ("+data.user.username +")");
		}
	})
	.catch(function(err){
		console.log(err);
		$scope.showError= true;
	});
}
