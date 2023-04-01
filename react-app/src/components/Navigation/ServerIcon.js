import "./ServerIcon.css";

const ServerIcon = ({ server }) => {
  const serverTag = server.name.split(" ").map((word) => word[0]);
  return (
    <>
      <div className="image-circle">
        {server.serverImg ? (
          <div className="server-icon-container">
            <div></div>
            <img src={server.serverImg} className="server-icon" />
          </div>
        ) : (
          <div className={`default-icon ${server.id}`}>{serverTag.join("")}</div>
        )}
      </div>
    </>
  );
};

export default ServerIcon;
