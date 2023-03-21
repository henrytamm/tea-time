import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getServers, getUserServers } from "../../store/servers";
import { getChannels } from "../../store/channels";
import CreateServerModal from "../Modals/CreateServerModal/CreateServerModal";
import OpenModalButton from "../OpenModalButton";

function NavServerBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.serverReducer);
  const channel = useSelector((state) => state.channelReducer)
  const serverArr = server ? Object.values(server) : null;


  useEffect(() => {
    dispatch(getUserServers(user.id));
  }, [dispatch]);

  return (
    <>
      <div className="nav-bar-container">
        <ul className="server-list">
          {serverArr.map((server) => {
            return (
                <li>
              <NavLink to={`/${server.id}`}>
                {server.name}
              </NavLink>
                </li>
            );
          })}
        </ul>
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
