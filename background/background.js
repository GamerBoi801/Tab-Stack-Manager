// event listener when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // context menu that appears when the user right clicks anywhere in the browser
    chrome.contextMenus.create({
        id: 'saveTab',   // unique identifier for each menu item
        title: 'Save this tab', // title shown in the right click menu
        contexts: ['all'] // menu will be available in all contexts
    });
})

// event listener for any context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "addToStack") { // check if the clicked menu item is addToStack
        addToStack(tab); // func to add current tab to the stack
    }
});

// function to add the current tab to the stack
function addToStack(tab) {
    // retrieves the existing tab stacks from chrome's local storage
    chrome.storage.local.get(['tabStack'], (result) => {
        let tabStacks = result.tabStacks || [] // if no tabStacks exist, create an empty array

        // creating a new tab object that contains the tab's title and URL
        const newTab = {
            title: tab.title,
            url: tab.url,
            timestamp: new Date().getTime() // timestamp to keep track of when the tab was added

        };

        // push the tab stack to the existing stack array
        tabStacks.push(newTab);

        // save the updated tav stack back to local storage
        chrome.storage.local.set({tabStacks}, () => {
            console.log("Tab added to stack: ", tab.title);
    });
});
}