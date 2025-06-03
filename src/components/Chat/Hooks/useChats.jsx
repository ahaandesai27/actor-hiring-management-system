import { useState, useEffect } from "react";

import db from "../../../Firebase/rtdb";
import { ref, onValue } from "firebase/database";

const useChat = (sender, receiver) => {
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

      return messages;
}
export default useChat;