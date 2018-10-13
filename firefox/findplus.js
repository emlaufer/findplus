window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && e.ctrlKey || key == 70 && e.metaKey) {
        e.preventDefault();
    }
});

url = browser.extension.getURL("searchbar.html");
frame = $("body").append("<iframe src=" + url + " style='position: fixed; bottom: 0; left: 0; z-index: 2139999999; width: 100%; height: 100vh'></iframe>");

