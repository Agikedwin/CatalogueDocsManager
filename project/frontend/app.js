//Define an angular module for our app

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/uploadDocs', {
		templateUrl: 'uploadDocs.html',
		controller: 'uploadFileController'
		
	}).
      when('/viewDocs', {
		templateUrl: 'viewDocs.html',
		//controller: 'ShowOrdersController'
	}).
      when('/addUsers', {
		templateUrl: 'addUsers.html',
		controller: 'usersCtrl'
	})
      .
      when('/getUsers', {
		templateUrl: 'viewUsers.html',
		controller: 'usersCtrl'
	}).
      when('/manageUsers', {
		templateUrl: 'manageUsers.html',
		controller: 'usersCtrl'
	})
}]);


