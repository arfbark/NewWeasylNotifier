function pageLoaded() {
    getSubmissions();
}

function getSubmissions() {
    // pull apikey from storage
    chrome.storage.sync.get('apikey', function(items) {
        var apikey = items['apikey'];
        if (apikey) {
            $.ajax({
                dataType: "json",
                url: "https://www.weasyl.com/api/messages/summary",
                headers: { 'X-Weasyl-API-Key': apikey },
                success: updateUI,
                error: error
            })
        } else {
            //    invite to options page
            displayError("You need to go to the options page and enter a working API key.");
        }
    })
    
    function error(jqXHR, textStatus, errorThrown){
        displayError("Something is wrong.");
    }
    
    function updateUI(data){
        updateIndividualSpan("submissions", data["submissions"]);
        updateIndividualSpan("journals", data["journals"]);
        updateIndividualSpan("notes", data["unread_notes"]);
        updateIndividualSpan("comments", data["comments"]);
        updateIndividualSpan("streamingNotifications", data["notifications"]);
    }
    
    function updateIndividualSpan(id, count){
        document.getElementById(id).innerHTML = count;
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
    error.className = '';
}

function dismissError(){
    var error = document.getElementById('error');
    error.className = 'invisible';
}

document.addEventListener('DOMContentLoaded', pageLoaded);
document.getElementById('error').addEventListener("click", dismissError);