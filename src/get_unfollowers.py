import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

URL = f"https://www.instagram.com/api/v1/friendships/{os.environ["id"]}/followers/"

params = {"count": 12, "search_surface": "follow_list_page"}

cookie_list = ["crsftoken", "datr", "dpr", "ds_user_id", "ig_did", "mid", "rur", "sessionid", "wd"]
cookie_dict = {cookie:os.environ[cookie] for cookie in cookie_list}

header_list = ["User-Agent", "X-CSRFToken", "X-Requested-With", "X-IG-App-ID"]
header_dict = {header:os.environ[header] for header in header_list}

response = requests.get(URL, params=params, cookies=cookie_dict, headers=header_dict)

print(response.status_code)
print(response.text)



