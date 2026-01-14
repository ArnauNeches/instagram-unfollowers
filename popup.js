"use strict";

document.getElementById("analyze").addEventListener("click", onButtonAnalyzeClick);

const actionBtn = document.getElementById("analyze");
const toggle = document.getElementById("toggle");
const toggleMessage = document.getElementById("toggle-message");

toggle.addEventListener("change", () => {
    if (!toggle.checked){
        toggleMessage.innerText = "Followers/following lists won't be downloaded."
        toggleMessage.style.backgroundColor = "red";
    }else{
        toggleMessage.innerText = "Followers/following lists will be downloaded."
        toggleMessage.style.backgroundColor = "green";
    }
});


async function onButtonAnalyzeClick(){
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.tabs.sendMessage(tab.id, {action: "analyze_profile", downloadLists: toggle.checked});
    actionBtn.disabled = true;
    toggle.disabled = true;
}

chrome.runtime.onMessage.addEventListener((message) =>{
    const title = document.getElementById("scraping-title");
    const followersProgress = document.getElementById("followers");
    const followingProgress = document.getElementById("following");
    const stats = document.getElementById("stats");

    
});