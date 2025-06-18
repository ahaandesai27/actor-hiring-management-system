import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import useChatList from "./Hooks/useChatList";
import { useUser } from "../User/user";

const ChatList = () => {
  const { userName } = useUser();
  const [reciever, setReciever] = useState("");
  const chatData = useChatList(userName);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="overflow-y-auto w-1/3 h-screen p-3 mb-9 pb-20">
        {chatData.map((chat, index) => {
          return <div
            onClick={() => {console.log(chat.chatId); setReciever(chat.chatId)}}
            key={index}
            className="flex items-center cursor-pointer p-2 hover:bg-red-900 rounded-md"
          >
            <div className="flex-1">
              <h1 className="text-lg text-white font-semibold">{chat.chatId}</h1>
              <p className="text-gray-300">
                {chat.lastSender !== userName ? `${chat.lastSender}: ` : ""}
                {chat.lastMessage}
              </p>
            </div>
          </div>
    })}
      </div>

      {reciever ? (
        <div className="flex-1 h-screen">
          <Chat reciever={reciever} />
        </div>
      ) : (
        <div className="flex-1 h-screen flex items-center justify-center">
          <h1 className="text-white text-4xl text-center font-bold">
            Select a chat to start messaging!
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatList;
