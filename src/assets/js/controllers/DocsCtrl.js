/**
 * Documenation for code snippets
 */
CodeSnippets.controller('DocsCtrl', ['$scope', 'shareService',
    function ($scope, shareService) {

    // bind the query
    $scope.helpers = shareService;
    $scope.helpers.currentPage = 'docs';


}]); // end controller Docs
