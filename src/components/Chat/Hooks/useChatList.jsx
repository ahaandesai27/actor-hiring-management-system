import { useState, useEffect } from "react";
import db from "../../../Firebase/rtdb";
import { ref, onValue } from "firebase/database";

const useChatList = (userId) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const chatListRef = ref(db, `chatList/${userId}`);

    const unsubscribe = onValue(chatListRef, (snapshot) => {
      const data = snapshot.val() || {};
      const chats = Object.entries(data).map(([chatId, chat]) => ({
        chatId,
        ...chat,
      }));

      chats.sort((a, b) => b.timestamp - a.timestamp);

      setChatList(chats);
    });

    return unsubscribe;
  }, [userId]);

  return chatList;
};

export default useChatList;