
// Define the `phonecatApp` module
var myApp = angular.module('myApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
myApp.controller('usersController', function UsersController($scope,$http) {
  var refresh=function(){
  $http.get('/getUsers').success(function(response){
    console.log('i received the data requested');
    $scope.myusers=response;
    console.log(response);
    $scope.user="";

  });
};
refresh();

 $scope.addUsers= function(){
 // console.log($scope.mycontacts);
  $http.post('/addUsers',$scope.user).success(function(res,req){
    console.log(req);
    refresh();
  });
}

$scope.remove= function(id){
    console.log(id);
    $http.delete('/myusers/' + id).success(function(response){
      refresh();
    });
  };


$scope.edit= function(id){
    console.log(id);
    $http.get('/myusers/' + id).success(function(response){
    $scope.user=response;
    
  });
};


$scope.update= function(id){
    console.log(id);
    $http.put('/myusers/' + $scope.user._id, $scope.user).success(function(response){
    $scope.user=response;
    refresh();
    
  });
};

});
