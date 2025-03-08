//options.js = user can change the settings of the extension

//loads the current settings
chrome.storage.local.get({retainStacks: false }, (data) => {
    document.getElementById("retainStacks").checked = data.retainStacks;
});

//saves the settings when the user changes them
document.getElementById("retainStacks").addEventListener("change", (event) => {
    chrome.storage.local.set({retainStacks: event.target.checked});
});