// script that controls the popup UI when clicked upon the extension icon

//loads stack from the storage
chrome.storage.local.get({ stacks: []}, (data) => {
    const stacksDiv = document.getElementById("stacks"); // gets the stack container
    
    data.stacks.forEach((stack) => {
        // creates a new element for each stack
        
        const stackElement = document.createElement("div"); //creates a new div
        stackElement.className = "stack"; //  names the css class
        stackElement.textContent = stack.title; // set the txt to the tab title 
        stacksDiv.appendChild(stackElement); // appends the stack to the container
    });
    
});