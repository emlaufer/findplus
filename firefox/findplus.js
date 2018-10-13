window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && e.ctrlKey || key == 70 && e.metaKey) {
        e.preventDefault();
        console.log("hi")
    }
});

//$("body").append();
