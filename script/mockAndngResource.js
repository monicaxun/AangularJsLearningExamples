/*
＊ List － Resource.query()
* Create - Resource.save() or resource.$save()
* Get - Resource.get()
* Update - Resource.update() or resource.$update()
* Delete/remove - Resource.remove or resource.$remove()
*/

var app = angular.module("mockApp", ["ngResource","ngMockE2E"]);

/*定义一个提供Angular组件和后端mock数据的接口服务的Contract resources*/
app.factory("Contact", ["resource", function ($resource) {
	 return $resource(
	 	"/contacts/:id",
	 	{id: "@id"},
	 	{
	 		"update": {
	 			method: "PUT"
	 		}
	 	}
	 );
}]);

/*$httpBackend其实是通过一个run模块来定义的
在我们的例子中我们把它添加到app的run模块中，然后定义一组contacts*/
app.run(["httpBackend", function ($httpBackend) {
	 contacts = [
	    {
	      id: 1,
	      name: 'Ada Lovelace',
	      phone: '8445551815'
	    },
	    {
	      id: 2,
	      name: 'Grace Hopper',
	      phone: '8445551906'
	    },
	    {
	      id: 3,
	      name: 'Charles Babbage',
	      phone: '8445556433'
	    }
	 ]; 

	// $httpBackend interactions are defined here...
}])

/*这个contacts数组是mock backend的所有操作都可以访问的，就像一个数据仓库，这是创建mock数据仓库的一种方式。
另一种方式是创建一个以resources的id为下标的关联数组。
另外为了简单和条理清晰我们还要定义一些数组查找和操作的基础方法，
不想这么麻烦就直接用underscore或者lodash。*/

/*我们先模拟一个最简单的通讯录接口，用get方式请求/contacts就返回整个通讯录。*/
$httpBackend.whenGET("/contacts").respond(contacts);

$httpBackend.whenPOST("/contacts").respond(function (method, url, data) {
	 var newContact = angular.fromJson(data);
	 contacts.push(newContact);

	 return [200, newContact, {}];
});

/*$httpBackend.whenGET(/\/contact\/(\d+)/, undefined, ["id"]).respond*/