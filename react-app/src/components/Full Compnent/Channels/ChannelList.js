import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserServers, getOneServer } from "../../../store/servers";
import { deleteChannel, getChannels } from "../../../store/channels";
import { useState } from "react";
import { deleteServer } from "../../../store/servers";
import ChannelCard from "./ChannelCard";
import "./ChannelList.css";
import EditServerModal from "../../Modals/EditServerModal/EditServerModal";
import CreateChannelButton from "../../Modals/CreateChannelModal/CreateChannelButton";

const ChannelList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.serverReducer);
  const serverOwner = useSelector((state) => state.serverReducer.server);
  const channels = Object.values(useSelector((state) => state.channelReducer));
  const isOwner = user.id === serverOwner?.ownerId;

  const [showEditServerModal, setShowEditServerModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(getUserServers(serverId)).then(() => {
      dispatch(getOneServer(serverId)).then(() => {
        dispatch(getChannels(serverId)).then(() => {
          setIsLoaded(true);
        });
      });
    });
  }, [dispatch, serverId, channelId]);


  const handleDropdownClick = () => {
    setShowMenu(prevState => !prevState);
  };

  const handleEditServerClick = () => {
    setShowEditServerModal(true);
  };

  const handleDeleteServerClick = () => {
    const deleteConfirm = window.confirm(
      `Are you sure you want to delete this server?`
    );
    if (deleteConfirm) {
      dispatch(deleteServer(serverId));
      history.push(`/`);
    }
  };

  return (
    <div className="channel-list-container">
      <div className="channel-list-server-name">
        {serverOwner?.name}
        {isOwner && (
          <div className="dropdown">
            <button className="dropdown-button" onClick={handleDropdownClick}>
              <i class="fa-solid fa-angle-down"></i>
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleEditServerClick}>
                  Edit Server
                  {showEditServerModal && (
                    <EditServerModal
                      serverId={serverId}
                      closeModal={() => setShowEditServerModal(false)}
                    />
                  )}
                </div>
                <div
                  className="dropdown-item"
                  onClick={handleDeleteServerClick}
                >
                  Delete Server
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <header className="channel-list-header">
        TEXT CHANNELS
        {isOwner && <CreateChannelButton />}
      </header>
      <div className="all-channels-list">
        {channels.map((channel) => {
          return <ChannelCard channel={channel} serverId={serverId} />;
        })}
      </div>
    </div>
  );
};

export default ChannelList;
