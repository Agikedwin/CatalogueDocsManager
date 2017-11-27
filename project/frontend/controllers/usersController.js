
// Define the `phonecatApp` module
// Define the `PhoneListController` controller on the `phonecatApp` module
myApp.controller('usersCtrl', function usersController($scope,$http) {
  var refresh=function(){
  $http.get('/getUsers').success(function(response){
    
    $scope.myusers=response;
    console.log(response);
    $scope.user="";
    $scope.addMyUsers="Add New Users";
    $scope.viewUsers="Registered Users";
    $scope.manageUsers="Manage Users";
     $scope.successMsg=0;
     $scope.message="";

  });
};

refresh();

 $scope.addUsers= function(){
  if ($scope.addUserForm.$valid) {
    console.log("adding user.....");
    console.log($scope.user);
      $http.post('/addUsers',$scope.user).success(function(res,req){
       $scope.message=res.message;
       console.log(res);
  });
    $scope.successMsg=1;
    
      }else{
       
        $scope.successMsg=2;
      }

  
}

$scope.remove= function(id){
    console.log(id);
    $http.delete('/deleteUser/' + id).success(function(response){
      refresh();
    });
  };


$scope.edit= function(id){
    
    $http.get('/editUser/' + id).success(function(response){
    $scope.user=response;
    
  });
};


$scope.update= function(id){
  
    $http.put('/updateUser/' + $scope.user._id, $scope.user).success(function(response){
    $scope.user=response;
    refresh();
    
  });
};
/*$scope.logout= function () {
  console.log('loging out .......');
    localStorage.removeItem('token');
     window.location = "../index1.html";
   }
// user validation starts here
*/


});
