import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editServer } from "../../../store/servers";
import { useModal } from "../../../context/Modal";
import UploadImage from "../CreateServerModal/UploadImage";
import "./EditServerModal.css";

const EditServerModal = ({ serverId, closeModal }) => {
  const server = useSelector((state) => state.serverReducer.server)
  const [name, setName] = useState(server.name);
  const [serverImg, setServerImg] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", name);

    if (serverImg) payload.append("image", serverImg);

    await dispatch(editServer(payload, serverId));
    window.location.reload();
    closeModal();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     name: name,
  //     server_img: serverImg,
  //   };

  //   await dispatch(editServer(serverId, payload));
  // window.location.reload();
  // closeModal();
  // };

  const handleCancel = () => {
    closeModal();
  };


  const updateFile = (e) => {
    const file = e.target.files[0];
    setServerImg(file);
  };

return (
  <div className="edit-server-modal">
    <div className="edit-server-modal-body">
      <header className="edit-server-modal-header">
        Edit server details
      </header>
      <form onSubmit={handleSubmit}>
        <div className="edit-server-modal-input-container">
          <label
            htmlFor="file"
            className="edit-server-modal-server-image-text"
          >
            Server Image
          </label>
          <div className="edit-server-modal-image-container">
            <label htmlFor="file" className="edit-server-modal-image-label">
              {!serverImg && (
                <i className="fa-solid fa-camera edit-server-modal-camera-icon 3x"></i>
              )}
              {serverImg && (
                <img
                  className="edit-server-modal-photo"
                  src={URL.createObjectURL(serverImg)}
                />
              )}
              <input
                id="file"
                type="file"
                className="edit-server-modal-input"
                onChange={updateFile}
                accept="image/*"
              />
            </label>
          </div>
        </div>
        <div className="edit-server-modal-input-container">
          <label className="edit-server-modal-server-name-text">
            Server Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="edit-server-modal-button-container">
          <button
            className="edit-server-modal-back-button"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="edit-server-modal-submit-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default EditServerModal;
