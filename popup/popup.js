// file that retrieves the save tab stacks from chrome's storage and dynamically displays them in the popup

document.addEventListener('DOMContentLoaded', () => { 

    // retrieves the stored tab stacks from chrome's local storage  
    chrome.storage.local.get(["tabStacks"], (result) => {
        // if there are no saved tab stacks, default to an empty array
        const tabStacks = result.tabStacks || [];

        // gets the container element from where the tab stacks will be displayed.
        const container = document.getElementById("stacks-container");

        // clears any previous content in the container
        container.innerHTML = "";

        // loop thru each retrieved tab stack and create a new div element for each
        tabStacks.array.forEach((stack) => {
            
            // creating a div for each tab stack to organize the display
            const div = document.createElement("div");
            div.classList.add("tab-stack"); // class for styling the tab stack

            // create a div fro the tab's title and adding it to the tab stack div
            const title = document.createElement("div");
            title.classList.add("tab-title");
            title.innerHTML = stack.title;

            // div for tab's URL
            const url = document.createElement("div");
            url.classList.add("tab-url");
            url.innerHTML = stack.url;

            // append the title and url divs to the container div
            div.appendChild(title);
            div.appendChild(url);

            // append the tab stack div to the main container
            container.appendChild(div); 
        });
    });
});