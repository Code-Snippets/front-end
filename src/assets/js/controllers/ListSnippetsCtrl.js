/**
 * A list of all the available snippets
 */
CodeSnippets.controller('ListSnippetsCtrl', ['$scope', 'shareService', function ($scope, shareService) {
    // bind the query
    $scope.data = shareService;

    // full results
    $scope.results = [
        {
            id: 'clearfix',
            name: "Clearfix",
            description: "The clearfix hack is a popular way to contain floats without resorting to using presentational markup."
        },
        {
            id: 'respondjs',
            name: "RespondJS",
            description: "A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more)"
        },
        {
            id: 'jquery',
            name: "jQuery",
            description: "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript."
        },
        {
            id: "flexslider",
            name: "FlexSlider",
            description: "The best responsive slider. Period."
        }
    ];


}]); // end controller ListSnippets
