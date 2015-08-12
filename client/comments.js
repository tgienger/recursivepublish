/* global APP */
/* global Comments */
function CommentDirective(RecursionHelper, $meteor, $stateParams) {
    return {
        restrict: 'E',
        scope: { parent: '=', sort: '=', innerComment: '=', commentIn: '=' },
        templateUrl: 'client/comments.ng.html',
        compile: function (element) {
            return RecursionHelper.compile(element, function (scope, iElem, iAttrs, commentsController) {
                scope.limit = 5;
                scope.page = 1;
                scope.sort = { date: -1 };
                
                $meteor.autorun(scope, function () {
                    $meteor.subscribe('comments', scope.getReactively('parent'), {
                        limit: scope.getReactively('limit'),
                        skip: (scope.getReactively('page') - 1) * scope.getReactively('limit'),
                        sort: scope.getReactively('sort')
                    }).then(function (handle) {
                        scope.comments = $meteor.collection(function () {
                            return Comments.find({ parent_id: scope.getReactively('parent') }, {
                                sort: scope.getReactively('sort')
                            });
                        });
                    });
                });
                scope.$watch('commentIn', function () {
                    if (scope.comments) {
                        scope.comments.save(scope.commentIn);
                    }
                });
                scope.postComment = function (post, parent) {
                    if (parent) {
                        post.parent_id = parent._id;
                    }
                    else {
                        post.parent_id = scope.parent;
                    }
                    post.date = new Date();
                    scope.comments.save(post);
                    post = {};
                };
            });
        }
    };
}
CommentDirective.$inject = ['RecursionHelper', '$meteor', '$stateParams'];
APP.directive('comments', CommentDirective);