/**
 * A list of all the available snippets
 */
CodeSnippets.controller('ListSnippetsCtrl', ['$scope', 'shareService',
    function ($scope, shareService) {

    // bind the query
    $scope.data = shareService;
    $scope.data.currentPage = 'listSnippets';


}]); // end controller ListSnippets
