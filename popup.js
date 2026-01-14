"use strict";

document.getElementById("analyze").addEventListener("click", onButtonAnalyzeClick);
document.getElementById("lists").addEventListener("click", onButtonClick);

let downloadLists = false;

async function onButtonAnalyzeClick(){
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.tabs.sendMessage(tab.id, {action: "analyze_profile", downloadLists: downloadLists});
    
}

async function onButtonListsClick() {
    downloadLists = true;
}