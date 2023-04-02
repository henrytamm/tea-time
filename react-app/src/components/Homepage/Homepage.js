import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import NavServerBar from "../Navigation/NavServerBar";
import { getServers, getUserServers } from "../../store/servers";
import { getChannels } from "../../store/channels";

function Homepage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const server = useSelector((state) => state.serverReducer);
    const serverArr = server ? Object.values(server) : null;

    // useEffect(() => {
    //     dispatch(getUserServers(user.id))
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(getServers)
    // }, [dispatch])

  

    return (
        <>
        <div>
            {user &&
            <NavServerBar />
            }
        </div>
        </>
    )
}

export default Homepage