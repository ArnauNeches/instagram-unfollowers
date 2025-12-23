import requests
import os
from dotenv import load_dotenv
import json
import time
import random

def get_followings():

    load_dotenv()

    followings = set()

    URL = f"https://www.instagram.com/api/v1/friendships/{os.environ["id"]}/following/"

    params_followings = {"count": 25} 

    cookie_list = ["crsftoken", "datr", "dpr", "ds_user_id", "ig_did", "mid", "rur", "sessionid", "wd"]
    cookie_dict = {cookie:os.environ[cookie] for cookie in cookie_list}

    header_list = ["User-Agent", "X-CSRFToken", "X-Requested-With", "X-IG-App-ID"]
    header_dict = {header:os.environ[header] for header in header_list}

    response = requests.get(URL, params=params_followings, cookies=cookie_dict, headers=header_dict)

    print("Step 0 response status:" + str(response.status_code))
    response = json.loads(response.text)
    for user in response["users"]:
        followings.add(user["username"])
    print("Step 0 followings names:")
    print(followings)

    has_more = response["has_more"]
    next_max_id = response["next_max_id"]

    i=0
    while has_more:
        i+=1

        print("\n")
        print("-------------------------------------------------")
        print(f"Step {i} getting followings:")

        params_followings["max_id"] = next_max_id

        time.sleep(random.uniform(0.9, 1.8))
        response = requests.get(URL, params=params_followings, cookies=cookie_dict, headers=header_dict)

        if response.status_code != 200:
            raise requests.ConnectionError(f"Expected 200 received {response.status_code}")
        print(f"Step {i} response status:" + str(response.status_code))

        response = json.loads(response.text)

        new_usernames = set()
        for user in response["users"]:
            new_usernames.add(user["username"])
        if len(new_usernames)==0:
            raise requests.RequestException("Received 0 new users")
        print(f"Step {i} new usernames: ")
        print(new_usernames)

        followings.update(new_usernames)

        has_more = response["has_more"]
        if has_more:
            next_max_id = response["next_max_id"]
            print(f"Step {i} next_max_id:" + str(next_max_id))
        


    print("\n")
    print("\n")
    print("-------------------------------------------------")
    print("End of loop, list of all followings: ")
    print(followings)
    print(f"Number of followings: {len(followings)}")

    with open("followings.txt", "w") as followings_file:
        for following in followings:
            followings_file.write(f"{following}\n")

    print("\n")
    print("Followings stored on followings.txt")

if __name__ == "__main__":
    get_followings()