import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMessages, clearAllMessages, createNewMessage } from "../../../store/messages";

const MessageInput = ({ socket, newRoom }) => {
  const dispatch = useDispatch();
  const [messageBody, setMessageBody] = useState("");
  const { channelId } = useParams();
  const user = useSelector((state) => state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { 
      message: messageBody, 
      userId: user 
    };

    let sentMessage = dispatch(createNewMessage(newMessage, channelId))
    .then((newMessage) =>
        socket.send({
          newMessage: newMessage,
          room: newRoom,
        })
    );

    if (sentMessage) {
      setMessageBody("");
    }
  };

  return (
    <div className="message-input-container">
      <form className="create-message-form" onSubmit={handleSubmit}>
        <input
          className="message-body-container"
          type="text"
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          placeholder="Start typing..."
          required
        />
        <button className="create-message-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
