const Http = new XMLHttpRequest();
const dict = "https://googledictionaryapi.eu-gb.mybluemix.net/?define=WORD&lang=en";

// returns an array of word synonyms
function getSynonyms( word ) {
    // get the definition of the word
    var wordUrl = dict.replace( "WORD", word );
    console.log( "getSynonyms was called with value " + word );
    console.log( "Going to "  + wordUrl );


    $.getJSON( wordUrl, function(e) {
            console.log( "Got response");

            // parse json into object
            var obj = JSON.parse(r);

            console.log( obj.keys() );
            // find the synonyms
        });
}
