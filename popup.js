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

chrome.runtime.onMessage.addListener((message) =>{
    const title = document.getElementById("scraping-title");
    const followersProgress = document.getElementById("followers");
    const followingProgress = document.getElementById("following");
    const stats = document.getElementById("stats");

    if (message.action === "status_change") title.innerText = message.text;
    if (message.action === "progress_update") {
        if (message.type === "followers"){
            followersProgress.innerText = `Scraped followers: ${message.current} / ${message.total}`;
        } else if (message.type === "following") {
            followingProgress.innerText = `Scraped following: ${message.current} / ${message.total}`;
        }
    }
    if (message.action === "finished") {
        title.innerText = "Finished analyzing account"
        stats.innerText = `Number of unfollowers ${message.unfollowers}`;
        actionBtn.disabled = false;
        toggle.disabled = false;
    }
});