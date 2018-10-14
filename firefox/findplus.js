var $marks;
var currentMark = 0;
var offsetTop = 50;
currentClass = "current";

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
    var doc = nlp(query);
    return doc.nouns().toPlural().out('text');
}

// returns an array of conjugated verbs
function findVerbs( word ) {

    verbArray = [];
    //make sure word is verb
    nlpArray = nlp( word ).verbs().conjugate();

    for( var i = 0; i < nlpArray.length; i++ ){
        verbArray += Object.values( nlpArray[i] );
        console.log( Object.values( nlpArray[i] ) );
    }

    return verbArray;
}

function jumpToMark() {
    console.log("scrolling");
    if ($results.length) {
        var position, 
            $current = $results.eq(currentMark);
        console.log($current);
        $results.removeClass(currentClass);
        if ($current.length) {
            $current.addClass(currentClass);
            position = $current.offset().top - offsetTop;
            console.log("GOING TO:" + position);
            window.scrollTo(0, position);
        }
    }
}

// append the searchbar div into the page
var $div = $("<div>", {id: "searchbardiv"});
$("body").append($div);
var url = browser.extension.getURL("searchbar.html");
$("#searchbardiv").load(url, function() {    
    $(".searchinput").keyup(function(e) {
        var query = $(".searchinput").val();
        var words = [queryChange(query), query];
        console.log(words);
        performMark(words);
        $results = $("body").find("mark");
        currentIndex = 0;
        jumpToMark();
    });

    $("#nextbutton").on("click", function() {
        if ($results.length) {
            console.log("next");
            currentMark += 1;
            if (currentMark < 0) {
                currentMark = $results.length - 1;
            }
            if (currentMark > $results.length - 1) {
                currentMark = 0;
            }
            jumpToMark();
        }
    });
    
    $("#prevbutton").on("click", function() {
        if ($results.length) {
            console.log("next");
            currentMark -= 1;
            if (currentMark < 0) {
                currentMark = $results.length - 1;
            }
            if (currentMark > $results.length - 1) {
                currentMark = 0;
            }
            jumpToMark();
        }
    });
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
    }
});

