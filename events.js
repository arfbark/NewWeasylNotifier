// submissions data retrieved from weasyl api is cached for 3 minutes.
// no sense in paging more frequently than that.
chrome.runtime.onInstalled.addListener(function () {
    var alarmOptions = {
        delayInMinutes: 1,  // FIXME  change to 5
        periodInMinutes: 5
    };

    console.log("delayInMinutes: " + alarmOptions.delayInMinutes);
    chrome.alarms.create("NewWeasylNotifier", alarmOptions);
    updateBadge();
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    updateBadge();
});

function updateBadge() {
    Util.getSummaryData(success, failure);

    function success(data) {
        var count = 0;
        for (var item in data) {
            count += data[item];
        }
        chrome.browserAction.setBadgeBackgroundColor({ color: "#000" });
        chrome.browserAction.setBadgeText({ text: '' + count });
    }

    function failure() {
        chrome.browserAction.setBadgeBackgroundColor({ color: "#F00" });
        chrome.browserAction.setBadgeText({ text: "!?" });
    }
}