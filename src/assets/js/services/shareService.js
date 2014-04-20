 /**
 * We use it to share data between controllers
 */

CodeSnippets.factory('shareService', ['$rootScope', function($rootScope) {
    return {
        query: '', // store the search query
        currentPage: '', // store the current page
        // show the log message
        showLog: function showLog(msg, type) {
            if(toastr[type])
                toastr[type](msg);
            else
                toastr.success(msg);
        },
        lastSelection: '',
        // grab the selected text on a page
        getSelectedText: function getSelectedText() {
            var html ="";
            if (typeof window.getSelection != "undefined") {
                var sel = window.getSelection();
                if (sel.rangeCount) {
                    var container = document.createElement("div");
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        container.appendChild(sel.getRangeAt(i).cloneContents());
                    }
                    var text = 'innerText' in container ? 'innerText' : 'textContent';
                    html = container[text];
                }
            } else if (typeof document.selection != "undefined") {
                if (document.selection.type == "Text") {
                    html = document.selection.createRange().htmlText;
                }
            }
            if(html)
                this.lastSelection = html;
            return html;
        },

        // check for selected text
        isTextSelected: false,
        listenForSelection: function listenForSelection() {
            var t = this;
            jQuery(document.body).on('mouseup', function(event) {

                if(t.getSelectedText() != "")
                    t.isTextSelected = true;
                else
                    t.isTextSelected = false;
                // notify the scope
                $rootScope.$apply();
            });
        },
        // get minified text
        getMinText: function getMinText(txt, lang) {
            document.body.click(); // hide any dropdown
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
                    this.showLog("<strong>Error in the code:</strong> " + e.message, 'error');
                    return '';
                }
            }
            // this will be ok for css and html
            return YAHOO.compressor.cssmin(txt);
        },
        openInSublime: function(data) {
            var t = this;
            $.ajax({
                type: 'POST',
                url: 'http://localhost:7878',
                data: JSON.stringify({
                    txt: data
                }),
                dataType: 'text',
                success: function() {
                    t.showLog('The snippet was successfully sent !');
                },
                error: function() {
                    t.showLog('You need to have Sublime Text 3 open and have the <a href="https://github.com/Code-Snippets/CodeSnippetsHelper">sublime plugin</a> installed !', 'warning');
                }
            });
        }


    } // return
}]);
