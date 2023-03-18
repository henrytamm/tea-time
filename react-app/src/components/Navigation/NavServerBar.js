import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getServers, getUserServers } from "../../store/servers";

function NavServerBar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const server = useSelector((state) => state.serverReducer)
    const serverArr = server ? Object.values(server) : null;

    useEffect(() => {
        dispatch(getUserServers(user.id))
    }, [dispatch])

    return (
        <div>
            {serverArr.map((server) => {
                return (
                    <div>
                        {server.name}
                    </div>
                )
            })}
        </div>
    )
}

export default NavServerBar