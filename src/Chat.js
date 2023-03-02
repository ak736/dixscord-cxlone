import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Message from "./Message";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      const messageCollection = collection(
        db,
        "channels",
        channelId,
        "messages"
      );
      const messageQuery = query(
        messageCollection,
        orderBy("timestamp", "desc")
      );

      const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setMessages(messages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [channelId]);

  const sendMessage = (e) => {
    console.log(e.target.value);
    e.preventDefault();

    if (input) {
      addDoc(collection(db, "channels", channelId, "messages"), {
        timestamp: serverTimestamp(),
        message: input,
        user: user,
      });

      setInput("");
    }
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message 
            timestamp = {message.timestamp}
            message = {message.message}
            user = {message.user }

          />
        ))}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={channelName}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
