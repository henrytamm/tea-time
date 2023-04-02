import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditServerModal from "../Modals/EditServerModal/EditServerModal";
import { deleteServer } from "../../store/servers";
import { useModal } from "../../context/Modal";
import "./ContextMenu.css";

const ContextMenu = ({
  serverId,
  setShowContextMenu,
  handleEditServer,
  top,
  left,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contextSelectedAction, setContextSelectedAction] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditClick = () => {
    setShowContextMenu(true);
    setIsEditModalOpen(true);
    setContextSelectedAction("Edit");
    handleEditServer(serverId);
  };

  const handleDeleteClick = () => {
    const deleteConfirm = window.confirm(
      `Are you sure you want to delete this server?`
    );
    if (deleteConfirm) {
      dispatch(deleteServer(serverId));
      history.push(`/`);
      setShowContextMenu(false);
      window.location.reload();
    }
    setShowContextMenu(false);
  };

  const handleClose = () => {
    setContextSelectedAction("");
    setShowContextMenu(false);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="context-menu" style={{ top, left }}>
        <ul className="context-menu-dropdown">
          {!isEditModalOpen && (
            <li onClick={handleEditClick}>Edit</li>
          )}
          {isEditModalOpen && (
            <EditServerModal serverId={serverId} handleClose={handleClose} />
          )}
          <li onClick={handleDeleteClick}>Delete</li>
        </ul>
      </div>
    </>
  );
};

export default ContextMenu;

