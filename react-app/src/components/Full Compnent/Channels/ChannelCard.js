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
  const server = useSelector((state) => state.serverReducer.servers);
  const serverOwner = useSelector((state) => state.serverReducer.server);

  const isOwner = user.id === serverOwner.ownerId;

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

  return (
    <div className="header">
  <NavLink className="channel-card-main" to={`/${serverId}/${channel.id}/`}>
    <div className="channel-names">
      <div className="channel-card-name-container">
        <li className="channel-card-name">
          {"#"}
          {channel.name}
        </li>
        {isOwner && (
          <div className="edit-channel-btn">
            <OpenModalButton
              buttonText={<i class="fa-solid fa-pencil" style={{color: "grey"}}></i>}
              modalComponent={<EditChannelModal channel={channel} />}
            />
          </div>
        )}
      </div>
      {isOwner && (
        <button
          className="delete-channel-btn"
          onClick={deleteChannelHandler}
        >
          <i class="fa-solid fa-trash-can" style={{ color: "grey" }}></i>
        </button>
      )}
    </div>
  </NavLink>
</div>
  );
};

export default ChannelCard;
