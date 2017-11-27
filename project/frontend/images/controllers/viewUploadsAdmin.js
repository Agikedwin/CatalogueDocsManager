
// Define the `phonecatApp` module
var viewDocsApp = angular.module('viewDocsApp', ['angularUtils.directives.dirPagination']);

// Define the `PhoneListController` controller on the `phonecatApp` module
viewDocsApp.controller('DocViewCtrl', function viewDocsController($scope,$http) {
  
  $http.get('/fileUpload').success(function(response){
   
    $scope.fileUpload=response;
     console.log(response)

     console.log('i received the data requested and posted to browser');

     var theObject = response;

     var results = theObject.filter(function(key){
      return key.classification == "secret ";
     });
//uncomment this
    //$scope.fileUpload = results;
     console.log(results);
    

})

  $scope.showTag = function (file) {
        var fileExt = file.split('.').pop();
        //console.log(fileExt);
        if(fileExt == 'mp3' || fileExt == 'wav'){
            return true;
        }
        return false;
    }

    $scope.showVideoTag = function (file) {
        var fileExt = file.split('.').pop();
        //console.log(fileExt);
        if(fileExt == 'mp4' ){
            return true;
            //console.log(file);
        }
        return false;
    }

  

    $scope.showDocumentsTag = function (file) {
        var fileExt = file.split('.').pop();
        //console.log(fileExt);
        if(fileExt == 'pdf' || fileExt == 'docx'  || fileExt == 'xlsx' || fileExt == 'pptx'
           || fileExt == 'ACCDB'){
            return true;
           // console.log(file);
        }
        return false; 
    }

    $scope.showImageTag = function (file) {
        var fileExt = file.split('.').pop();
        //console.log(fileExt);
        if(fileExt == 'jpg' || fileExt == 'png' || fileExt == 'jpeg' 
          || fileExt == 'gif'  || fileExt == 'tif' || fileExt=='PNG' 
          || fileExt=='JPEG' || fileExt=='JPG' || fileExt=='JPEG'){
            return true;
           // console.log(file);
        }
        return false; 
    }
    $scope.relativeUploadDir = function(filename){
      return "../uploads/"+filename;
    }

  $scope.viewfiles = function(filename){
    console.log(filename);
    $http.get('/fileUpload/' + filename).success(function(response){
     console.log('viewing file details ....' );
      console.log(response);
    });
  };

$scope.selectedType = function(type){
  console.log('item selected ....' );
    console.log(type);
    $http.get('/viewType/' + type).success(function(response){
     console.log('viewing file details ....' );
      //console.log(response);
     // renderImage(this.files[0])
      

    });
  };

  $scope.selectedType = function(type){
  console.log('item selected ....' );
   // console.log(type);
    $http.get('/fileUpload/' + type).success(function(response){
     console.log('viewing file details ....' );
      //console.log(response);
      

    });
  };




});

