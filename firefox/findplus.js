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

// Callback for query change.
function queryChange(query) {

    // create array of related words
    var relatedWords = [];
    relatedWords += query;

    // separate the words by POS

    relatedWords += pluralize( query ); // TODO for noun synonyms ONLY
    relatedWords += conjugate( query ); // TODO for verbs ONLY

    return relatedWords;
}

function pluralize( word ) {
    return nlp(word).nouns().toPlural().out('text');
}

// returns an array of conjugated verbs
function findVerbs( word ) {

    verbArray = [];
    //make sure word is verb
    nlpArray = nlp( word ).verbs().conjugate();

    for( var i = 0; i < nlpArray.length; i++ ){
        verbArray += Object.values( nlpArray[i] );
    }

    return verbArray;
}

// append the searchbar div into the page
var $div = $("<div>", {id: "searchbardiv"});
$("body").append($div);
url = browser.extension.getURL("searchbar.html");
$("#searchbardiv").load(url, function() {
    $(".searchinput").keyup(function(e) {
        var query = $(".searchinput").val();
        getSynonyms(query);
        words = queryChange(query);
        console.log(words);
        performMark(words);
    });
});
$("#searchbardiv").hide();

// Ctrl-F event listener.
window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        $("#searchbardiv").toggle();
    }
});
