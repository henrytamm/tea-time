// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { createServer } from "../../../store/servers";
// import { useModal } from "../../../context/Modal";
// import UploadImage from "./UploadImage";
// import "./CreateServerModal.css"

// const CreateServerModal = () => {
//   //rendered in NavServerBar*
//   const [name, setName] = useState("");
//   const [serverImg, setServerImg] = useState("");
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       name: name,
//       server_img: serverImg,
//     };

//     await dispatch(createServer(payload));
//     closeModal();
//   };

//   const handleCancel = () => {
//     closeModal();
//   };

//   return (
//     <div className="create-server-modal">
//       <div className="create-server-modal-body">
//         <header className="server-header">Customize your server</header>
//         <h3 className="server-description">Give your new server a personality with a name and an icon. You an always change it later.</h3>
//         <div className="uploaded-image">
//           <UploadImage setServerImg={setServerImg} />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="modal-input-container">
//             <label className="modal-server-name-text">Server Name</label>
//             <input
//               type="text"
//               name="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="modal-button-container">
//           <button className="back-button" onClick={handleCancel}>Cancel</button>
//           <button className="submit-button" type="submit">Create</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateServerModal;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createServer } from "../../../store/servers";
import { useModal } from "../../../context/Modal";
import UploadImage from "./UploadImage";
import "./CreateServerModal.css"

const CreateServerModal = () => {
  //rendered in NavServerBar*
  const [name, setName] = useState("");
  const [serverImg, setServerImg] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: name,
      server_img: serverImg,
    };

    await dispatch(createServer(payload));
    closeModal();
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
        <h3 className="server-description">Give your new server a personality with a name and an icon. You an always change it later.</h3>
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
            <button className="back-button" onClick={handleCancel}>Cancel</button>
            <button className="submit-button" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerModal;

