// submissions data retrieved from weasyl api is cached for 3 minutes.
// no sense in paging more frequently than that.
chrome.runtime.onInstalled.addListener(function () {
    chrome.alarms.create("NewWeasylNotifier",
        {
            delayInMinutes: 1,  // FIXME  change to 5
            periodInMinutes: 5
        });
    updateBadge();
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    updateBadge();
});

function updateBadge() {
    Util.getAPIKey(gotAPIKey, error);

    function gotAPIKey(APIKey) {
        Util.getSummaryDataWithAPIKey(APIKey, success, error)
    }

    function success(data) {
        var count = 0;
        for (var item in data) {
            console.log(item + ":" + data[item]);
            count += data[item];
        }
        chrome.browserAction.setBadgeBackgroundColor({ color: "#000" });
        chrome.browserAction.setBadgeText({ text: ''+count });
    }

    function error() {
        chrome.browserAction.setBadgeBackgroundColor({ color: "#F00" });
        chrome.browserAction.setBadgeText({ text: "!?" });
    }
}