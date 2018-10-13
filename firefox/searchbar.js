window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
    }
});

var element = document.createElement("SearchElement");
element.setAttribute("attribute1", "foobar");
document.documentElement.appendChild(element);

var evt = document.createEvent("Events");
evt.initEvent("SearchEvent", true, false);
element.dispatchEvent(evt);


$(".searchinput").keydown(function(e) {
    console.log($(".searchinput").val());
    
});
