import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { joinServer } from "../../store/servers";
import "./ServerCard.css";

const ServerCard = ({ server }) => {
  const [showButton, setShowButton] = useState(false);
  const servers = Object.values(
    useSelector((state) => state.allServerReducer.servers)
  );
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const mouseEnter = (e) => {
    setShowButton(true);
  };

  const mouseLeave = (e) => {
    setShowButton(false);
  };

  const handleJoinServer = (e) => {
    e.preventDefault();
    if (server.id) {
      dispatch(joinServer(server.id)).then(() => {
        history.push(`${server.id}/`);
      });
    }
  };

  const isMember = server.members.some((member) => member.userId === currentUser.id);

  return (
    <>
      <div
        className="server-card"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <div className="server-card-cover">
          {server.serverImg ? (
            <img src={server.serverImg} className="server-card-cover-img" />
          ) : (
            <div className="server-card-cover-placeholder">
              {server.name.trim()[0]}
            </div>
          )}
        </div>
        <div className="server-card-info">
          <div className="server-card-icon">
            {server.serverImg ? (
              <img src={server.serverImg} className="server-card-icon-img" />
            ) : (
              <div className="server-card-icon-placeholder">
                {server.name.trim()[0]}
              </div>
            )}
          </div>
          <div className="server-card-details">
            <div className="server-card-title">{server.name}</div>
            <div className="server-card-members">
              Members: {server.members.length}
            </div>
          </div>
          <div className="server-card-join">
            {showButton && (
              <div className="server-card-join">
                {isMember ? (
                  <div className="server-card-joined">Joined</div>
                ) : (
                  <button
                    className="server-card-join-button"
                    onClick={handleJoinServer}
                  >
                    Join
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerCard;

