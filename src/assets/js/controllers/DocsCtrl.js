/**
 * Documenation for code snippets
 */
CodeSnippets.controller('DocsCtrl', ['$scope', 'shareService',
    function ($scope, shareService) {

    // bind the query
    $scope.data = shareService;
    $scope.data.currentPage = 'docs';


}]); // end controller ListSnippets
