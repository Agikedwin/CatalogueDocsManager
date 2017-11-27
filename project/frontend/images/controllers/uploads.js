

var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', ['$scope', 'multipartForm',
 function($scope, multipartForm){
     $scope.docs={};
     console.log('posting data  1.......')
    $scope.addDocument = function(){
       
        console.log('posting data  .......')
        var uploadUrl = '/fileUpload';
        multipartForm.post(uploadUrl, $scope.docs);
        
    }

   

    $scope.viewdocs= function(){
      console.log('tried to view ...');
  $http.get('/fileUpload').success(function(response){
    console.log('i received the data requested and trying to view ...');
    $scope.fileUpload=response;
    console.log($scope.fileUpload);

    console.log('----------------------------');
    console.log(response.data);
    
  })
}
    
}]);






// Define the `phonecatApp` module
//var documentApp = angular.module('documentApp', []);
/**
// Define the `PhoneListController` controller on the `phonecatApp` module
myApp.controller('docsupload', function documentAppController($scope,$http) {
  var refresh=function(){
  $http.get('/fileUpload').success(function(response){
    console.log('i received the data requested and posted to browser');
    $scope.uploadDocs=response;
    console.log($scope.uploadDocs);
    console.log($scope.uploadDocs.description);
    

  });
};

refresh();
 $scope.addDocument= function(){
  console.log('tried posting data');
  console.log($scope.uploadDocs);
  $http.post('/fileUpload',$scope.docs).success(function(response){
    console.log(response);
    refresh();
  });
}

$scope.remove= function(id){
    console.log(id);
    $http.delete('/fileUpload/' + id).success(function(response){
      refresh();
    });
  };


$scope.edit= function(id){
    console.log(id);
    $http.get('/fileUpload/' + id).success(function(response){
    $scope.contact=response;
    
  });
};


$scope.update= function(id){
    console.log(id);
    $http.put('/fileUpload/' + $scope.contact._id, $scope.contact).success(function(response){
    $scope.contact=response;
    refresh();
    
  });
};

});
**/