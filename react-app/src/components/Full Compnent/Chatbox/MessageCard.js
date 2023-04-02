import React, { useEffect, useState } from "react";
import defaultDiscord from "../../../images/defaultDiscord.png";
import "./MessageCard.css";

const MessageCard = ({ message }) => {
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

  return (
    <div>
      <ul>
        <li className="user-message">
          <div className="full-message-container">
            <div className="user-profile-img-container">
              <img
                className="profile-img"
                src={message.userId.profileImg}
                alt={defaultDiscord}
              />
            </div>
            <div className="message-username-container">
              <h1 className="message-username">
                {message.userId.username}
                <span className="message-created-at"> {date}</span>
              </h1>
            <div className="message-body">{message.message}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MessageCard;
