/**
 * enableTab
 *
 * This directive will enable tab chars in a textarea
 * @requires https://github.com/alanhogan/Tabby
 */

CodeSnippets.directive('enableTab', [function() {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attrs) {
            element.tabby();
        }
    }
}]);
