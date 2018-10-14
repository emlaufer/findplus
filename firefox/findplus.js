// Get all visible text in webpage.
/*var doc = "";
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
}*/
const NOUN = "Noun";
const VERB = "Verb";
const ADVERB = "Adverb";
const ADJ = "Adjective";
const NVAL = "NumericValue";
const OTHER = "Other";

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

function tagPartsOfSpeech( query ) {
    var resultDict = {};
    
    var pos = nlp(query).out('tags');
    for(var i = 0; i < pos.length; i++) {
        var tags = pos[i].tags;
        // Prioritize tag as noun.
        if(tags.includes(NOUN)) {
           resultDict[pos[i].normal] = NOUN; 
        }

        // Prioritize tag as verb.
        else if(tags.includes(VERB)) {
            resultDict[pos[i].normal] = VERB;
        }

        // Prioritize tag as adverb.
        else if(tags.includes(ADVERB)) {
            resultDict[pos[i].normal] = ADVERB;
        }

        // Prioritize tag as adjective.
        else if(tags.includes(ADJ)) {
            resultDict[pos[i].normal] = ADJ;
        }
        
        // Prioritize tag as numeric value.
        else if(tags.includes(NVAL)) {
            resultDict[pos[i].normal] = NVAL;
        }

        // Other.
        else {
            resultDict[pos[i].normal] = OTHER;
        }
    }
    return resultDict;
}

// append the searchbar div into the page
var $div = $("<div>", {id: "searchbardiv"});
$("body").append($div);
url = browser.extension.getURL("searchbar.html");
$("#searchbardiv").load(url, function() {
    $(".searchinput").keyup(function(e) {
        var query = $(".searchinput").val();
        var searchList = [query];
        var pos = tagPartsOfSpeech(query);
        console.log(pos);
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
