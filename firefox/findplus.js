// Get all visible text in webpage.
var doc = ""
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
    var doc = nlp(query);
    console.log(doc.nouns().toPlural().out('text'));
}
exportFunction(queryChange, window, {defineAs: 'queryChange'});


// Ctrl-F event listener.
window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        url = browser.extension.getURL("searchbar.html");
        frame = $("body").append("<iframe src=" + url + " style='position: fixed; bottom: 0; left: 0; z-index: 2139999999; width: 100%; height: 3em' frameborder=0></iframe>");

    }
});


