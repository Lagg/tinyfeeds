/* Copyright (c) 2014, Anthony Garcia <anthony@lagg.me>
 * Distributed under the ISC License
 */

chrome.runtime.onInstalled.addListener(function() {
    if (!localStorage.feeds) {
        localStorage.feeds = "{}";
    }

    // Cleans the feed cache to avoid buildup. Yes it's hacky but Google forced my hand!
    chrome.alarms.create("feedCleaner", {periodInMinutes: 60});
});

chrome.alarms.onAlarm.addListener(function() {
    chrome.tabs.query({}, function(tabs) {
        var feeds = JSON.parse(localStorage.feeds);
        var tabKeys = [];

        for (var i = 0; i < tabs.length; ++i) {
            tabKeys.push(tabs[i].id.toString());
        }

        for (var key in feeds) {
            if (tabKeys.indexOf(key) == -1) {
                delete feeds[key];
            }
        }

        localStorage.feeds = JSON.stringify(feeds);
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.feeds) {
        feedStore = JSON.parse(localStorage.feeds);
        feedStore[sender.tab.id] = request.feeds;
        localStorage.feeds = JSON.stringify(feedStore);
        chrome.pageAction.show(sender.tab.id);
    }
});
