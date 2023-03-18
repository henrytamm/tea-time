import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getServers } from "../../store/servers";

function Homepage(servers) {
    const dispatch = useDispatch();
    const server = useSelector((state) => state.serverReducer);
    const serverArr = server ? Object.values(server) : null;

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    console.log('server name', serverArr[0].name)

    return (
        <>
        <div>
            <h1> test {server.name}</h1>
        </div>
        </>
    )
}

export default Homepage