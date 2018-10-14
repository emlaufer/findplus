
onmessage = function(e) {
    var query = e.data[0];

    result = queryChange(query);
    postMessage(result);
}

const NOUN = "Noun";
const VERB = "Verb";
const ADVERB = "Adverb";
const ADJ = "Adjective";
const NVAL = "NumericValue";
const OTHER = "Other";

const dict = "https://api.datamuse.com/words?rel_trg=WORD";

function getJSON(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = 'json'
    req.onLoad = function() {
        if (req.status == 200) {
            callback(req.response);
        } else {
            // TODO handle error
        }
    }
    req.send();
}

// returns an array of word synonyms
function getSynonyms( word ) {
   var wordUrl = dict.replace( "WORD", word );

   // get related words
   getJSON( wordUrl, function(e) {
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
