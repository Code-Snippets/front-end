var CodeSnippets = angular.module('CodeSnippets', ['ngSanitize', 'ngRoute', 'ngClipboard'])
    // routes and other configurations
    .config(['$routeProvider', 'ngClipProvider', function($routeProvider, ngClipProvider){

        ngClipProvider.setPath("assets/js/ZeroClipboard.swf");


        $routeProvider
            .when('/home', {
                templateUrl: 'app/partials/list_snippets.html',
                controller : 'ListSnippetsCtrl'
            })
            .when('/snippet/:id', {
                    templateUrl : 'app/partials/snippet_details.html',
                controller: 'SnippetDetailsCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });

    }]);




