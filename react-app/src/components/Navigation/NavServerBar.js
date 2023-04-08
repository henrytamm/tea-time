import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserServers, getOneServer } from "../../store/servers";
import CreateServerModal from "../Modals/CreateServerModal/CreateServerModal";
import OpenModalButton from "../OpenModalButton";
import ContextMenu from "../Menu/ContextMenu";
import ServerIcon from "./ServerIcon";
import "./NavServerBar.css";
import { logout } from "../../store/session";
import AllServers from "../AllServers/AllServers";

function NavServerBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.serverReducer.servers);
  const serverArr = servers ? Object.values(servers) : null;
  const channels = Object.values(useSelector((state) => state.channelReducer))
  
  useEffect(() => {
    if (user) {
      dispatch(getUserServers(user.id));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    history.push("/");
    dispatch(logout());
  };

  const toServers = () => {
    history.push("/servers")
  }

  return (
    <>
      <div className="nav-bar-container">
        <ul className="server-list">
          {serverArr &&
            serverArr.map((server) => (
              <li key={server.id}>
                {/* <NavLink to={`/${server.id}`}> */}
                <NavLink to={`/${server.id}`}>
                  {server.name && <ServerIcon server={server} />}
                </NavLink>
              </li>
            ))}

          <div className="open-modal-button">
            <OpenModalButton
              className="actual-button"
              buttonText={<i class="fa-solid fa-plus fa-2x"></i>}
              modalComponent={<CreateServerModal />}
            />
          </div>

          <div className="all-servers-button-nav" onClick={toServers}>
          <i class="fa-regular fa-compass"></i>
          </div>

        </ul>
        <div className="logout-button" onClick={handleLogout}>
          <i class="fa-solid fa-right-from-bracket logout-icon"></i>
        </div>
      </div>
    </>
  );
}

export default NavServerBar;
