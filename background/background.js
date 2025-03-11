// context menu option
chrome.contextMenus.create({
    id: "addToStack",
    title: "Add to Stack",
    contexts: ["page"] 
  });
  
  // listens for clicks on the context menu
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "addToStack") {

      // adds the tab to the stack
      chrome.storage.local.get({ stacks: [] }, (data) => {
        
        const stacks = data.stacks; // gets the current stacks
        stacks.push({ url: tab.url, title: tab.title }); // adds a new tab
        chrome.storage.local.set({ stacks }); // saves the updated stacks
      });    
}});