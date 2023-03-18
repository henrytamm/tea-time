import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMessages } from "../../store/messages";

const MessageList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const channel = useSelector((state) => state.channelReducer);
    const server = Object.values(useSelector((state) => state.serverReducer))
    const user = useSelector((state) => state.session.user)
    const { serverId, channelId } = useParams()
    const [ isLoaded, setIsLoaded ] = useState(false)


  
    useEffect(() => {
            dispatch(getMessages(channelId))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getUserServers(user.id))
    //     .then(()=> {
    //         dispatch(getChannels(serverId))
    //     })
    //     .then(() => setIsLoaded(true))
    // }, [dispatch])


    return (
        <div>test</div>
    )
}

export default MessageList