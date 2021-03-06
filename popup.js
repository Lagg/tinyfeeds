/* Copyright (c) 2014, Anthony Garcia <anthony@lagg.me>
 * Distributed under the ISC License
 */

function generateFeedLink(feed) {
    if (localStorage.ttrssEnabled == "true" && localStorage.ttrssUrl) {
        return localStorage.ttrssUrl + "/public.php?op=subscribe&feed_url=" + feed.href;
    } else {
        return feed.href;
    }
}

window.addEventListener("load", function() {
    var feedList = document.getElementById("feed-list");

    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        var feeds = null;

        if (tabs.length != 0) {
            var currentFeeds = JSON.parse(localStorage.feeds);
            var feeds = currentFeeds[tabs[0].id];

            if (!feeds) {
                return;
            }

            feedList.innerHTML = '';

            for (var i = 0; i < feeds.length; ++i) {
                var feed = feeds[i];
                var entry = document.createElement("li");
                var title = feed.title;
                var link = document.createElement("a");
                var icon = "rssicon24.png";

                if (title.length == 0) {
                    title = feed.type + " feed";
                }

                if (feed.type == "atom") {
                    icon = "atomicon24.png";
                }

                link.target = "_blank";
                link.href = generateFeedLink(feed);
                link.innerHTML = '<img src="' + icon + '" alt=""/> ' + title;

                entry.appendChild(link);

                feedList.appendChild(entry);
            }

        }
    });
});
