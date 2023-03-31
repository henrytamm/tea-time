import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editServer } from "../../../store/servers";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";

const EditServerModal = ({ serverId }) => {
  //rendered in NavServerBar most likely*
  const [name, setName] = useState("");
  const [serverImg, setServerImg] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const server = useSelector((state) => state.serverReducer);
  // console.log(server)


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

  return (
    <div className="edit-server-modal">
      <div className="edit-server-modal-body">
        <header>Edit Server</header>
        <form onSubmit={handleSubmit}>
          <div className="modal-input-container">
            <label>Server Name </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="modal-input-container">
            <label>Server Image </label>
            <input
              type="text"
              name="image"
              value={serverImg}
              onChange={(e) => setServerImg(e.target.value)}
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

export default EditServerModal;
