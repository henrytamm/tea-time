import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserServers, getOneServer } from "../../../store/servers";
import { deleteChannel, getChannels } from "../../../store/channels";
import { useState } from "react";
import { deleteServer } from "../../../store/servers";
import OpenModalButton from "../../OpenModalButton";
import CreateChannelModal from "../../Modals/CreateChannelModal/CreateChannelModal";
import EditServerModal from "../../Modals/EditServerModal/EditServerModal";
import EditChannelModal from "../../Modals/EditChannelModal/EditChannelModal";
import ChannelCard from "./ChannelCard";

const ChannelList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.serverReducer);
  const channels = Object.values(useSelector((state) => state.channelReducer));
  const isOwner = user.id === server.ownerId;

  useEffect(() => {
    dispatch(getOneServer(serverId)).then(() => {
      dispatch(getChannels(serverId)).then(() => {
        setIsLoaded(true);
      });
    });
  }, [dispatch, serverId, channelId]);

  const deleteServerHandler = () => {
    const deleteConfirm = window.confirm(
      `Are you sure you want to delete this server?`
    );
    if (deleteConfirm) {
      dispatch(deleteServer(serverId));
      history.push(`/`);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleDropdownClick = () => {
    setShowModal(true);
  };

  return (
    <div className="channel-list-container">
      <header className="channel-list-header">
        TEXT CHANNELS
        {isOwner && (
          <div className="dropdown">
            <button className="dropdown-button" onClick={handleDropdownClick}>
              Add Channel
            </button>
            {showModal && (
              <CreateChannelModal
                closeModal={() => setShowModal(false)}
                serverId={serverId}
              />
            )}
          </div>
        )}
      </header>
      <div className="all-channels-list">
        {channels.map((channel) => {
          return <ChannelCard channel={channel} serverId={serverId} />;
        })}
      </div>
    </div>
  );
};

// return (
//   <div className="channels-container">
//     <header className="channels-header">TEXT CHANNELS</header>
//     <div className="all-channels">
//       {channels.map((channel, i) => {
//         return (
//           <div className="channel-link-container" key={i}>
//             <NavLink
//               className="channel-link"
//               to={`/${serverId}/${channel.id}`}
//             >
//               <div className="channel-name">{channel.name}</div>
//             </NavLink>
//             {isOwner && <div className="edit-channel-btn">
//                <OpenModalButton
//                buttonText={"Edit Channel"}
//                modalComponent={<EditChannelModal channel={channel}/>}
//                />
//                </div>}
//           </div>
//           );
//         })}
//         <div>
//           <OpenModalButton
//           buttonText={"Create Channel"}
//           modalComponent={<CreateChannelModal />}
//           />
//         </div>

//         <div>
//           <OpenModalButton
//           buttonText={"Edit Server"}
//           modalComponent={<EditServerModal />}
//           />
//         </div>
// <button onClick={deleteServerHandler}>
//   Delete Server
// </button>

//       </div>
//         <button onClick={deleteChannelHandler}>
//           Delete Channel
//         </button>
//     </div>
//   );
// };

export default ChannelList;
