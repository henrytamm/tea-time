import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMessages } from "../../../store/messages";

const MessageCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();
  const messages = Object.values(useSelector((state) => state.messageReducer))
  const [ isLoaded, setIsLoaded ] = useState(false)

  useEffect(() => {
    if (serverId && channelId){
        dispatch(getMessages(serverId, channelId))
        .then(() => {
          setIsLoaded(true)
        })
    }
  }, [dispatch, serverId, channelId])

  return (
    <div>
        messages
        <ul>
           {messages.map((message) => {
            return (
                <li>
                   {isLoaded && message.message}
                </li>
            )
           })}
        </ul>
    </div>
  )
};

export default MessageCard