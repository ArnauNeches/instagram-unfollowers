"use strict";

function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Hardcoded App ID, change it if necessary.
const APP_ID = "936619743392459";

async function getList(listType) {
    let users = new Set();
    let hasMore = true;
    let nextMaxId = "";
    
    console.log(`Starting ${listType} scrape...`);

    while (hasMore) {
        let url = `https://www.instagram.com/api/v1/friendships/${getCookie("ds_user_id")}/${listType}/?count=25&search_surface=follow_list_page`;
        if (nextMaxId) url += `&max_id=${nextMaxId}`;

        try {
            const response = await fetch(url, {
                headers: {
                    "X-IG-App-Id": APP_ID,
                    "X-CSRFToken": getCookie("csrftoken") 
                }, 
                credentials: "include",
            });

            const data = await response.json();

            data.users.forEach(user => users.add(user.username));

            nextMaxId = data.next_max_id;
            hasMore = data.has_more; 

            console.log(`Fetched ${users.size} users so far...`);

            await sleep(Math.random() * 1000 + 1000);

        } catch (err) {
            console.error("Error fetching:", err);
            hasMore = false; 
        }
    }
    return Array.from(users);
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "analyze_profile") {
        startAnalysis(request.downloadLists); 
    }
});

async function startAnalysis(downList) {

    const followers = await getList("followers");
    if (downList) download("followers.txt", followers.join("\n"));

    const followings = await getList("following");
    if (downList) download("following.txt", following.join("\n"));

    console.log(`Final counts - Followers: ${followers.length}, Followings: ${followings.length}`);

    const dontFollowBack = followings.filter(user => !followers.includes(user));

    download("unfollowers.txt", dontFollowBack.join("\n"));
}