import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { editChannel, getOneChannel } from "../../../store/channels";
import { useSelector } from "react-redux";

const EditChannelModal = ({channel}) => {
  //rendered in full component channels most likely*
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { serverId, channelId } = useParams();
  const server = useSelector((state) => state.serverReducer);
  const channels = useSelector((state) => state.channelReducer);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
    };
    dispatch(editChannel(server.id, channel.id, payload));
    closeModal();
    console.log('serverId', serverId)
    console.log('server.id', server.id)
    console.log('channelId', channelId)
    console.log('channel.id', channel.id)
    console.log('channel state', channel)
  };


  return (
    <div className="edit-channel-modal">
      <div className="edit-channel-modal-body">
        <header>Edit Channel Details</header>
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
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChannelModal;
