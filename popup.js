$(document).ready(function(){
    Util.getSummaryData(success, failure);

    function success(data) {
        updateUI(data);
        dismissLoading();
    }

    function failure(e) {
        displayError(e);
        dismissLoading();
    }
});

function updateUI(data) {
    updateIndividualSpan("submissions", data["submissions"]);
    updateIndividualSpan("journals", data["journals"]);
    updateIndividualSpan("notes", data["unread_notes"]);
    updateIndividualSpan("comments", data["comments"]);
    updateIndividualSpan("streamingNotifications", data["notifications"]);
    dismissLoading();
}

function updateIndividualSpan(id, count) {
    document.getElementById(id).innerHTML = count;
}


function displayError(e) {
    var error = $('#error');
    error.innerHTML = e;
    error.removeClass('invisible');
}

function dismissLoading() {
    $('#loading').addClass('invisible');
}