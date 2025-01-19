// retrieve the tab stacks from local storage and display them in the popup.html
document.addEventListener('DOMContentLoaded', function() {
    const tabList = document.getElementById('tab-list');
   
    // fetching the tab stacks from storage
    chrome.runtime.sendMessage({ action: "getTabStacks" }, (tabStacks) => {
        if (tabStacks.length === 0) {
            tabList.innerHTML = "<p>No tab stacks save in the stack.</p>";
            return;
        }

        // populate the tab list with the saved tabs
        tabStacks.forEach((tab, index) => {
            const listItem = document.createElement('li');
            listItem.className = "tab-item";

            //tab title and link
            const link = document.createElement('a');
            link.href = tab.url;
            link.textContent = tab.title;
            link.target = "_blank"; //opens the link in a new tab
            listItem.appendChild(link);

            //remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = "remove-btn";
            removeButton.addEventListener('click', () =>  removeTabFromStack(index)) //when button is clicked removes the tab from the stack;
            listItem.appendChild(removeButton);

            tabList.appendChild(listItem);

        });
    });
});

// remove a tab from stack
function removeTabFromStack(index) {
    chrome.runtime.sendMessage({ action: "removeTab", index }, (response) => {
        if (response.success) {
            alert("Tab removed successfully!");
            window.location.reload(); // reloads the popup to reflect the changes
        } else {
            console,log("Failed to remove tab from stack");
        }
        
    });
}