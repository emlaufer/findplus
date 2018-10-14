
var markInstance = new Mark(document.querySelector("body"));


function performMark(words, options) {
    console.log("Marked");
    // Transform into list of regexpressions.\
    console.log( "words.length is " + words.length);
    for(var i = 0; i < words.length; i++) {
        words[i] = '/\\b'+words[i]+'\\b/i';
    }
    console.log( words );
    markInstance.unmark({
        "done": function() {
            markInstance.markRegExp(words, options);
        }
    });
}
