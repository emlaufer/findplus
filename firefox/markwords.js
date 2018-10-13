
var markInstance = new Mark(document.querySelector(".body"));


function performMark(words, synonyms) {
    markInstance.unmark({
        "done": function() {
            markInstance.mark(words, {
                "synonyms": {
                    "Lorem": "ipsum"
                }
            });
        }
    });
}
