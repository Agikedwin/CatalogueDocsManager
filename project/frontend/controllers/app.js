//Define an angular module for our app

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
myApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  	//$urlRouterProvider.otherwise("/login")
    

    $stateProvider.
    state('addUsers', {
    	url: "/addUsers",
      templateUrl: 'addUsers.html',
      controller: 'usersCtrl',
		//authenticated: true
	}).
    state('getUsers', {
     url: "/getUsers",
     templateUrl: 'viewUsers.html',
     controller: 'usersCtrl',
		//authenticated: true
	}).
    state('manageUsers', {
     url: "/manageUsers",
     templateUrl: 'manageUsers.html',
     controller: 'usersCtrl',
     authenticated: true
   }).
    state('UserProfile', {
     url: "/UserProfile",
     templateUrl: 'Userprof.html',
     controller: 'usersCtrl',
     authenticated: true
   }).
    state('uploadDocs', {
     url: "/uploadDocs",
     templateUrl: 'uploadDocs.html',
     controller: 'uploadFileController',
     authenticated: true

   }).
    state('viewDocs', {
     url: "/viewDocs",
     templateUrl: 'viewDocs.html',
     controller: 'DocViewController',
     authenticated: true
   }).
    state('login', {
     url: "/login",
     templateUrl: 'login.html',
     controller: 'TestController'
   }).
    state('changeLogin', {
     url: "/changeLogin",
     templateUrl: 'changeLogin.html',
     controller: 'TestController',
     authenticated: true
   }).
    state('logout', {
     url: "/logout",
     templateUrl: 'index.html',
     controller: 'logoutController',
     
   })
    /*.state('home', {
      url: '/',
      views: {
        '': {
          templateUrl: '/main.html'
        },
        'nav@home': {
         templateUrl: '/nav.html'
        },
        'body@home': {
         templateUrl: './templates/body.html'
        },
        'footer@home': {
          templateUrl: './templates/assets/footer.html'
        }
      }
    });
    */


  }]);




myApp.run(["$rootScope", "$location", "authFact",'$window', '$sessionStorage','$localStorage',
  function($rootScope,$location,authFact,$scope,$window,$sessionStorage,$localStorage){  	
  	console.log("app running.....");

    

    var userAuthToken=localStorage.getItem('token');
    var userAuthTokenJson=JSON.parse(userAuthToken);
    //console.log(userAuthTokenJson);

   /* $window.sessionStorage.setItem("SavedString",JSON.parse(userAuthToken));
    

    $scope.name = $window.sessionStorage.getItem("SavedString");
    console.log($scope.name );*/

    
    

   var userAuthSession = sessionStorage.getItem('session');
   var userAuthSessionJson=JSON.parse(userAuthSession);
    console.log(userAuthSessionJson);
    //sessionStorage.clear();
    $rootScope.loggedUser=userAuthSessionJson.username;
    $rootScope.userGroup=userAuthSessionJson.accessLevel;
  console.log("access ..."+$rootScope.userGroup);
    
   
    
    $rootScope.$on('$stateChangeSuccess',function(event,next,current) {
      
     var userAuth=authFact.getAccessToken();

     if (next.authenticated) {
      
    //sessionStorage.removeItem('session');

      if (!userAuthSessionJson) {
       console.log(".......loading main app...");
       window.location = "../index.html";

     }
   }

 });
  }

  ]);