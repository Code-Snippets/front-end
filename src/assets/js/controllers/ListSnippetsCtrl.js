/**
 * A list of all the available snippets
 */
CodeSnippets.controller('ListSnippetsCtrl', ['$scope', 'shareService',
    function ($scope, shareService) {

    // bind the query
    $scope.helpers = shareService;
    $scope.helpers.currentPage = 'ListSnippets';


}]); // end controller ListSnippets
