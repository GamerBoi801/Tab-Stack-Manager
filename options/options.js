//options.js = user can change the settings of the extension

// Load saved options
chrome.storage.local.get({ retainStacks: false }, (data) => {
    document.getElementById("retainStacks").checked = data.retainStacks;
  });
  
  // Save options when changed
  document.getElementById("retainStacks").addEventListener("change", (e) => {
    chrome.storage.local.set({ retainStacks: e.target.checked });
  });