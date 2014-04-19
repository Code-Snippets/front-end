var CodeSnippets = angular.module('CodeSnippets', ['ngSanitize', 'ngRoute', 'ngClipboard', 'hc.marked'])
    // routes and other configurations
    .config(['$routeProvider', 'ngClipProvider', 'marked', function($routeProvider, ngClipProvider, marked){
        // ngClip
        ngClipProvider.setPath("assets/js/ZeroClipboard.swf");

        // markdown parser
        marked.setOptions({
            highlight: function(code, lang) {
                lang = lang || 'markup';

                return Prism.highlight(code, Prism.languages[lang]);
            }
        });

        // routes
        $routeProvider
            .when('/home', {
                templateUrl: 'app/partials/list_snippets.html',
                controller : 'ListSnippetsCtrl'
            })
            .when('/docs', {
                templateUrl: 'app/partials/documentation.html',
                controller : 'DocsCtrl'
            })
            .when('/make-snippet', {
                templateUrl: 'app/partials/make_snippet.html',
                controller : 'MakeSnippetCtrl'
            })
            .when('/snippets/:id*', {
                templateUrl : 'app/partials/snippet_details.html',
                controller: 'SnippetDetailsCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });

    }]);




