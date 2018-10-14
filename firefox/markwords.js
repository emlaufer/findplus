
var markInstance = new Mark(document.querySelector("body"));


function performMark(words, options) {
    console.log("Marked");
    markInstance.unmark({
        "done": function() {
            markInstance.mark(words, options);
        }
    });
}

/*function nextWord() {
    
}*/

