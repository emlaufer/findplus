var $marks;
var currentMark = 0;
var offsetTop = 50;
currentClass = "current";

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

const dict = "https://api.datamuse.com/words?rel_trg=WORD";

// returns an array of word synonyms
function getSynonyms( word ) {
   var wordUrl = dict.replace( "WORD", word );

   // get related words
   $.getJSON( wordUrl, function(e) {
        for( var i = 0; i < Math.min(e.length, 10); i++ ) {
            relatedWords.push(e[i].word);
        }
   });

}

// Callback for query change.
function queryChange(query) {

    // create array of related words
    relatedWords = [];

    getSynonyms( query );

    relatedWords.push(query);

    relatedWords.push(pluralize( query )); // TODO for noun synonyms ONLY
    relatedWords.concat(conjugate( query )); // TODO for verbs ONLY

    return relatedWords;
}

function pluralize( word ) {
    return nlp(word).nouns().toPlural().out('text');
}

// returns an array of conjugated verbs
function conjugate( word ) {

    verbArray = [];
    //make sure word is verb
    nlpArray = nlp( word ).verbs().conjugate();

    for( var i = 0; i < nlpArray.length; i++ ){
        verbArray += Object.values( nlpArray[i] );
    }

    return verbArray;
}

function nextMark() {
    if ($results.length) {
        currentMark += 1;
        if (currentMark < 0) {
            currentMark = $results.length - 1;
        }
        if (currentMark > $results.length - 1) {
            currentMark = 0;
        }
        jumpToMark();
    }
}

function prevMark() {
    if ($results.length) {
        currentMark -= 1;
        if (currentMark < 0) {
            currentMark = $results.length - 1;
        }
        if (currentMark > $results.length - 1) {
            currentMark = 0;
        }
        jumpToMark();
    }
}

function jumpToMark() {
    if ($results.length) {
        var position, 
            $current = $results.eq(currentMark);
        console.log($current);
        $results.removeClass(currentClass);
        if ($current.length) {
            $current.addClass(currentClass);
            position = $current.offset().top - offsetTop;
            window.scrollTo(0, position);
        }
    }
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
var url = browser.extension.getURL("searchbar.html");
$("#searchbardiv").load(url, function() {    
    $(".searchinput").keyup(function(e) {
        var query = $(".searchinput").val();
        var searchList = [query];
        var pos = tagPartsOfSpeech(query);
        console.log(pos);
        words = queryChange(query);
        console.log(relatedWords);
        performMark(relatedWords);
        $results = $("body").find("mark");
        currentIndex = 0;
        jumpToMark();
    });

    $("#nextbutton").on("click", nextMark);
    
    $("#prevbutton").on("click", prevMark);
});
$("#searchbardiv").hide();

// Ctrl-F event listener.
window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        $("#searchbardiv").toggle();

        if (window.getSelection) {
            $(".searchinput").val(window.getSelection().toString());
        }
        $(".searchinput").focus();
    } else if (key == 13 && $(".searchinput").is(":focus")) {
        if (e.shiftKey) {
            prevMark();
        } else {
            nextMark();
        }
    }
});

