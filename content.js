/* Copyright (c) 2014, Anthony Garcia <anthony@lagg.me>
 * Distributed under the ISC License
 */

var links = [];
var apparentFeeds = [];
var typeExp = /application\/([^+]*)\+xml/;

if (document.head) {
    links = document.head.getElementsByTagName("link");
}

for (var i = 0; i < links.length; ++i) {
    var link = links[i];
    var typeMatch = null;

    if (link.rel == "alternate") {
        typeMatch = typeExp.exec(link.type);
    }

    if (typeMatch) {
        var feedType = typeMatch[1].toLowerCase();
        apparentFeeds.push({title: link.title, href: link.href, type: feedType});
    }
}

if (apparentFeeds.length > 0) {
    chrome.runtime.sendMessage({feeds: apparentFeeds});
}
