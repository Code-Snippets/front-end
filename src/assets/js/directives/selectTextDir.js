/**
 * This directive will select the text from a specified(jquery selector) container
 */
CodeSnippets.directive('selectText', [function() {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attrs) {
            var onClick = function(event) {
                event.preventDefault();
                var doc = document
                    , el = jQuery(attrs.selectText)[0]
                    , range, selection
                ;
                if (doc.body.createTextRange) {
                    range = document.body.createTextRange();
                    range.moveToElementText(el);
                    range.select();
                } else if (window.getSelection) {
                    selection = window.getSelection();
                    range = document.createRange();
                    range.selectNodeContents(el);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }

            };

            element.bind('click', onClick);

            scope.$on('$destroy', function(){
                element.unbind('click', onClick);
            });
        }
    };

}]);
