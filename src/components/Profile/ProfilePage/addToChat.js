import db from "../../../Firebase/rtdb";
import { ref, set, update } from "firebase/database";

export default async function addToChat(s, r) {
    const timestamp = Date.now();
    
    const newChatData = {
        lastMessage: "\n",
        lastSender: s,
        timestamp
    };

    try {
        // Create chat entry for sender (s)
        const senderChatRef = ref(db, `chatList/${s}/${r}`);
        await set(senderChatRef, newChatData);
        
        // Create chat entry for receiver (r)
        const receiverChatRef = ref(db, `chatList/${r}/${s}`);
        await set(receiverChatRef, newChatData);
        
        console.log(`Chat created between ${s} and ${r}`);
        return true;
    } catch (error) {
        console.error("Error creating chat:", error);
        return false;
    }
}