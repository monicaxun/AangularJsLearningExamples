/*一旦AngularJs跑到页面的ng-controller申明处，这个函数将被调用*/
function InlineEditorController($scope){

	/*$scope定义页面可使用的变量*/
	$scope.showTooltips = false;
	$scope.value = "Edit me!";

	$scope.hideTooltips = function(){
		$scope.showTooltips = false;

	}

	$scope.toogleTooltips = function(e){
		e.stopPropagation();
		$scope.showTooltips = !$scope.showTooltips;
	}
}