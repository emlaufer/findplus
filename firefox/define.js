const dict = "https://api.datamuse.com/words?ml=WORD";

// returns an array of word synonyms
function getSynonyms( word ) {
    // get the definition of the word
   var wordUrl = dict.replace( "WORD", word );

   console.log( wordUrl );

   // get synonyms
   var synArr = [];
   
   $.getJSON( wordUrl, function(e) {
        for( var i = 0; i < Math.min(e.length, 10); i++ ) {
            synArr.push(e[i].word);
        }
   });

   return synArr;

}
