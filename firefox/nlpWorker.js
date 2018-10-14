
onmessage = function(e) {
    var word = e.data;
    console.log("Worker recieved message"); 
    postMessage([word]);
}
