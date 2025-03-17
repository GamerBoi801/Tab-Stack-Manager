// script that controls the popup UI when clicked upon the extension icon

//loads the retention preferences when the popup is opened
chrome.storage.local.get({ retainStacks: false}), (data) => {
    document.getElementById("retainStacks").checked = data.retainStacks;
};

//saves the retention preference when option is changed
document.getElementById('retainStacks').addEventListener('change', (e) => {
    chrome.storage.local.set({ retainStacks: e.target.checked });
});

/// toggling dark mode
//       #TODO
document.getElementById("darkMode").addEventListener("change", (e) => {
    document.body.classList.toggle("dark-mode", e.target.checked);
    chrome.storage.local.set({ darkMode: e.target.checked });
  });
  
  // Loads the dark mode preference
  chrome.storage.local.get({ darkMode: false }, (data) => {
    document.getElementById("darkMode").checked = data.darkMode;
    document.body.classList.toggle("dark-mode", data.darkMode);
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
        const titleElement = document.createElement("a");
        titleElement.className = "title";
        titleElement.textContent = stack.title;
        titleElement.href = stack.url;
        titleElement.target = "_blank"; //opens the link in the new tab
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

// expor stacks
document.getElementById('exportStacks').addEventListener('click', () => { 
    //getting the stacks from storage
    chrome.storage.local.get({ stacks: [] }, (data) => {
        //converting the stack array into JSON strings
        const jsonStrng = JSON.stringify(data.stacks, null, 2);

        //creating a blob (binary large object) from the JSON string
        const blob = new blob([jsonStrng], { type: "application/json" });

        // creating a temp URL for the blob
        const url = URL.createObjectURL(blob);

        // creating hidden <a> element to trigger downlaod 
        const a = document.createElement("a");
        a.href = url;
        a.download = "stacks.json" //set the filename;
        a.style.display = "none"; 

        // adding a elemnt to the DOM and triggering  click event
        document.body.appendChild(a);
        a.click();

        // clean up by removing <a> element and revoking the URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});


// clears all the stacks
document.getElementById("clearStacks").addEventListener("click", () => {
    chrome.storage.local.set({ stacks: [] }); // clears storage
    document.getElementById("stacks").innerHTML = ""; // clears UI
});