function getSubmissions() {
    console.log("Running getAPIKey()");
    Util.getAPIKey(getSummaryData, noAPIKey);

    function getSummaryData(APIKey){
        console.log("Running getSummaryData()")
        Util.getSummaryDataWithAPIKey(APIKey, updateUI, error);
    }
    
    function noAPIKey(err){
        console.log("noAPIKey()")
        displayError(err);
    }

    function error(jqXHR, textStatus, errorThrown) {
        var jqStatus = jqXHR.status;
        var jqStatusText = jqXHR.statusText;
        if (jqStatus == '401')
            displayError(CONSTANTS.error_APIKeyProbablyWrong);
        else
            displayError("Something went wrong.<br>" +
                "jqStatus: " + jqStatus + "<br>" +
                "jqStatus texts: " + jqStatusText + "<br>"+
                "textStatus: " + textStatus + "<br>" +
                "errorThrown: " + errorThrown
            );
    }

    function updateUI(data) {
        updateIndividualSpan("submissions", data["submissions"]);
        updateIndividualSpan("journals", data["journals"]);
        updateIndividualSpan("notes", data["unread_notes"]);
        updateIndividualSpan("comments", data["comments"]);
        updateIndividualSpan("streamingNotifications", data["notifications"]);
    }

    function updateIndividualSpan(id, count) {
        document.getElementById(id).innerHTML = count;
    }
}

function displayError(e) {
    var error = document.getElementById('error');
    error.innerHTML = e;
    error.className = '';
}

function dismissError() {
    var error = document.getElementById('error');
    error.className = 'invisible';
}

document.addEventListener('DOMContentLoaded', getSubmissions);
document.getElementById('error').addEventListener("click", dismissError);