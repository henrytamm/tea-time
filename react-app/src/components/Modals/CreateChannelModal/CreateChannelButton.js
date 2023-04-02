import { useState } from "react";
import CreateChannelModal from "./CreateChannelModal";
import "./CreateChannelButton.css"

const CreateChannelButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleButtonClick} className="create-channel-btn"><i class="fa-solid fa-plus"></i></button>
      {showModal && <CreateChannelModal closeModal={handleCloseModal} />}
    </>
  );
};

export default CreateChannelButton;
