import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createServer, getUserServers } from "../../../store/servers";
import { useModal } from "../../../context/Modal";
import UploadImage from "./UploadImage";
import "./CreateServerModal.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CreateServerModal = () => {
  //rendered in NavServerBar*
  const history = useHistory();
  const [name, setName] = useState("");
  const [serverImg, setServerImg] = useState("");
  const [createdServerUrl, setCreatedServerUrl] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.serverReducer.servers);
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", name);

    if (serverImg) payload.append("image", serverImg);

    const createdServer = await dispatch(createServer(payload));
    console.log('createdserver', createdServer)
    history.push(`/${createdServer.id}`);
    closeModal()
    // Sort the server ids in descending order
    // const sortedServerIds = Object.keys(servers).sort((a, b) => b - a);

    // // Get the id of the last created server
    // const lastServerId = sortedServerIds[0];

    // if (lastServerId) {
    //   setCreatedServerUrl(`${lastServerId}`);
    //   history.push(`${lastServerId}`);
    //   closeModal();
    // } else {
    //   console.error("Unable to get the ID of the last created server");
    // }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    setServerImg(file);
  };

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     name: name,
  //     server_img: serverImg,
  //   };

  //   await dispatch(createServer(payload));

  //   // Get the updated list of servers
  //   await dispatch(getUserServers(user.id));

  //   // Sort the server ids in descending order
  //   const sortedServerIds = Object.keys(servers).sort((a, b) => b - a);

  //   // Get the id of the last created server
  //   const lastServerId = sortedServerIds[0];

  //   if (lastServerId) {
  //     setCreatedServerUrl(`${lastServerId}`);
  //     history.push(`${lastServerId}`);
  //     closeModal();
  //   } else {
  //     console.error("Unable to get the ID of the last created server");
  //   }
  // };

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
        <header className="create-server-modal-header">
          Customize your server
        </header>
        <h3 className="create-server-modal-description">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="create-server-modal-input-container">
            <label
              htmlFor="file"
              className="create-server-modal-server-name-text"
            >
              Server Image
            </label>
            <div className="create-server-modal-image-container">
              <label htmlFor="file" className="create-server-modal-image-label">
                {!serverImg && (
                  <i className="fa-solid fa-camera create-server-modal-camera-icon 3x"></i>
                )}
                {serverImg && (
                  <img
                    className="create-server-modal-photo"
                    src={URL.createObjectURL(serverImg)}
                  />
                )}
                <input
                  id="file"
                  type="file"
                  className="create-server-modal-input"
                  onChange={updateFile}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <div className="create-server-modal-input-container">
            <label className="create-server-modal-server-name-text">
              Server Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <div className="create-server-modal-button-container">
            <button
              className="create-server-modal-back-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="create-server-modal-submit-button" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerModal;
