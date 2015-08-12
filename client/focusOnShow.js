/*
 * An Angular directive that allows you to set the default selected element 
 * when ng-show evaluates to true. This can be either a string or array of strings
 * the array of strings will be selected in order written, selecting the next "empty"
 * element.
 *
 * @author Tj Gienger - github.com/tgienger
 * @license MIT
 */
function FocusOnShow($timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var focusItems = scope.$eval(attrs.focusOnShow), focusedItem;
            var objectType = Object.prototype.toString.call(focusItems);
            scope.$watch(attrs.ngShow, function (o, n) {
                if (o === true) {
                    if (objectType === '[object Array]') {
                        var i = focusItems.length, length = focusItems.length - 1;
                        while (i-- >= 1) {
                            var tmpItem = angular.element('#' + focusItems[i]);
                            if (tmpItem.val().length === 0) {
                                focusedItem = tmpItem;
                            }
                        }
                    }
                    else {
                        focusedItem = angular.element('#' + attrs.focusOnShow);
                    }
                    $timeout(function () {
                        focusedItem.focus();
                    });
                }
                else {
                    angular.element(document.activeElement).blur();
                }
            });
        }
    };
}
FocusOnShow.$inject = ['$timeout'];
angular.module('app').directive('focusOnShow', FocusOnShow);