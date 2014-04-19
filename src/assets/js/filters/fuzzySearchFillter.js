/**
 * perfoms a fuzzy search in input based on q
 */

CodeSnippets.filter('fuzzySearch', function() {
    return function(input, q) {
        if(q == "" || q == undefined)
            return input;


        var fuzzy = new Fuse(input, {keys: ['name', 'description']});
        return fuzzy.search(q);
    }
})
