import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserServers } from "../../store/servers";
import CreateServerModal from "../Modals/CreateServerModal/CreateServerModal";
import OpenModalButton from "../OpenModalButton";
import ContextMenu from "../Menu/ContextMenu";

function NavServerBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.serverReducer);
  const serverArr = servers ? Object.values(servers) : null;

  const [clickedServerId, setClickedServerId] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleServerClick = (e, serverId) => {
    e.preventDefault();
    setClickedServerId(serverId);
    // console.log(serverId)
    setShowContextMenu(true);
  };

  const handleEditServer = (serverId) => {
    setClickedServerId(serverId);
    setShowContextMenu(true);
  };

  useEffect(() => {
    if (user) {
      dispatch(getUserServers(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="nav-bar-container">
        <ul className="server-list">
          {serverArr &&
            serverArr.map((server) => {
              return (
                <li key={server.id}>
                  <NavLink
                    to={`/${server.id}`}
                    onContextMenu={(e) => {
                      handleServerClick(e, server.id);
                      setCoordinates({ x: e.pageX, y: e.pageY });
                    }}
                  >
                    {server.name}
                  </NavLink>
                </li>
              );
            })}
        </ul>
        {showContextMenu && clickedServerId !== null && (
          <ContextMenu
            serverId={clickedServerId}
            setShowContextMenu={setShowContextMenu}
            handleEditServer={handleEditServer}
            contextedServerId={clickedServerId}
            top={coordinates.y}
            left={coordinates.x}
          />
        )}

        <div>
          <OpenModalButton
            buttonText={"Create Server"}
            modalComponent={<CreateServerModal />}
          />
        </div>
      </div>
    </>
  );
}

export default NavServerBar;
