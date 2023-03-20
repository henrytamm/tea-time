import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createServer } from "../../../store/servers";
import { useModal } from "../../../context/Modal";

const CreateServerModal = () => {
    const [name, setName] = useState("");
    const [serverImg, setServerImg] = useState("");
    const dispatch = useDispatch();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      server_img: serverImg,
    };

    await dispatch(createServer(payload));
  };

  return (
    <div className="create-server-modal">
      <div className="create-server-modal-content">
        <h2>Create a Server</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Server Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Server Image</label>
            <input
              type="text"
              name="image"
              value={serverImg}
              onChange={(e) => setServerImg(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerModal;
