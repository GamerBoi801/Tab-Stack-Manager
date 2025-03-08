// context menu option for the extension
chrome.contxtMenus.create({
    id: "addToStack",  //unique id for the context menu
    title: "Add to Stack", // txt shown in the context menu
    context: ["page"]  //shows this option when right clciking on a page
});

//listens for clicks on the context menu
chrome.contxtMenus.Onclicked.addListener((info, tab) => {
    if (info.menuItemId === "addToStack") {

        //adds the tab to the stack
        chrome.storage.local.get({stacks: [] }, (data) => { //stores data locally in the browser and retrives the curren stacks
            
            const stacks = data.stacks // gets the current stacks
            stacks.push({title: tab.title, url: tab.url}) // adds the new tab to the stacks
            chrome.storage.local.set({stacks}) // saves the updated stacks
        });
    }
});
