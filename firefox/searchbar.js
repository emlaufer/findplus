window.addEventListener("keydown", function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 70 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
    }
});

$(".searchinput").keydown(function(e) {
    var query = $(".searchinput").val();
    browser.tabs.sendMessage(tabs[0].id, {
        content: query
    });
    console.log( "searchbar sent message: " + query );
});

