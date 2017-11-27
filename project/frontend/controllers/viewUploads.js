
// Define the `phonecatApp` module
//var viewDocsApp = angular.module('viewDocsC', ['angularUtils.directives.dirPagination','720kb.datepicker']);
var viewDocsApp = angular.module('viewDocsApp', []);
// Define the `PhoneListController` controller on the `phonecatApp` module
viewDocsApp.controller('DocViewController', function viewDocsController($scope,$http) {
  console.log("reached view controllers")


$scope.countDocs = 0;
$scope.countPhotos = 0;
$scope.countAudios = 0;
$scope.countVideos= 0;


  var refresh= function(){
  $http.get('/fileUpload').success(function(response){
   
    $scope.fileUpload=response;

     console.log(response)
     
     console.log('i received the data requested and posted to browser');
         console.log('i received the data requested at new test ======================================');

     var theObject = response;

     var results = theObject.filter(function(key){
      return key.classification == "secret ";
     });
//uncomment this
    //$scope.fileUpload = results;
     

     //set pagination variables



})
}

refresh();

//refresh records

$scope.refreshPage= function(){

  $http.get('/refresh/').success(function(response){
   
    $scope.refresh=response;
     console.log(response)

     console.log('trying to refresh browser');

     var theObject = response;

     var results = theObject.filter(function(key){
      return key.classification == "secret ";
     });
//uncomment this
    //$scope.fileUpload = results;
     console.log(results);

     //set pagination variables



})
}

//serch records based on dates
 $scope.filterByDates= function(fromdate, dateto){
  $http.get('/fileUploadByDate/'+fromdate).success(function(response,req){
   var theObject;
   $scope.msg="";
   $scope.fileUpload=response;
   $scope.msg="";
    if (response) {
      $scope.msg="yes";
       theObject = response;
       var results = theObject.filter(function(key){
      return key.classification == "secret ";
     });
      // console.log('status no '+msg);
    }else{
      $scope.msg="no";
     // console.log('status no '+msg);
    };
     
    
     

     
//uncomment this
    //$scope.fileUpload = results;
     console.log(results);

     //set pagination variables



})
}
//reload the page after click to change status
$scope.reloadPage= function(){
  console.log("page reloaded")
  refresh();
}
//checks if the document is already seen
$scope.changeStatus= function(id,state){
    console.log(id+"  getting changeStatus");
    $http.put('/fileUpload/' + id).success(function(response){
    console.log(response);
    $scope.view=response;
    console.log($scope.view.state);
    
  });
};

//archive the document by setting the deleted to 1

$scope.archiveDoc= function(id){
    
    $http.put('/deleted/' + id).success(function(response){
    console.log(response);
    $scope.view=response;
    console.log("arching at controller");
    
  });
};


$scope.changeColor= function(state){
  console.log("reach change color 1  "+state);
  if (state==0) {
    console.log("reach change color  "+state);
    var color="red";
    return color;
  }else{
    console.log("not reach change color  "+state);
    return null;
}
};

  $scope.showTag = function (file) {
    
        var fileExt = file.split('.').pop();
        //console.log(fileExt);
        if(fileExt == 'mp3' || fileExt == 'wav'){
          $scope.countAudios++;
            return true;
            console.log("the file obtained  "+file);
        }

        return false;

    }

    $scope.showVideoTag = function (file) {
     
        var fileExt = file.split('.').pop();
        //console.log(fileExt);
        if(fileExt == 'mp4' ){
          $scope.countVideos++;
            return true;
            //console.log(file);
        }
        return false;
    }

  

    $scope.showDocumentsTag = function (file) {
     
        var fileExt = file.split('.').pop();
        //console.log(fileExt);
        if(fileExt == 'pdf' || fileExt == 'docx'  || fileExt == 'xlsx' || fileExt == 'pptx'
           || fileExt == 'ACCDB' || fileExt == 'txt'){
          $scope.countDocs++;
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
          $scope.countPhotos++;
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

