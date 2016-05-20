/*一旦AngularJs跑到页面的ng-controller申明处，这个函数将被调用*/
function InlineEditorController($scope){

	/*$scope对象作为控制器一个参数。在这个对象上增加属性或者函数，同样对视图可用*/
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

/*表单订单，包含货币过滤器和ng-repeat动态遍历绑定*/
function OrderFormController($scope){
	$scope.services = [
		{
			name: 'Web Development',
			price: 300,
			active:true
		},{
			name: 'Design',
			price: 400,
			active:false
		},{
			name: 'Integration',
			price: 250,
			active:false
		},{
			name: 'Training',
			price: 220,
			active:false
		}
	];

	$scope.activeStatusExchange = function(s){
		s.active = !s.active;
	};

	$scope.total = function(){
		var total = 0;

		/*初始拼写错误angular，同时forEach不是foreach*/

		angular.forEach($scope.services, function(s){
			if(s.active){
				total+=s.price;
			}
		});

		return total;
	};


}