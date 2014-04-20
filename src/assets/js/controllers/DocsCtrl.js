/**
 * Documenation for code snippets
 */
CodeSnippets.controller('DocsCtrl', ['$scope', 'shareService',
    function ($scope, shareService) {

    // bind the helpers
    $scope.helpers = shareService;
    $scope.helpers.currentPage = 'Docs';


}]); // end controller Docs
