/**
 * Highlights the matching letters in input from q
 */
CodeSnippets.filter('matchLetters', function() {
    return function(input, q) {
        if(q == "" || q == undefined)
            return input;
        var re = new RegExp("([" + q + "]+)", "gi");
        return input.replace(re, "<span class='hl'>$1</span>");
    }
});
