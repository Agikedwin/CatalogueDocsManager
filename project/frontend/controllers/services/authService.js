angular.module('authentication', [])

.factory('authFact', [function(){
   //console.log(accessToken);
  var authFact={};
  var token = null;
  authFact.setAccessToken = function(accessToken){
  	console.log('auth service log');
    //console.log(accessToken);
    //console.log(localStorage.getItem('token'));
     token = localStorage.getItem('token');
     //console.log("............."+accessToken);
  }
  authFact.getAccessToken = function(){
     return token;
  };
  return authFact;
}]);