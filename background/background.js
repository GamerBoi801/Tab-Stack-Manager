// background.js: this script runs in the background, managing tab stack data and handling context menu interactions.

// initialize the context menu for adding tabs to the stack
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed or updated ');
    
    // allows the user to add the tab item when right-clicking on a tab
    chrome.contextMenus.create({
        id: "add-to-stack",  // unique ID for the context menu item
        title: "Add to Tab Stack",  // text shown in the right-click menu
        contexts: ["page"],  // only show the menu when right-clicking on a tab
    });
});

// listen for a click on the "Add to Tab Stack" context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("Context menu clicked", info, tab);
    // check if the clicked item is the "Add to Tab Stack" context menu item
    if (info.menuItemId === "add-to-stack") {
        addToStack(tab);  // call the function to add the tab to the stack
    }
});

// function to add a tab to the stack
function addToStack(tab) {
    // retrieve existing tab stacks from chrome's local storage
    chrome.storage.local.get(["tabStacks"], (result) => {
        console.log("Tab stacks retrieved", result.tabStacks);
        let tabStacks = result.tabStacks || [];  // if no stacks exist, initialize with an empty array

        // create a new tab object with the necessary details
        const newTab = {
            title: tab.title,  // tab title
            url: tab.url,  // tab URL
            timestamp: new Date().getTime(),  // timestamp of when the tab was added
        };

        tabStacks.push(newTab);  // add the new tab to the tab stack

        // save the updated tab stack back to local storage
        chrome.storage.local.set({ tabStacks }, () => {
            console.log("tab added to stack:", tab.title);  // log a message for debugging
        });
    });
}

// listen for messages from the content script or popup to handle different actions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTabStacks") {
        // if the action is "getTabStacks", send the stored tab stacks back to the sender
        chrome.storage.local.get(["tabStacks"], (result) => {
            sendResponse(result.tabStacks || []);  // send the tab stacks or an empty array if none exist
        });
        return true;  // indicate that the response is asynchronous
    }
    
    if (message.action === "clearTabStacks") {
        // if the action is "clearTabStacks", clear all tab stacks from local storage
        chrome.storage.local.set({ tabStacks: [] }, () => {
            sendResponse({ success: true });  // send a success response back to the sender
        });
        return true;  // indicate that the response is asynchronous
    }
});