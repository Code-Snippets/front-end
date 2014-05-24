/**
 * Details about a certain snippet
 */
CodeSnippets.controller('SnippetDetailsCtrl',
        ['$scope', '$routeParams', '$http', 'shareService',
    function($scope, $routeParams, $http, shareService) {
        $scope.helpers = shareService;
        $scope.helpers.currentPage = 'SnippetDetails'

        $scope.helpers.listenForSelection();

        $scope.parseCursors = function(code, panelIndex) {

            if( ! $scope.panels[panelIndex].hasCursors) {
                return code;
            }
            var parse = function (match, curIndex, curVal) {

                if(typeof $scope.panels[panelIndex].cursors[curIndex] == 'undefined') {
                    $scope.panels[panelIndex].cursors[curIndex] = curVal ? curVal.substr(1) : 'bazinga';
                }

                return $scope.panels[panelIndex].cursors[curIndex];
            }

            // match ${1:defaultValue} or ${1}
            var reg = /\${([0-9]+)(:[^\}]+)?}/ig;
            code = code.replace(reg, parse);

            return code;
        };
        // grab and interpret the snippet
        $http.get('snippets/' + $routeParams.id)
             .success(function(data) {
                var code = jQuery(jQuery.parseXML(data));

                $scope.snippet = {};
                // some general data
                $scope.snippet.name = code.find('name')[0].innerHTML;
                $scope.snippet.description = code.find('description').text();

                // build the code panels
                $scope.panels = {};
                code.find('content, tip').each(function eachContent(index, val){
                    var content = jQuery(val);
                    $scope.panels[index] = {};

                    $scope.panels[index].language = content.attr('language') || 'markup';
                    $scope.panels[index].hasCursors = content.attr('has-cursors') || '0';
                    $scope.panels[index].cursors = [];
                    $scope.panels[index].code = content.text();


                    // check if it's a tip
                    if(content.attr('type') == 'tip') {
                        $scope.panels[index].isTip = true;
                        $scope.panels[index].language = "ProTip";
                    }

                    // check for remote content and grab it from there
                    var remote = content.attr('url');
                    if(remote) {
                        // place temporary message
                        $scope.panels[index].code = 'Loading...';

                        $http.get(remote)
                             .success(function rmS(data) {
                                $scope.panels[index].code = data;
                             })
                             .error(function rmE(){
                                // put the old content back
                                $scope.panels[index].code = content.text();
                                // show a waring
                                $scope.showLog("<strong>Failed</strong> to fetch <a target='_blank' href='" + remote +"'>" + remote + "</a> !", "warning");
                                $scope.showLog("Fallback added !");
                             });
                    }


                }); // each content


             }) // success
             .error(function(data){
                $scope.errorMsg = "This snippet doesn't exists !";
             });



    }
]); // end controller snippetDetails
