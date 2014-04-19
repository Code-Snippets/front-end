/**
 * # Prism
 *
 * This directive will apply Prism highlighing to the element.
 */
CodeSnippets.directive('nagPrism', [function() {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            source: '='
        },
        link: function(scope, element, attrs) {

            scope.$watch(function() {return scope.source;}, function(v) {
                if(v) {
                    Prism.highlightElement(element.find("code")[0]);
                }
            });

        },
        template: "<code ng-bind='source'></code>"
    };

}]);
