import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserServers, getOneServer } from "../../../store/servers";
import { getChannels } from "../../../store/channels"
import { useState } from "react";
import { getMessages } from "../../../store/messages";
import OpenModalButton from "../../OpenModalButton";
import CreateChannelModal from "../../Modals/CreateChannelModal/CreateChannelModal";

const ChannelList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();
  const [ isLoaded, setIsLoaded ] = useState(false)
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.serverReducer);
  const channels = Object.values(useSelector((state) => state.channelReducer));

  useEffect(() => {
    dispatch(getOneServer(serverId))
    .then(() => {
      dispatch(getChannels(serverId))
    })
  }, [dispatch, serverId, channelId]);




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
    <div className="channels-container">
      <header className="channels-header">TEXT CHANNELS</header>
      <div className="all-channels">
        {channels.map((channel, i) => {
          return (
            <div className="channel-link-container" key={i}>
              <NavLink
                className="channel-link"
                to={`/${serverId}/${channel.id}`}
              >
                <div className="channel-name">{channel.name}</div>
              </NavLink>
            </div>
          );
        })}
        <div>
          <OpenModalButton
          buttonText={"Create Channel"}
          modalComponent={<CreateChannelModal />}
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
