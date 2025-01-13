// retrieve the tab stacks from local storage and display them in the popup.html
document.addEventListener('DOMContentLoaded', function() {
    // Get the tab stacks from local storage
    chrome.storage.local.get(['tabStacks'], function(result) {
        const tabStacks = result.tabStacks || [];  // Default to an empty array if no stack is saved
        
        const stacksContainer = document.querySelector('.stacks-container');
        
        // If no tabs are in the stack
        if (tabStacks.length === 0) {
            stacksContainer.innerHTML = '<p>No tabs in the stack yet.</p>';
        } else {
            // Populate the stack list
            tabStacks.forEach(tab => {
                const stackItem = document.createElement('div');
                stackItem.classList.add('stack-item');
                stackItem.innerHTML = `
                    <strong>${tab.title}</strong>
                    <br>
                    <a href="${tab.url}" target="_blank">${tab.url}</a>
                `;
                stacksContainer.appendChild(stackItem);
            });
        }
    });
});
