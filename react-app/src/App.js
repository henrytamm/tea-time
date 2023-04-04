import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage/Homepage"
import ChannelList from "./components/Full Compnent/Channels/ChannelList";
import MessageList from "./components/Full Compnent/Chatbox/MessageList";
import NavServerBar from "./components/Navigation/NavServerBar";
import ServerTab from "./components/Full Compnent/Server/ServerTab";
import AllServers from "./components/AllServers/AllServers";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/servers">
            <AllServers />
          </Route>
          <Route exact path="/:serverId">
            <ServerTab />
          </Route>
          <Route exact path="/:serverId/:channelId?">
            <ServerTab />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
