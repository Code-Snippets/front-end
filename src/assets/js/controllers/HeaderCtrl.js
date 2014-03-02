/**
 * Header controller mainly focused on the search input
 */


CodeSnippets.controller('HeaderCtrl', ['$scope', '$document', 'shareService', '$window',
    function($scope, $document, shareService, $window) {
        // bind the query
        $scope.data = shareService;


        // get the search input
        var search_input = angular.element("#q");
        search_input.focus();

        // listen for the s key and focus on the search box
        $document.on('keydown', function(event) {
            var tag = event.target.tagName.toLowerCase();

            if(event.keyCode == 83 && tag != 'input' && tag != 'textarea'){
                event.preventDefault();
                search_input.focus().select();
            }

        });
        // cancel the submit event
        angular.element('#search-form').on("submit", function(event){
                event.preventDefault();
                return false;
        });

        // back to results list when you update the input
        search_input.on('keydown', function(event) {
            if($window.location.hash.indexOf('#/home') !== 0)
                $window.location.hash = "#/home";
        });


    }
]);
