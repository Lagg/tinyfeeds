window.addEventListener("load", function() {
    var save = document.getElementById("options-save");
    var ttrssUrl = document.getElementById("ttrss-url");
    var ttrssEnabled = document.getElementById("ttrss-links");

    if (localStorage.ttrssUrl) {
        ttrssUrl.value = localStorage.ttrssUrl;
    }

    if (localStorage.ttrssEnabled == "true") {
        ttrssEnabled.checked = true;
    }

    save.addEventListener("click", function() {
        // This sure is a nifty new class. Too bad JS didn't
        // have it from the very beginning like it should have.
        var url = new URL(ttrssUrl.value);

        localStorage.ttrssUrl = url.origin + url.pathname;
        localStorage.ttrssEnabled = ttrssEnabled.checked;

        document.getElementById("save-success").style.display = "block";
    });
});

