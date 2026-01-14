"use strict";

document.getElementById("analyze").addEventListener("click", onButtonAnalyzeClick);
document.getElementById("lists").addEventListener("click", onButtonListsClick);

let downloadLists = false;

async function onButtonAnalyzeClick(){
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.tabs.sendMessage(tab.id, {action: "analyze_profile", downloadLists: downloadLists});
    let elem = document.getElementById("active");
    elem.innerText = "Scraping started";
}

async function onButtonListsClick() {
    downloadLists = true;
}