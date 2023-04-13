import React, { useEffect, useState } from "react";
import defaultDiscord from "../../../images/defaultDiscord.png";
import { useDispatch } from "react-redux";
import { editMessage } from "../../../store/messages";
import "./MessageCard.css";

const MessageCard = ({
  message,
  socket,
  setSocketMessages,
  socketMessages,
  newRoom,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.message);
  const dispatch = useDispatch();

  // to hide seconds
  const formatDate = (date, time) => {
    const options = time
      ? {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZone: "UTC",
        }
      : { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(date).toLocaleString("en-us", options);
    return formattedDate;
  };

  const date = formatDate(message.createdAt, true);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMessage(message.message);
  };

  const handleSaveEdit = () => {
    const updatedMessage = { ...message, message: editedMessage };
    // console.log("updatedMessage", updatedMessage);

    dispatch(editMessage(updatedMessage)).then(() => {
      setIsEditing(false);
      setSocketMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? updatedMessage : msg
        )
      );
      // console.log("emit edit_message event");
      // console.log("socket", socket);
      socket.emit("edit_message", {
        messageId: message.id,
        newMessage: updatedMessage,
        room: newRoom,
      });
      // console.log("success");
    });
  };

  
  useEffect(() => {
    const handleEditMessage = ({ messageId, newMessage }) => {
      if (messageId === message.id) {
        setEditedMessage(newMessage);
        console.log('did this go through', newMessage)
      }
    };

    socket.on("edit_message", handleEditMessage);

    return () => {
      socket.off("edit_message", handleEditMessage);
    };
  }, [message.id, socket]);

  return (
    <div>
      <ul>
        <li className="user-message">
          <div className="full-message-container">
            <div className="user-profile-img-container">
              <img
                className="profile-img"
                src={message.userId.profileImg || defaultDiscord}
              />
            </div>
            <div className="message-username-container">
              <h1 className="message-username">
                {message.userId.username}
                <span className="message-created-at"> {date}</span>
              </h1>
              {isEditing ? (
                <>
                  <textarea
                    className="message-body"
                    value={editedMessage.message}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                  <div className="message-actions">
                    <button className="cancel-edit" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                    <button className="save-edit" onClick={handleSaveEdit}>
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="message-body">{message.message}</div>
                  <div className="message-actions">
                    <button className="edit-message" onClick={handleEdit}>
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MessageCard;
