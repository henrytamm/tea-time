import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMessages, clearAllMessages } from "../../../store/messages";

const MessageCard = ( {message} ) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();
//   const messages = Object.values(useSelector((state) => state.messageReducer))
  


  return (
    <div>
        <ul>
                <li>
                  {message.message}
                </li>
        </ul>
    </div>
  )
};

export default MessageCard