document.getElementById('addTab').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        console.log("Current tab URL: ", currentTab.url);
        // Here you can add logic to save this tab URL to your stack
    });
});
