/**
 * Header controller mainly focused on the search input
 */


CodeSnippets.controller('HeaderCtrl', ['$scope', '$document', 'shareService', '$window', '$http',
    function($scope, $document, shareService, $window, $http) {
        // bind the query
        $scope.data = shareService;

        // get the search input
        var search_input = jQuery("#q");
        search_input.focus();

        // define the key for navigations
        var keyActions = {
            40 : 'next', // arrow down
            38 : 'prev', // arrow up
            74 : 'next', // j
            75 : 'prev' // k
        };

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

            var results = jQuery(".list-group-item");

            if(!results.length) {
                return;
            }
            // on arrow down move to the next element in the list
            if(keyActions[event.keyCode]){
                event.preventDefault();
                var active_el = results.filter(":focus");
                if(active_el.length) {
                    // call the appropriate method besed on the key pressed
                    active_el[keyActions[event.keyCode]]().focus();
                } else {
                    results[0].focus();
                }

            }



        });
        // cancel the submit event
        jQuery('#search-form').on("submit", function(event){
                event.preventDefault();
                return false;
        });

        // back to results list when you update the input
        search_input.on('keydown', function(event) {
            if(($window.location.hash.indexOf('#/home') !== 0)
                && (/[a-zA-Z0-9 ]/.test(String.fromCharCode(event.keyCode))))
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
