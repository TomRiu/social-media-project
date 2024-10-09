import { Avatar } from "@mui/material";
import React from "react";

const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "5rem", height: "5rem" }}
          src="https://cdn.pixabay.com/photo/2021/12/20/09/44/adult-6882635_1280.jpg"
        ></Avatar>
        <p>codewithtom</p>
      </div>
    </div>
  );
};

export default StoryCircle;
