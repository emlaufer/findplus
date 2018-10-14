// Get all visible text in webpage.
var doc = "";
document.querySelectorAll('body *').forEach(function(node) {
    if(node.localName != "script" && node.localName != "style") {
        doc += extractText(node).trim();
    }
});

// Return all visible text given an element.
function extractText(element) {
    var text;
    text = $(element).clone().find("script,style").remove().end().text();
    return text;
}

// returns an array of conjugated verbs
function findVerbs( word ) {

    verbArray = [];
    //make sure word is verb
    nlpArray = nlp( word ).verbs().conjugate();

    for( var i = 0; i < nlpArray.length; i++ ){
        verbArray += Object.values( nlpArray[i] );
        console.log( Object.values( nlpArray[i] ) );
    }

    return verbArray;
}

// Callback for query change.
async function queryChange(query) {

    var relatedWords = [];
    // add phrase
    relatedWords += query;

    console.log( query );

    // find verbs
    relatedWords += findVerbs(query);

    console.log(relatedWords);
}

// Ctrl-F event listener.
window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        var query = prompt("Find: ");
        queryChange( query );
    }
});
