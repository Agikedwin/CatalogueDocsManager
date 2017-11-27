
myApp.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);

myApp.controller('uploadFileController', ['$scope', '$interval', '$timeout', 'multipartForm','socket','$rootScope','$http',
 function($scope, $interval, $timeout,multipartForm,$rootScope,$http){
     $scope.docs={};
     console.log('posting data  1.......')
     var socket = io.connect();
    $scope.addDocument = function(){
       //notifyMe();
        console.log('posting data  .......cclicked okay')
        var uploadUrl = '/uploadfile';
        //multipartForm.post(uploadUrl, $scope.docs);
        console.log($scope.docs);
        console.log(uploadUrl);
        
   
      
      
 };


$scope.progress = 0;

$scope.status = " ";
$scope.showProgress = 0;

 socket.on('file-progress' , function(received, expected){
      // getLoggedUser();
     var percentageProgress = ((received / 2) / expected) * 100;
     var percentageProgress = parseInt(percentageProgress);

     $scope.progress = percentageProgress;
     
     $scope.$apply();

     if ($scope.progress==100) {
      console.log("upload completed ");

      

      window.location = "../index1.html#/uploadDocs";
     }

     /*if($scope.progress===100){
      console.log("upload complete");
       $scope.status="     upload successful";

       $timeout(function () {
        $scope.status = "done";
        $scope.showProgress = 1;
        percentageProgress=0;
    }, 3000);

     }else{
      console.log("uploading..");
      $scope.status="     uploading...";
     }*/
    });

 $scope.resetProgressBar= function () {
  console.log("file selected..")
   $scope.showProgress=2;
   $scope.progress = 0;
   $scope.status="   Start uploading...  ";

 };

 var notify=function(){
 
 var options = {
  body: 'You have a new file !! please check it out ',
  sound: '../sound/solemn.mp3'
}



//n.sound // should return 'audio/alert.mp3'
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    // 
       var notify = new Notification('File Notification',options);
        notify.sound;

        
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