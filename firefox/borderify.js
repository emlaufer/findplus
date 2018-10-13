window.onkeydown = function(e) {
    if (e.keyCode == 70 && e.ctrlKey) {
        e.preventDefault();
        console.log("hi")
    }
}
