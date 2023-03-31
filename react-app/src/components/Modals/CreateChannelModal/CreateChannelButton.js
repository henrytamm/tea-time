import { useState } from "react";
import CreateChannelModal from "./CreateChannelModal";

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
      <button onClick={handleButtonClick}>Create a Channel</button>
      {showModal && <CreateChannelModal closeModal={handleCloseModal} />}
    </>
  );
};

export default CreateChannelButton;
