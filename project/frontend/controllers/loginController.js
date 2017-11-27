
// Define the `phonecatApp` module
// Define the `PhoneListController` controller on the `phonecatApp` module
myApp.controller('TestController', ['$scope','$http','authFact','$location','$window' ,
  function usersController($scope,$http,authFact,$location,$window) {
  
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
    $http.post('/authenticate' , $scope.user).success(function(response){
    $scope.user=response;
    console.log(response);
    authFact.setAccessToken(response.accessToken);
    
    if (response.accessToken) {
      $scope.showLoginMsg=response.message;
       $scope.showLoginStatus=response.success;
     
    }else {
      
       $scope.showLoginStatus=response.success;
      $scope.showLoginMsg=response.message;
      //$location.path('/login');
    }
    
  });
};

$scope.loginPage= function (argument) {
  //$location.path('/login');
  window.location = "../index.html";
}
$scope.changePwd= function (argument) {
  $location.path('/changeLogin');
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
