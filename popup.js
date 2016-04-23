function pageLoaded() {
    getSubmissions();
}

function getSubmissions() {
    // pull apikey from storage
    chrome.storage.sync.get('apikey', function(items) {
        var apikey = items['apikey'];

        if (apikey) {
            $.ajax({
                dataType: "application/json",
                url: "https://www.weasyl.com/api/messages/summary",
                headers: { 'X-Weasyl-API-Key': apikey },
                success: success
            })
        } else {
            //    invite to options page
            displayError("You need to go to the options page and enter a working API key.");
        }
    })

    // request submissions
    function success( data, status){
        displayError("<pre>" + data.stringify() + "yeah</pre>");
    }
    //    try something else
    // parse results
    // display results
}

// populates 
function displayError(e) {
    var error = document.getElementById('error');
    error.innerHTML = e;

    // remove class with regex
    error.className =
        error.className.replace
            (/(?:^|\s)invisible(?!\S)/g, '');
}

document.addEventListener('DOMContentLoaded', pageLoaded);