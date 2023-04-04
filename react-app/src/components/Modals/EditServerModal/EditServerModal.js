import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editServer } from "../../../store/servers";
import { useModal } from "../../../context/Modal";
import UploadImage from "../CreateServerModal/UploadImage";
import "./EditServerModal.css";

const EditServerModal = ({ serverId, closeModal }) => {
  const [name, setName] = useState("");
  const [serverImg, setServerImg] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      server_img: serverImg,
    };

    await dispatch(editServer(serverId, payload));
    window.location.reload();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  

  return (
    <div className="edit-server-modal">
      <div className="edit-server-modal-body">
        <div className="edit-server-image">
          <label className="edit-server-image-label">Server Image </label>
          <UploadImage setServerImg={setServerImg} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="edit-server-name">
            <label>Server Name </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="edit-server-save-btn">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServerModal;
