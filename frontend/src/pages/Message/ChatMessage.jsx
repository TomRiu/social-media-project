import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ item }) => {
  const auth = useSelector(store => store.auth);
  const user = useSelector(store => store.user);
  const isReqUserMessage = user.profile.data?.id === item.user?.id;
  return (
    <div
      className={`flex ${isReqUserMessage ? "justify-end" : "justify-start"} text-white`}
    >
      <div
        className={`p-1 ${
          item.image ? "px-3 py-3 rounded-md" : "px-5 rounded-full"
        } bg-[#191c29]`}
      >
        {item.image && (
          <img
            className="w-[12rem] h-[17rem] object-cover rounded-md"
            alt=""
            src={item.image}
          />
        )}
        <p className={`${true ? "py-2" : "py-1"}`}>{item.content}</p>
        <p>{item.timestamp}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
