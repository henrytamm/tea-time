import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createChannel } from "../../../store/channels";
import { useSelector } from "react-redux";
import "./CreateChannelModal.css";

const CreateChannelModal = ({ closeModal }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const server = useSelector((state) => state.serverReducer.server);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      server_id: server.id,
      name: name,
    };

    await dispatch(createChannel(server.id, payload));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="create-channel-modal">
      <div className="create-channel-modal-body">
        <header>Create a Channel</header>
        <form onSubmit={handleSubmit}>
          <div className="modal-input-container">
            <label>Channel Name</label>
            <input
              className="create-channel-input"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="modal-button-container">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;
