import { useUser } from "../User/user";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Incoming from "./Messages/Incoming";
import Outgoing from "./Messages/Outgoing";

import db from "../../Firebase/rtdb";
import { ref, push, onValue } from "firebase/database";

const Chat = () => {
  const sender = useUser().userName;
  const receiver = useParams().receiver;
  const message = useRef();
  const [messages, setMessages] = useState([]);

  const chatId = [sender, receiver].sort().join("_");
  const chatRef = ref(db, `chats/${chatId}`);

  useEffect(() => {
    const parseMessages = (data) => {
      if (!data) return [];
      return Object.entries(data)
        .map(([id, msg]) => ({ id, ...msg }))
        .sort((a, b) => a.timestamp - b.timestamp);
      // flattens the array of [id, {msg}] to a single object of {id, ..msg}
      // then sorts it by timestamp
    };

    const offListener = onValue(chatRef, (snapshot) => {
      const data = snapshot.val(); //get data from the Ref
      setMessages(parseMessages(data)); // set messages array to it after flattening
    });

    // the firebase SDK returns an offListener to stop listening to the data once done

    return offListener; // Detach the listener on unmount
  }, [chatId]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!message) return;
    const messageObject = {
      sender: sender,
      message: message.current.value,
      timestamp: Date.now(),
    };
    push(chatRef, messageObject);
    message.current.value = "";
  };

  return (
    <div className="h-screen overflow-y-auto p-4 pb-36">
      {messages.map((msg) =>
        msg.sender === sender ? (
          <Outgoing key={msg.id} message={msg} />
        ) : (
          <Incoming key={msg.id} message={msg} />
        )
      )}

      <footer className="text-white p-4 absolute bottom-0 left-0 right-0 w-full overflow-x-hidden">
        <div className="flex items-center">
          <input
            type="text"
            ref={message}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-1" onClick={sendMessage}>Send</button>
        </div>
      </footer>

    </div>
  );
};

export default Chat;
