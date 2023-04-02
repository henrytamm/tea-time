import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMessages, clearAllMessages } from "../../../store/messages";
import MessageInput from "./MessageInput";
import MessageCard from "./MessageCard";
import { io } from "socket.io-client";
import "./MessageList.css";

let socket;

const MessageList = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const [oldRoom, setOldRoom] = useState(`${channelId}`);
  const [newRoom, setNewRoom] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [socketMessages, setSocketMessages] = useState([]);

  useEffect(() => {
    dispatch(getMessages(channelId)).then((messages) =>
      setSocketMessages(messages)
    );

    socket = io();

    socket.on("message", (message) => {
      setSocketMessages((messages) => [...messages, message.newMessage]);
    });

    setNewRoom(`${channelId}`);

    return () => {
      socket.disconnect();
    };
  }, [dispatch, channelId]);

  useEffect(() => {
    const joinRoom = (room) => {
      socket.emit("join_room", { room: newRoom });
    };

    const leaveRoom = (room) => {
      socket.emit("leave_room", { room: oldRoom });
    };
    // console.log('this is joinroom', joinRoom)
    // console.log('this is leave room', leaveRoom)
    // console.log('should be true', isLoaded)

    if (isLoaded) {
      leaveRoom(oldRoom);
      joinRoom(newRoom);
      setOldRoom(newRoom);
    }

    setIsLoaded(true);

    return () => setIsLoaded(false);
  }, [oldRoom, newRoom, isLoaded]);

  console.log(socketMessages);

  return (
    <>
      {channelId && (
        <div className="channel-messages-container">
          <ul className="all-messages-container">
            {Array.isArray(socketMessages) &&
              socketMessages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
          </ul>
          <section className="message-input-container">
            <MessageInput socket={socket} newRoom={newRoom} />
          </section>
        </div>
      )}
    </>
  );
};

export default MessageList;
