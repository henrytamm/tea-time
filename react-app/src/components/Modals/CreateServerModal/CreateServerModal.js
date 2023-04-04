import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createServer, getUserServers } from "../../../store/servers";
import { useModal } from "../../../context/Modal";
import UploadImage from "./UploadImage";
import "./CreateServerModal.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const CreateServerModal = () => {
  //rendered in NavServerBar*
  const history = useHistory()
  const [name, setName] = useState("");
  const [serverImg, setServerImg] = useState("");
  const [createdServerUrl, setCreatedServerUrl] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.serverReducer.servers)


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     name: name,
  //     server_img: serverImg,
  //   };

  //   await dispatch(createServer(payload));
  //   dispatch(getUserServers(user.id))
  //   closeModal();
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    name: name,
    server_img: serverImg,
  };

  await dispatch(createServer(payload));

  // Get the updated list of servers
  await dispatch(getUserServers(user.id));

  // Sort the server ids in descending order
  const sortedServerIds = Object.keys(servers).sort((a, b) => b - a);

  // Get the id of the last created server
  const lastServerId = sortedServerIds[0];

  if (lastServerId) {
    setCreatedServerUrl(`${lastServerId}`);
    history.push(`${lastServerId}`);
    closeModal();
  } else {
    console.error("Unable to get the ID of the last created server");
  }
};

  const handleCancel = () => {
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="create-server-modal">
      <div className="create-server-modal-body">
        <header className="server-header">Customize your server</header>
        <h3 className="server-description">
          Give your new server a personality with a name and an icon. You an
          always change it later.
        </h3>
        <div className="uploaded-image">
          <UploadImage setServerImg={setServerImg} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-input-container">
            <label className="modal-server-name-text">Server Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <div className="modal-button-container">
            <button className="back-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="submit-button" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerModal;
