// script that controls the popup UI when clicked upon the extension icon

//loads the retention preferences when the popup is opened
chrome.storage.local.get({ retainStacks: false}), (data) => {
    document.getElementById("retainStacks").checked = data.retainStacks;
};

//saves the retention preference when option is changed
document.getElementById('retainStacks').addEventListener('change', (e) => {
    chrome.storage.local.set({ retainStacks: e.target.checked });
});

// loads stack from the storage
chrome.storage.local.get({ stacks: [] }, (data) => {
    const stacksDiv = document.getElementById("stacks"); // list of stacks

    data.stacks.forEach((stack, index) => {
        const stackElement = document.createElement("div");
        stackElement.className = "stack";

        //creating the image element for each tab stack
        const faviconElement = document.createElement("img");
        const domain = new URL(stack.url).hostname; //extract domain from URL
        faviconElement.src = `https://www.google.com/s2/favicons?domain=${domain}`;
        faviconElement.alt = "Favicon";
        stackElement.appendChild(faviconElement);

        // title
        const titleElement = document.createElement("span");
        titleElement.className = "title";
        titleElement.textContent = stack.title;
        stackElement.appendChild(titleElement);

        // delete button for each stack
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "Delete";

        // delete button event listener
        deleteButton.addEventListener("click", () => {
            // removes the stack from the list when the button is pressed
            data.stacks.splice(index, 1);
            chrome.storage.local.set({ stacks: data.stacks });
            stackElement.remove(); // removes it from the UI
        });
        stackElement.appendChild(deleteButton);

        stacksDiv.appendChild(stackElement);
    });
});

// clears all the stacks
document.getElementById("clearStacks").addEventListener("click", () => {
    chrome.storage.local.set({ stacks: [] }); // clears storage
    document.getElementById("stacks").innerHTML = ""; // clears UI
});