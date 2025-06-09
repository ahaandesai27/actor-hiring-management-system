import db from "../../Firebase/rtdb";
import { ref, push, update } from "firebase/database";


export default function sendMessage(sender, receiver, message) {
    const chatId = [sender, receiver].sort().join("_");
    const chatRef = ref(db, `chats/${chatId}`);

    const timestamp = Date.now();

    const messageObject = {
      sender,
      message,
      timestamp,
    };

    push(chatRef, messageObject).then(() => {
      const lastMessageObject = {
        lastMessage: message,
        lastSender: sender,
        timestamp,
      };

      const updates = {};
      updates[`chatList/${sender}/${receiver}`] = lastMessageObject;
      updates[`chatList/${receiver}/${sender}`] = lastMessageObject;

      return update(ref(db), updates);
    });
}
