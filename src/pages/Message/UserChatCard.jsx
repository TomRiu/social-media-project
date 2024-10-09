import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const UserChatCard = ({ chat }) => {
  const { auth } = useSelector((store) => store);
  
  const users = chat.users;
  const user = auth.user?.id === users[0]?.id ? users[1] : users[0];
  
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)",
            }}
            src="https://cdn-icons-png.flaticon.com/512/14996/14996907.png"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={user.firstName + " " + user.lastName}
        subheader={"new message"}
      ></CardHeader>
    </Card>
  );
};

export default UserChatCard;
