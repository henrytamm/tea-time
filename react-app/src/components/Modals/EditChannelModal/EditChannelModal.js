import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { editChannel, getOneChannel } from "../../../store/channels";
import { useSelector } from "react-redux";

import "./EditChannelModal.css";

const EditChannelModal = ({ channel }) => {
  const [name, setName] = useState(channel.name);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { serverId, channelId } = useParams();
  const server = useSelector((state) => state.serverReducer);
  const serverOwner = useSelector((state) => state.serverReducer.server)
  const channels = useSelector((state) => state.channelReducer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
    };
    dispatch(editChannel(serverOwner.id, channel.id, payload));
    closeModal();
  };

  return (
    <div className="edit-channel-modal-container">
      <div className="edit-channel-modal">
        <header className="edit-channel-modal-header">Edit Channel Details</header>
        <form onSubmit={handleSubmit}>
          <div className="edit-channel-modal-input-container">
            <label className="edit-channel-modal-label">Channel Name</label>
            <input
              className="edit-channel-modal-input"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="edit-channel-modal-button-container">
            <button className="edit-channel-modal-cancel-button" type="button" onClick={closeModal}>Cancel</button>
            <button className="edit-channel-modal-submit-button" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChannelModal;
