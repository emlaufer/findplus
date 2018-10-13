window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
    }
});

$(".searchinput").keydown(function(e) {
    var query = $(".searchinput").val();
    var doc = nlp(query);
    var str = doc.nouns().toPlural().out('text');
    console.log(str);
});
