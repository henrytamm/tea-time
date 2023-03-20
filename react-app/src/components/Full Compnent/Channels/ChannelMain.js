// import { useEffect, useState } from "react";
// import { NavLink, useHistory, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getChannels } from "../../store/channels";
// import { getOneServer } from "../../store/servers";

// const ChannelMain = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const { serverId } = useParams();
//   const user = useSelector((state) => state.session.user);
//   const server = useSelector((state) => state.serverReducer);
//   const channels = Object.values(useSelector((state) => state.channelReducer));

//     useEffect(() => {
//       dispatch(getChannels(serverId))
//     }, [dispatch]);

//   return (
//     <div className="channels-container">
//       <header className="channels-header">TEXT CHANNELS</header>
//       <div className="all-channels">
//         {channels.map((channel, i) => {
//           return (
//             <div className="channel-link-container" key={i}>
//               <NavLink
//                 className="channel-link"
//                 activeClassName="active"
//                 to={`/${serverId}/${channel.id}`}
//               >
//                 <div className="channel-name">{channel.name}</div>
//               </NavLink>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ChannelMain;
