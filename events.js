// submissions data retrieved from weasyl api is cached for 3 minutes.
// no sense in paging more frequently than that.
chrome.runtime.onInstalled.addListener(function () {    
    chrome.alarms.create("NewWeasylNotifier",
        {
            delayInMinutes: 1,
            periodInMinutes: 5
        });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': '#ff0000' });
    chrome.browserAction.setBadgeText({ 'text': '!!!!' });
});