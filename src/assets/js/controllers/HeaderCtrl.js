/**
 * Header controller mainly focused on the search input
 */


CodeSnippets.controller('HeaderCtrl', ['$scope', '$document', 'shareService', '$window', '$http',
    function($scope, $document, shareService, $window, $http) {
        // bind the query
        $scope.data = shareService;

        // get the search input
        var search_input = angular.element("#q");
        search_input.focus();

        // some key bidings
        $document.on('keydown', function (event) {
            var tag = event.target.tagName.toLowerCase();

            if((tag === 'input') || (tag === 'textarea'))
                return;
            // listen for the s key and focus on the search box
            if(event.keyCode == 83){
                event.preventDefault();
                search_input.focus().select();
            }

            var results = angular.element(".list-group-item");

            if(!results.length) {
                return;
            }

            // on arrow down move to the next element in the list
            if(event.keyCode == 40){

                var active_el = results.filter(":focus");
                if(active_el.length) {
                    console.log(active_el.next());
                    active_el.next().focus();
                } else {
                    results[0].focus();
                }

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


        // grab the snippets data

        $http.get('snippets.json')
             .success(function(data) {
                $scope.data.results = data;
             })
             .error(function(data){
                $scope.data.results = [{
                    id: "404",
                    name: "Error: " + data
                }];
             });

    }
]);
