$(document).ready(function(){
	$("#signinForm").submit(function(e){
		e.preventDefault();
		
		var username= $("#inputUsername").val();
		var password= $("#inputPassword").val();
		login(username, password);
	});
});

function login(username, password){
	var loginData= {
		username: username,
		password: password
	};
	
	return $.ajax({
		data 	: loginData,
		type 	: "post",
		url		: "/api/v1/auth/login",
		success	: function(data){
			console.log(data.message);
			
			if(data.token){
				window.location.replace("/main");
				window.localStorage.setItem("user", data.user);
			}
		}
	});
}