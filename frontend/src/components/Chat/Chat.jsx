import { useUser } from "../User/user";
import { useRef, Fragment } from "react";

import Incoming from "./Messages/Incoming";
import Outgoing from "./Messages/Outgoing";

import useChat from "./Hooks/useChats";
import sendMessage from "./sendMessage";

const Chat = (receiver) => {
  const s = useUser().userName;
  const r = receiver.reciever;
  console.log("Just console logged:", s, r);

  if (s == r) {
    return (
      <h1 className="text-white text-center text-4xl font-bold mt-10">
        Cannot chat with yourself!
      </h1>
    );
  }

  const message = useRef();
  const messages = useChat(s, r);

  const handleSend = (event) => {
    event.preventDefault();
    if (!message || !message.current.value.trim()) return;

    sendMessage(s, r, message.current.value.trim());
    message.current.value = "";
  };

  return (
    <>
      {/* Chat Messages */}
      <div className="h-screen overflow-y-auto p-4 pb-36">
        {/* Messages area */}
        {messages.map((msg, index) => {
          const currentDate = new Date(msg.timestamp).toDateString();
          const prevDate =
            index > 0
              ? new Date(messages[index - 1].timestamp).toDateString()
              : null;
          const showDate = currentDate !== prevDate;
          return (
            <Fragment key={msg.id}>
              {showDate && (
                <div className="text-center text-sm text-gray-500 my-4">
                  {currentDate}
                </div>
              )}
              {msg.sender === s ? (
                <Outgoing message={msg} />
              ) : (
                <Incoming message={msg} />
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Input box */}
      <footer className="p-4 absolute bottom-0 w-2/3 right-0">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            ref={message}
            className="w-full p-2 rounded-md text-white border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </footer>
    </>
  );
};

export default Chat;
