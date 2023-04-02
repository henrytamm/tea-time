import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createChannel } from "../../../store/channels";
import { useSelector } from "react-redux";

const CreateChannelModal = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { serverId } = useParams();
  const [showModal, setShowModal] = useState(false)
  const server = useSelector((state) => state.serverReducer.server)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        server_id: server.id,
        name: name,
    };

    await dispatch(createChannel(server.id, payload));
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
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="modal-button-container">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;

