/* global Posts */
var HomeController = (function () {
	function HomeController($scope, $meteor, $stateParams, $rootScope) {
		var _this = this;

		$meteor.subscribe('post', this.id).then(function (handle) {
			_this.posts = $meteor.collection(Posts);
		});
	}

	HomeController.prototype.postComment = function (comment, parent) {
		comment.user = {
			name: "Users name HERE",
		};
		comment.date = new Date();
		if (parent) {
			comment.parent_id = parent._id;
		}
		else {
			comment.parent_id = this.post._id;
		}
		this.postedComment = comment;
		this.newComment = undefined;
	};

	HomeController.prototype.newPost = function (post) {
		this.posts.save(post);
		this.new = {};
	};

	HomeController.$inject = ['$scope', '$meteor', '$stateParams', '$rootScope'];
	return HomeController;
})();


var HomeConfig = (function () {
	function HomeConfig($stateProvider, $locationProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'client/home.ng.html',
				controllerAs: 'home',
				controller: 'HomeController'
			});

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/home');
	}


	HomeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
	return HomeConfig;
})();


APP.config(HomeConfig).controller('HomeController', HomeController);