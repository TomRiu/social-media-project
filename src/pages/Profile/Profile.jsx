// src/pages/Profile/Profile.jsx

import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPostAction } from "../../Redux/Post/post.action";
import {
  fetchUserProfileAction,
  getSavedPostsAction,
  // followUserAction,
  // unfollowUserAction,
} from "../../Redux/User/user.action";
import { useParams } from "react-router-dom";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import ProfileModal from "./ProfileModal";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { auth, post, user } = useSelector((store) => store);
  
  // Determine if the viewed profile is the current user's profile
  const isOwnProfile = id === user.profile.data?.id.toString();

  const [value, setValue] = useState("post");
  const [open, setOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // Track follow status

  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const savedPost = user.savedPosts.data;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchUserProfileAction(id));
      dispatch(getUsersPostAction(id));
      dispatch(getSavedPostsAction());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!isOwnProfile && user.otherProfile.data && user.otherProfile.data.followings) {
      // Check if the current user is following the viewed user
      setIsFollowing(user.profile.data.followings.some((following) => following.id === parseInt(id)));
    }
  }, [isOwnProfile, user.otherProfile.data, id]);

  const handleFollow = () => {
    // dispatch(followUserAction(id));
    setIsFollowing(true);
  };

  const handleUnfollow = () => {
    // dispatch(unfollowUserAction(id));
    setIsFollowing(false);
  };

  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md object-cover"
            src="https://images.pexels.com/photos/386025/pexels-photo-386025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Cover"
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src={
              user.otherProfile.data?.avatarUrl ||
              "https://cdn-icons-png.flaticon.com/512/14996/14996907.png"
            }
          />

          {isOwnProfile ? (
            <Button
              onClick={handleOpenProfileModal}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={isFollowing ? handleUnfollow : handleFollow}
              sx={{ borderRadius: "20px" }}
              variant={isFollowing ? "contained" : "outlined"}
              color={isFollowing ? "secondary" : "primary"}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {user.otherProfile.data?.firstName + " " + user.otherProfile.data?.lastName}
            </h1>
            <p>{user.otherProfile.data?.email.toLowerCase()}</p>
          </div>
          <div className="flex gap-2 items-center py-3">
            <span>{post.userPosts.length} posts</span>
            <span>{user.otherProfile.data?.followersCount} followers</span>
            <span>{user.otherProfile.data?.followingsCount} followings</span>
          </div>

          <div>
            <p>{user.otherProfile.data?.bio || "No bio available."}</p>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab key={item.value} value={item.value} label={item.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.userPosts.map((item) => (
                  <div className="border border-slate-100 rounded-md" key={item.id}>
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {post.userPosts.filter(post => post.type === 'reel').map((item) => (
                  <div key={item.id}>
                    <UserReelCard />
                  </div>
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {savedPost.length > 0 ? (
                  savedPost.map((post) => (
                    <div
                      className="border border-slate-100 rounded-md"
                      key={post.id}
                    >
                      <PostCard item={post} />
                    </div>
                  ))
                ) : (
                  <p>No saved posts.</p>
                )}
              </div>
            ) : value === "repost" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.userPosts.filter(post => post.reposted).map((item) => (
                  <div className="border border-slate-100 rounded-md" key={item.id}>
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>

      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default Profile;
