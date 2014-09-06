/* Copyright (c) 2014, Anthony Garcia <anthony@lagg.me>
 * Distributed under the ISC License
 */

window.addEventListener("load", function() {
    var feeds = chrome.extension.getBackgroundPage().feeds;
    var feedList = document.getElementById("feed-list");

    feedList.innerHTML = '';

    for (var i = 0; i < feeds.length; ++i) {
        var feed = feeds[i];
        var entry = document.createElement("li");
        var title = feed.title;

        if (title.length == 0) {
            title = feed.type + " feed";
        }

        entry.innerHTML = '<a target="_blank" href="' + feed.href + '">' + title + '</a>';

        feedList.appendChild(entry);
    }
});
