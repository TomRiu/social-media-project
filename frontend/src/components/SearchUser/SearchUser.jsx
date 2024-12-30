import { Avatar, Card, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChat } from "../../Redux/Message/message.action";
import { searchUser } from "../../Redux/User/user.action";
import { useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";

const SearchUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store);
  const [username, setUsername] = useState("");

  const handleSearchUser = (e) => {
    const query = e.target.value;
    setUsername(query);
    if (query.trim()) {
      dispatch(searchUser(query));
    }
  };

  const handleNavigateToProfile = (userId) => {
    navigate(`/profile/${userId}`);
    setUsername("");
  };

  const handleCreateChat = (userId) => {
    dispatch(createChat({ userId }));
    setUsername("");
  };

  return (
    <div className="relative py-5">
      <input
        className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
        placeholder="Search user"
        onChange={handleSearchUser}
        type="text"
        value={username}
      />

      {username && user.search.results?.length > 0 && (
        <div className="absolute z-10 top-[4.5rem] w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {user.search.results.map((item) => (
            <Card key={item.id} className="relative border-b last:border-b-0 hover:bg-gray-50">
              <div
                onClick={() => handleNavigateToProfile(item.id)}
                className="flex items-center p-3 cursor-pointer"
              >
                <Avatar
                  src={
                    item.avatarUrl ||
                    "https://cdn-icons-png.flaticon.com/512/14996/14996907.png"
                  }
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">{item.firstName} {item.lastName}</div>
                  <div className="text-sm text-gray-500">{item.email.toLowerCase()}</div>
                </div>
              </div>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateChat(item.id);
                }}
                aria-label="start chat"
                className="!absolute right-4 top-3"
              >
                <ChatIcon />
              </IconButton>
            </Card>
          ))}
        </div>
      )}

      {username && user.search.results?.length === 0 && (
        <div className="absolute z-10 top-[4.5rem] w-full bg-white shadow-lg rounded-lg p-4">
          <p className="text-center text-gray-500">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
