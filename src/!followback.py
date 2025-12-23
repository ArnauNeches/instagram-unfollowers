def dont_followback():
    followers = set()
    followings = set()

    with open("followers.txt", "r") as f:
        for user in f:
            followers.add(user.strip())

    with open("followings.txt", "r") as f:
        for user in f:
            followings.add(user.strip())
    
    dont_followback = followings - followers
    print("Account that don't follow you back:")
    print(dont_followback)
    
    with open("followback.txt", "w") as followback_file:
        for unfollower in dont_followback:
            followback_file.write(f"{unfollower}\n")
    
    print("\n")
    print("---------------------------------------")
    print("Unfollowers stored in followback.txt")

if __name__ == "__main__":
    dont_followback()