var Util = new Object();

// if/when support oath2, this should check sync data to see
// if requesting summary data with api key or with oath2 tokens.
// only supports api at this point.
//
// success callback has data object as arg
// failure callback has string arg
Util.getSummaryData = function (success, failure) {
    Util.getAPIKey(_getSummaryDataWithAPIKey, failure);

    function _getSummaryDataWithAPIKey(APIKey) {
        // must use _failure because getSummaryDataWithAPIKey
        // doesn't take a single string arg
        Util.getSummaryDataWithAPIKey(APIKey, success, _failure);
    }

    // calls failure callback with a string arg
    function _failure(jqXHR, textStatus, errorThrown) {
        var jqStatus = jqXHR.status;
        var jqStatusText = jqXHR.statusText;
        if (jqStatus == '401') {
            failure(CONSTANTS.error_APIKeyProbablyWrong);
        }
        else {
            // there's a better way
            failure("Something went wrong.<br>" +
                "jqStatus: " + jqStatus + "<br>" +
                "jqStatus texts: " + jqStatusText + "<br>" +
                "textStatus: " + textStatus + "<br>" +
                "errorThrown: " + errorThrown
            );
        }
    }
}

// success and failure expect string parameters
// failure callback optional
Util.getAPIKey = function (success, failure) {
    chrome.storage.sync.get('APIKey', function (items) {
        var APIKey = items['APIKey'];
        if (APIKey) {
            console.log("APIKey retrieved: " + APIKey);
            success(APIKey);
        } else {
            console.log("APIKey not in sync strorage");
            if (failure) {
                console.log("getAPIKey calls failure()");
                failure(chrome.runtime.lastError ? chrome.runtime.lastError.message : CONSTANTS.error_APIKeyNotFoundInStorage);
            }
        }
    });
}

// jquery.ajax() result function args:
// success(data, textStatus, jqXHR)
// failure(jqXHR, textStatus, errorThrown)
Util.getSummaryDataWithAPIKey = function (APIKey, success, failure) {
    var request = new Object();
    request.dataType = "json";
    request.url = CONSTANTS.weasylAPI_Summary;
    request.headers = { 'X-Weasyl-API-Key': APIKey };
    request.success = success;
    request.error = failure;

    console.log("$.ajax()");
    $.ajax(request);
}