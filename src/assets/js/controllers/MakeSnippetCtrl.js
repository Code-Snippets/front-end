/**
 * Tool for making a new snippet
 */
CodeSnippets.controller('MakeSnippetCtrl', ['$scope', 'shareService',
    function ($scope, shareService) {

    $scope.helpers = shareService;
    $scope.helpers.currentPage = 'MakeSnippet';

    // panels and snippet info
    $scope.panels = [{}];
    $scope.snippet = {};

    $scope.addPanel = function addPanel() {
        $scope.panels.push({});
    };

    $scope.removePanel = function removePanel(index) {
        $scope.panels.splice(index, 1);
    };



    // build the snippet based on the inserted data
    $scope.$watch('[snippet, panels]', function() {

        $scope.snippetCode = "<snippet>\n";

        if($scope.snippet.name) {
            $scope.snippetCode += "\n<name>"+ $scope.snippet.name +"</name>\n";
        }

        if($scope.snippet.description) {
            $scope.snippetCode += "\n<description><![CDATA["+ $scope.snippet.description +"]]></description>\n";
        }


        angular.forEach($scope.panels, function(val, index) {

            $scope.snippetCode += "\n<content";

            // add attributes
            if(val.url) {
                $scope.snippetCode += ' url="'+ val.url +'"';
            }
            if(val.type) {
                $scope.snippetCode += ' type="'+ val.type +'"';
            }
            if(val.type != 'tip') {
                $scope.snippetCode += ' language="'+ (val.language || 'markup') +'"';
            }
            if(val.hasCursors) {
                $scope.snippetCode += ' has-cursors="true"';
            }

            $scope.snippetCode += "><![CDATA[" + (val.code || '') + "]]></content>\n";

        });

        $scope.snippetCode += "\n</snippet>\n";

    }, true);

}]); // end controller AddSnippet
