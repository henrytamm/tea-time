import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserServers } from "../../store/servers";
import { getChannels } from "../../store/channels";
import { useState } from "react";
import { getMessages } from "../../store/messages";

const ChannelList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const channel = useSelector((state) => state.channelReducer);
    const server = Object.values(useSelector((state) => state.serverReducer))
    const user = useSelector((state) => state.session.user)
    const { serverId, channelId } = useParams()
    const [ isLoaded, setIsLoaded ] = useState(false)


  
    useEffect(() => {
        dispatch(getChannels(serverId))
        .then(() => {
            dispatch(getMessages(serverId, channelId))
        })
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getUserServers(user.id))
    //     .then(()=> {
    //         dispatch(getChannels(serverId))
    //     })
    //     .then(() => {
    //         dispatch(getMessages(serverId, channelId))
    //     })
    //     .then(() => setIsLoaded(true))
    // }, [dispatch])


    return (
        <div>test</div>
    )
}

export default ChannelList