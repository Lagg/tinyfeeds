/* Copyright (c) 2014, Anthony Garcia <anthony@lagg.me>
 * Distributed under the ISC License
 */

var links = document.head.getElementsByTagName("link");
var apparentFeeds = [];
var typeExp = /application\/([^+]*)\+xml/;

for (var i = 0; i < links.length; ++i) {
    var link = links[i];
    var typeMatch = null;

    if (link.rel == "alternate") {
        typeMatch = typeExp.exec(link.type);
    }

    if (typeMatch) {
        apparentFeeds.push({title: link.title, href: link.href, type: typeMatch[1]});
    }
}

if (apparentFeeds.length > 0) {
    chrome.runtime.sendMessage({feeds: apparentFeeds});
}
