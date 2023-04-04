import NavServerBar from "../../Navigation/NavServerBar";
import ChannelList from "../Channels/ChannelList"
import "./ServerTab.css";

const ServerTab = () => {

    return (
        <div className="server-tab-container">
            <div className="nav-server-bar-main">
                <NavServerBar />
            </div>
            <div className="channel-list-main">
                <ChannelList />
            </div>
        </div>
    )
}

export default ServerTab;
