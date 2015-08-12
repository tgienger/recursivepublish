/* global Posts */
var PostController = (function () {
	function PostController($scope, $meteor, $stateParams, $rootScope) {
		var _this = this;

		$scope.limit = 5;
		$scope.page = 1;
		$scope.sort = { date: -1 };
		this.id = $stateParams.id;
		
		$meteor.subscribe('post', this.id).then(function (handle) {
			_this.post = $meteor.object(Posts, $stateParams.id);
		});
	}

	PostController.prototype.postComment = function (comment, parent) {
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
		this.commentReply = {};
		// this.newComment = {};
	};
	PostController.$inject = ['$scope', '$meteor', '$stateParams', '$rootScope'];
	return PostController;
})();


var PostConfig = (function () {
	function PostConfig($stateProvider) {
		$stateProvider
			.state('post', {
				url: '/post/:id',
				templateUrl: 'client/post.ng.html',
				controllerAs: 'post',
				controller: 'PostController'
			});
	}
	PostConfig.$inject = ['$stateProvider'];
	return PostConfig;
})();


APP.config(PostConfig).controller('PostController', PostController);