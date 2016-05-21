/*
＊ List － Resource.query()
* Create - Resource.save() or resource.$save()
* Get - Resource.get()
* Update - Resource.update() or resource.$update()
* Delete/remove - Resource.remove or resource.$remove()
*/

var app = angular.module("mockApp", ["ngResource","ngMockE2E"]);

/*定义一个提供Angular组件和后端mock数据的接口服务的Contract resources*/
app.factory("Contact", ["$resource", function ($resource) {
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
app.run(["$httpBackend", function ($httpBackend) {
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

	/*这个contacts数组是mock backend的所有操作都可以访问的，就像一个数据仓库，这是创建mock数据仓库的一种方式。
	另一种方式是创建一个以resources的id为下标的关联数组。
	另外为了简单和条理清晰我们还要定义一些数组查找和操作的基础方法，
	不想这么麻烦就直接用underscore或者lodash。*/

	// $httpBackend interactions are defined here...
	/*我们先模拟一个最简单的通讯录接口，用get方式请求/contacts就返回整个通讯录。*/
	$httpBackend.whenGET("/contacts").respond(contacts);

    /*再来实现Contact.save方法。ngResource的对应方法可以发送一个携带通讯录数据的post请求，
    这样后端就会增加一条新的纪录。*/
	$httpBackend.whenPOST("/contacts").respond(function (method, url, data) {
		 var newContact = angular.fromJson(data);
		 contacts.push(newContact);

		 return [200, newContact, {}];
	});

	/*从请求url中提取ID；从关联数组中查找到这个ID*/
	/*我们用一个正则匹配url，获取到id的集合。
	  angular把匹配的到的结果保存到params的id属性上，也就是whenGET方法的第三个入参。
	  再抓取这个值传到findContactById方法中，将查询的结果返回给我们。
	  最后，我们返回查询结果，如果为空就返回404。*/
	$httpBackend.whenGET(/\/contacts\/(\d+)/, undefined, ["id"]).respond(function (method, url, data, headers, params) {
		 var contact = findContactById(params.id);
		 if(contact == null){
		 	return [404, undefined, {}];
		 }

		 return [200, contact, {}];
	});

	function findContactById (id) {
		 var contactId = Number(id) ;

		 var matches = contacts.filter(function (contact) {
		 	 return contact.id === contactId; 
		 });

		 var contact = matches.shift();

		 return contact;
	}

	$httpBackend.whenPUT(/\/contacts\/(\d+)/, undefined, undefined, ["id"]).respond(function (method, url, data, header, params) {
		 var contact = findContactById(params.id);
		 parsedData = angular.fromJson(data);

		 if(contact == null){
		 	return [404, undefined, {}];
		 }

		 angular.extend(contact, parsedData);

		 return [200, contact, {}];
	});

	$httpBackend.whenDELETE(/\/contacts\/(\d+)/, undefined, ["id"]).respond(function (method, url, data, headers, params) {
		 var contact = findContactById(params.id);

		 if(contact == null){
		 	return [404, undefined, {}];
		 }

		 contacts.splice(contacts.indexOf(contact), 1);

		 return [200, undefined, {}];
	});
}]);

/* 随着通讯录的get操作，结果就会呈现在我们面前。
   然后使用更新功能给Grace Hopper所在列添加她的联系人姓名。
   创建操作是添加Gloria Gordan Bolotsky到通讯录。
   删除操作是将Charls Babbage从通讯录删除。
   增加，删除，更新的操作是放在一个promise队列中，结果会返回到成功的回调函数中。
   这就是整个控制器做的事情。*/
app.controller("MainController", function ($scope, Contact) {
	 $scope.contacts = Contact.query();

	 $scope.ada = Contact.get({id:1});

	 Contact.get({id:2}).$promise.then(function (contact2) {
	 	 contact2.name = "Rear Admiral Grace Hopper" ;

	 	 return contact2.$update().$promise;
	 }).then(updateContactsList);

	 var newContact = new Contact({
	 	name: "Gloria Gordon Bolotsky",
	 	phone: "8445556433"
	 });
	 newContact.$save().then(updateContactsList);

	 Contact.remove({id: 3}).$promise.then(updateContactsList);

	 function updateContactsList () {
	 	 $scope.contacts = Contact.query() ;
	 }
});