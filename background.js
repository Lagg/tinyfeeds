/* Copyright (c) 2014, Anthony Garcia <anthony@lagg.me>
 * Distributed under the ISC License
 */

chrome.runtime.onInstalled.addListener(function() {
    if (!localStorage.feeds) {
        localStorage.feeds = "{}";
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.feeds) {
        feedStore = JSON.parse(localStorage.feeds);
        feedStore[sender.tab.id] = request.feeds;
        localStorage.feeds = JSON.stringify(feedStore);
        chrome.pageAction.show(sender.tab.id);
    }
});
