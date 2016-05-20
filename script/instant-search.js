var app = angular.module("instantSearch", []);

/*define searchFor filter*/
app.filter("searchFor", function(){
	/*所有filter必须返回一个函数，
	  第一个参数是要过滤的数组，
	  四二个参数是，和冒号一起传递过来的变量*/
	  return function (arr, searchString) {
	  	 if(!searchString){
	  	 	return arr;
	  	 }

	  	 var result=[];
	  	 searchString = searchString.toLowerCase();

	  	 angular.forEach(arr, function(item){
	  	 	if(item.title.toLowerCase().indexOf(searchString) !== -1){
	  	 		result.push(item);
	  	 	}
	  	 });

	  	 return result;
	  }
});

// The controller

function InstantSearchController($scope){

	// The data model. These items would normally be requested via AJAX,
	// but are hardcoded here for simplicity. See the next example for
	// tips on using AJAX.

	$scope.items = [
		{
			url: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
			title: '50 Must-have plugins for extending Twitter Bootstrap',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/07/featured_4-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/',
			title: 'Making a Super Simple Registration System With PHP and MySQL',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/simple_registration_system-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/08/slideout-footer-css/',
			title: 'Create a slide-out footer with this neat z-index trick',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/slide-out-footer-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/06/digital-clock/',
			title: 'How to Make a Digital Clock with jQuery and CSS3',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/06/digital_clock-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/05/diagonal-fade-gallery/',
			title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/featured-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
			title: 'Mini AJAX File Upload Form',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/ajax-file-upload-form-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
			title: 'Your First Backbone.js App – Service Chooser',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/04/service_chooser_form-100x100.jpg'
		}
	];
}