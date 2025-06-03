import Chat from './Chat';
import useChatList from "./Hooks/useChatList";
import { useUser } from "../User/user";

const ChatList = () => {
  const {userName} = useUser();
  const chatData = useChatList(userName);

  return (
    <div className="flex h-screen overflow-hidden">

      <div className="overflow-y-auto w-1/3 h-screen p-3 mb-9 pb-20">
        {chatData.map((chat, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer p-2 hover:bg-red-900 rounded-md"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src={chat.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-lg text-white font-semibold">{chat.chatId}</h1>
              <p className="text-gray-300">{chat.lastSender !== userName ? `${chat.lastSender}:` : ""}{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <Chat receiver={"iamsrk"} />
      </div>
    </div>
  );
};
export default ChatList;
