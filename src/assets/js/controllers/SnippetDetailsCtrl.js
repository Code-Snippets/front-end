/**
 * Details about a certain snippet
 */
CodeSnippets.controller('SnippetDetailsCtrl', ['$scope', '$routeParams', '$http', 'shareService',
    function($scope, $routeParams, $http, shareService) {

        $scope.data = shareService;
        $scope.data.currentPage = 'snippetDetails'
        $scope.getText = function() {
            return "testing the test";
        };

        $scope.showLog = function(a) {
            console.log(a);
        };

        $http.get('snippets/' + $routeParams.id)
             .success(function(data) {
                $scope.snippet = data;
             })
             .error(function(data){
                $scope.errorMsg = data;
             });

    }
]); // end controller snippetDetails
