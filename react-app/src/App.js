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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginFormModal from "./components/LoginFormModal";
import SignUpForm from "./components/SignupFormModal";

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
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <ProtectedRoute exact path="/servers">
            <AllServers />
          </ProtectedRoute>
          <ProtectedRoute exact path="/:serverId">
            <ServerTab />
          </ProtectedRoute>
          <ProtectedRoute exact path="/:serverId/:channelId?">
            <ServerTab />
          </ProtectedRoute>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
