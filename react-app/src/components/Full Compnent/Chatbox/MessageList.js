import React, { useEffect, useState, useRef } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMessages, clearAllMessages } from "../../../store/messages";
import MessageInput from "./MessageInput";
import MessageCard from "./MessageCard";
import { io } from "socket.io-client";
import "./MessageList.css";

const MessageList = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const socketRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [socketMessages, setSocketMessages] = useState([]);

  useEffect(() => {
    dispatch(getMessages(channelId)).then((messages) => {
      setSocketMessages(messages);
    });

    socketRef.current = io();

    socketRef.current.on("message", (message) => {
      // console.log("create message", message);
      setSocketMessages((prevMessages) => [
        ...prevMessages,
        message.newMessage,
      ]);
    });

    socketRef.current.on("edit_message", (editedMessage) => {
      // console.log("edit message", editedMessage);
      setSocketMessages((prevMessages) => {
        const newMessages = prevMessages.map((msg) => {
          if (msg.id === editedMessage.messageId) {
            return { ...msg, message: editedMessage.newMessage.message };
          }
          return msg;
        });
        return newMessages;
      });
    });

    return () => {
      socketRef.current.disconnect();
      dispatch(clearAllMessages());
    };
  }, [dispatch, channelId]);

  useEffect(() => {
    const newRoom = `${channelId}`;
    const oldRoom = socketRef.current ? socketRef.current.id : null;

    const joinRoom = (room) => {
      if (socketRef.current) {
        socketRef.current.emit("join_room", { room });
      }
    };

    const leaveRoom = (room) => {
      if (socketRef.current) {
        socketRef.current.emit("leave_room", { room });
      }
    };

    if (isLoaded) {
      if (oldRoom !== newRoom) {
        leaveRoom(oldRoom);
        joinRoom(newRoom);
      }
    }

    setIsLoaded(true);

    return () => setIsLoaded(false);
  }, [channelId, isLoaded]);

  // console.log(socketMessages);

  return (
    <>
      {channelId && (
        <div className="channel-messages-container">
          <ul className="all-messages-container">
            {Array.isArray(socketMessages) &&
              socketMessages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  socket={socketRef.current}
                  setSocketMessages={setSocketMessages}
                  socketMessages={socketMessages}
                  newRoom={channelId}
                />
              ))}
          </ul>
          <section className="message-input-container">
            <MessageInput socket={socketRef.current} newRoom={channelId} />
          </section>
        </div>
      )}
    </>
  );
};

export default MessageList;
