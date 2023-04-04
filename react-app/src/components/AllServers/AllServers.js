// // import { useSelector, useDispatch } from "react-redux";
// // import { useEffect, useState } from "react";
// // import { getEveryServer } from "../../store/allServers";
// // import "./AllServers.css";
// // import ServerCard from "./ServerCard";

// // const AllServers = () => {
// //   const [isLoaded, setIsLoaded] = useState(false);
// //   const servers = Object.values(useSelector((state) => state.allServerReducer.servers));
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(getEveryServer())
// //       .then((res) => {
// //         setIsLoaded(true);
// //       });
// //   }, [dispatch]);

// //   return (
// //     <div className="all-servers-page">
// //       <div className="all-servers-header">
// //         <h1 className="all-servers-title">Find a community for you!</h1>
// //       </div>
// //       <div className="all-servers-list">
// //         {isLoaded &&
// //           servers.map((server) => {
// //             return (
// //               <ServerCard key={server.id} server={server} />
// //             );
// //           })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllServers;

// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { getEveryServer } from "../../store/allServers";
// import "./AllServers.css";
// import ServerCard from "./ServerCard";
// import { useModal } from "../../context/Modal";
// import CreateServerModal from "../Modals/CreateServerModal/CreateServerModal";

// const AllServers = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const servers = Object.values(useSelector((state) => state.allServerReducer.servers));
//   const dispatch = useDispatch();
//   const { openModal } = useModal();

//   useEffect(() => {
//     dispatch(getEveryServer())
//       .then((res) => {
//         setIsLoaded(true);
//       });
//   }, [dispatch]);

//   return (
//     <div className="all-servers-page">
//       <div className="all-servers-header">
//         <h1 className="all-servers-title">Find a community for you!</h1>
//         <button className="create-server-button" onClick={() => openModal(CreateServerModal)}>Create a server</button>
//       </div>
//       <div className="all-servers-list">
//         {isLoaded &&
//           servers.map((server) => {
//             return (
//               <ServerCard key={server.id} server={server} />
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default AllServers;

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getEveryServer } from "../../store/allServers";
import "./AllServers.css";
import ServerCard from "./ServerCard";
import { useModal } from "../../context/Modal";
import CreateServerModal from "../Modals/CreateServerModal/CreateServerModal";

const AllServers = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const servers = Object.values(
    useSelector((state) => state.allServerReducer.servers)
  );
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    dispatch(getEveryServer()).then((res) => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  const handleCreateServer = () => {
    openModal(<CreateServerModal closeModal={closeModal} />);
  };

  return (
    <div className="all-servers-page">
      <div className="all-servers-header">
        <h1 className="all-servers-title">Find a community for you!</h1>
        {/* <h2 className="all-servers-create">Can't find what you're looking for? Create your own!
        <button onClick={handleCreateServer}>Create Server</button>
        </h2> */}
        <h2 className="all-servers-create">
          Can't find what you're looking for?{" "}
          <a href="#" className="create-server-link" onClick={handleCreateServer}>
            Create your own!
          </a>
        </h2>
      </div>
      <div className="all-servers-list">
        {isLoaded &&
          servers.map((server) => {
            return <ServerCard key={server.id} server={server} />;
          })}
      </div>
    </div>
  );
};

export default AllServers;
