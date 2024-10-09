import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/message.action";

const SearchUser = () => {
  const dispatch = useDispatch();
  const { auth, message } = useSelector((store) => store);
  const [username, setUsername] = useState("");

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    dispatch(searchUser(e.target.value));
    console.log("handle search user ", auth.searchUser);
  };

  const handleClick = (userId) => {
    console.log("handle click");
    dispatch(createChat({ userId: userId }));
  };

  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search user"
          onChange={handleSearchUser}
          type="text"
        />
        {username && (
          <div className="absolute z-10 top-[4.5rem] w-full bg-white shadow-lg rounded-lg overflow-hidden">
            {auth.searchUser.map((item) => (
              <Card key={item.id} className="border-b last:border-b-0">
                <CardHeader
                  onClick={() => {
                    handleClick(item.id);
                    setUsername("");
                  }}
                  className="cursor-pointer hover:bg-gray-50"
                  avatar={
                    <Avatar src="https://cdn-icons-png.flaticon.com/512/14996/14996907.png" />
                  }
                  title={item.firstName + " " + item.lastName}
                  subheader={item.email.toLowerCase()}
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
