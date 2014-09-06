/* Copyright (c) 2014, Anthony Garcia <anthony@lagg.me>
 * Distributed under the ISC License
 */

var feeds = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.feeds) {
        feeds = request.feeds;
        chrome.pageAction.show(sender.tab.id);
    }
});
