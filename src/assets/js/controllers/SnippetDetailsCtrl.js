/**
 * Details about a certain snippet
 */
CodeSnippets.controller('SnippetDetailsCtrl',
        ['$scope', '$routeParams', '$http', 'shareService',
    function($scope, $routeParams, $http, shareService) {

        $scope.data = shareService;
        $scope.data.currentPage = 'snippetDetails'


        // grab and interpret the snippet
        $http.get('snippets/' + $routeParams.id)
             .success(function(data) {
                var code = jQuery(jQuery.parseXML(data));

                $scope.snippet = {};
                // some general data
                $scope.snippet.name = code.find('name')[0].innerHTML;
                $scope.snippet.description = code.find('description')[0].innerHTML;

                // build the code panels
                $scope.panels = {};
                code.find('content').each(function eachContent(index, val){
                    var content = jQuery(val);
                    $scope.panels[index] = {};

                    $scope.panels[index].language = content.attr('language') || 'markup';
                    $scope.panels[index].code = content.text();

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

                });


             })
             .error(function(data){
                $scope.errorMsg = data;
             });




        // minify the code
        $scope.getMinText = function getMinText(txt, lang) {
            document.body.click(); // hide the dropdown
            if(lang == 'javascript') {
                var code = '';
                try {
                    var ast = UglifyJS.parse(txt);
                    ast.figure_out_scope();
                    var compressor = UglifyJS.Compressor();
                    ast = ast.transform(compressor);
                    // need to figure out scope again so mangler works optimally
                    ast.figure_out_scope();
                    ast.compute_char_frequency();
                    ast.mangle_names();
                    return ast.print_to_string();
                } catch(e) {
                    $scope.showLog("<strong>Error in the code:</strong> " + e.message, 'error');
                    return '';
                }
            }
            // this will be ok for css and html
            return YAHOO.compressor.cssmin(txt);
        };

        // show info messages
        $scope.showLog = function showLog(msg, type) {
            if(toastr[type])
                toastr[type](msg);
            else
                toastr.success(msg);
        };

        $scope.getSelectedText = function getSelectedText() {
            var html ="";
            if (typeof window.getSelection != "undefined") {
                var sel = window.getSelection();
                if (sel.rangeCount) {
                    var container = document.createElement("div");
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        container.appendChild(sel.getRangeAt(i).cloneContents());
                    }
                    html = container.innerHTML;
                }
            } else if (typeof document.selection != "undefined") {
                if (document.selection.type == "Text") {
                    html = document.selection.createRange().htmlText;
                }
            }
            if(html)
                $scope.lastSelection = html;
            return html;
        }

        // check for selected text
        $scope.isTextSelected = false;
        jQuery(document.body).on('mouseup', function(event) {

            if($scope.getSelectedText() != "")
                $scope.isTextSelected = true;
            else
                $scope.isTextSelected = false;
            // update the scope
            $scope.$apply();
        });


    }
]); // end controller snippetDetails
