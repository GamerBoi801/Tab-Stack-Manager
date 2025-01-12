document.addEventListener("DOMContentLoaded", () => {

    //when the options page is loaded, retrieve and display the user's settings.
    chrome.storage.local.get(["retentionType"], (result) => {
        const retentionType = result.retentionType || "session"; // default 'session'
        document.getElementById("retention-type").value = retentionType; //sets the dropdown to the saved value
    });

    // Event listener for the "Save Settings" button
    document.getElementById("save-settings").addEventListener("click", () => {
        const retentionType = document.getElementById("retention-type").value; // gets the selected retention type

        //saves the retention type in Chrome's local storage
        chrome.storage.local.set({ retentionType }, () => {
            alert("Settings saved successfully!"); //shows a confirmation message to the user
        });
    });
});
