myApp.directive('filemodel', ['$parse',  function($parse){
	return{

		link: function(scope,element, attrs){
			var model=$parse(attrs.filemodel);
			var modelSetter = model.assign;

			element.bind('change',function(){
				scope.$apply(function(){
					modelSetter(scope,element[0].files[0]);
				})
			})
		}
	}
	console.log('scope changed at  filemodel');
}])