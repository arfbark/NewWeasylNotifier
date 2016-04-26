var Util = new Object();

// success and failure expect string parameters
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

