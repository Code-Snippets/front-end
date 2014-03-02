var CodeSnippets = angular.module('CodeSnippets', ['ngSanitize', 'hljs', 'ngRoute'])
    // routes and other configurations
    .config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/home', {
                templateUrl: 'app/partials/home.html',
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




