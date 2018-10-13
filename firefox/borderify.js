window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && e.ctrlKey) {
        e.preventDefault();
        console.log("hi")
    }
}
