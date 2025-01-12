// background script for handling logic

// listen for when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {message: 'tabUpdated', url: tab.url});
    }
});

// listens for clicks on the browser action icon
chrome.browserAction.onClicked.addListener((tab) => {
    console.log('browser action clicked'); 
    // popup 
    }
); 

// stack logic
let tab_stack = {}; // obj to hold the stack

//function to add a tab to the stack
function addToStack(StackName, tabId) {
    if (!tab_stack[StackName]) {
        tab_stack[StackName] = [];
    }

    tab_stack[StackName].push(tabId);
    console.log('Tab ${tabId} added to stack ${StackName}');
}

// listen for messages from content script  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == 'getTabs') {
        sendResponse({tabs: tabStacks});
    }
});

