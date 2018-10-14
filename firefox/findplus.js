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

// append the searchbar div into the page
var $div = $("<div>", {id: "searchbardiv"});
$("body").append($div);
url = browser.extension.getURL("searchbar.html");
$("#searchbardiv").load(url, function() {    
    $(".searchinput").keyup(function(e) {
        var query = $(".searchinput").val();
        queryChange(query);
    });
});

// Ctrl-F event listener.
window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        $("#searchbardiv").toggle();
    }
});



