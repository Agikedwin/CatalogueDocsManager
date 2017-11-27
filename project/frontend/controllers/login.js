
var mylogin = angular.module('mylogin', ['authentication','ngStorage','angular-jwt']);
mylogin.controller('TestController', ['$scope','$http','authFact','$location','$window','$timeout' ,'$localStorage',
    '$sessionStorage',
  function usersController($scope,$http,authFact,$location,$window,$timeout,$localStorage,
    $sessionStorage,jwtHelper) {

    
  var refresh=function(){
  $http.get('/getUsers').success(function(response){
    
    $scope.myusers=response;
    
    console.log(response);
    $scope.user="";
    $scope.addMyUsers="Add New Users";
    $scope.viewUsers="Registered Users";
    $scope.manageUsers="Manage Users";
     $scope.successMsg=0;
     $scope.status=0;

  });
};

refresh();

$scope.authenticate= function(){
   $scope.showLoginMsg="";
    $scope.showLoginStatus="";

    
    $http.post('/authenticate' , $scope.user).success(function(response,status, headers, config){
    $scope.user=response;
    console.log(response);
    var storeData = {
       token:response.accessToken,
       username:response.username,
       accessLevel:response.accessLevel

    };

    localStorage.setItem('token', JSON.stringify(storeData));
    sessionStorage.setItem('session', JSON.stringify(storeData));
    
    var loc=localStorage.getItem('token');
    var loc2=JSON.parse(loc);
    console.log(loc2.token);

    authFact.setAccessToken(response.accessToken);
   
    if (response.accessToken) {
      $scope.showLoginMsg=response.message;
       $scope.showLoginStatus=response.success;
     

     showProgress();
  function showProgress() {
  $timeout(function(){ 
   window.location = "../index1.html";
   }, 2000);
     
 }

      
    }else {
      
       $scope.showLoginStatus=response.success;
      $scope.showLoginMsg=response.message;
      //window.location = "../index.html";
    }
    
  });
};


$scope.showNotification = function () {
    console.log("trying to notify");
    notifyMe();
    function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there! agik");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}
}

$scope.loginPage= function (argument) {
  //$location.path('/login');
  window.location = "../index.html";
}
$scope.changePwd= function (argument) {
  //$location.path('/changeLogin');
  window.location = "../changeLogin.html";
}

$scope.status=0;
$scope.message="";
$scope.successMg="";
$scope.validate= function(){
  
if ($scope.user.newpassword == $scope.user.conpassword) {
   
   $http.post('/changeUnamePwd',$scope.user).success(function(response) {
   if(response.success){
     $scope.status=2;
   }else {
      $scope.status=1;
   }
   $scope.message=response.message;
    console.log(response);
 });

   }else {
    
    $scope.status=1
    
     $scope.message="Passwords entered do not match";
     //$location.path('/changeLogin');
      console.log("pwd not same");
        
   }

 
  };
   
}]);

