import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserServers, getOneServer } from "../../../store/servers";
import { deleteChannel, getChannels } from "../../../store/channels";
import { useState } from "react";
import { deleteServer } from "../../../store/servers";
import EditChannelModal from "../../Modals/EditChannelModal/EditChannelModal";
import OpenModalButton from "../../OpenModalButton";
import CreateChannelModal from "../../Modals/CreateChannelModal/CreateChannelModal";
import "./ChannelCard.css";

const ChannelCard = ({ channel, serverId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const channels = Object.values(useSelector((state) => state.channelReducer));
  const server = useSelector((state) => state.serverReducer);

  const isOwner = user.id === server.ownerId;

  const deleteChannelHandler = () => {
    const deleteConfirm = window.confirm(
      `Are you sure you want to delete this channel?`
    );
    if (deleteConfirm) {
      dispatch(deleteChannel(serverId, channel.id)).then(() => {
        history.push(`/${serverId}`);
      });
    }
  };

  const deleteServerHandler = () => {
    const deleteConfirm = window.confirm(
      `Are you sure you want to delete this server?`
    );
    if (deleteConfirm) {
      dispatch(deleteServer(serverId));
      history.push(`/`);
    }
  };

  return (
    <div className="header">
      <NavLink className="channel-card-main" to={`/${serverId}/${channel.id}/`}>
        <div className="channel-names">
          <li className="channel-card-name">
            {"#"}
            {channel.name}
          </li>
          {isOwner && (
            <div className="edit-channel-btn">
              <OpenModalButton
                buttonText="Edit Channel"
                modalComponent={<EditChannelModal channel={channel} />}
              />
            </div>
          )}
          {isOwner && (
            <button
              className="delete-channel-btn"
              onClick={deleteChannelHandler}
            >
              Delete Channel
            </button>
          )}
        </div>
      </NavLink>
      {isOwner && (
        // <div className="create-channel-btn">
        //   <OpenModalButton
        //     buttonText="Create Channel"
        //     modalComponent={<CreateChannelModal />}
        //   />
      <button onClick={deleteServerHandler}>Delete Server</button>
        // </div>
      )}
    </div>
  );
};

export default ChannelCard;
