const GET_SERVERS = "servers/GET_SERVERS"
const GET_ONE_SERVER = "servers/GET_ONE_SERVER"
const GET_USER_SERVERS = "servers/GET_USER_SERVERS"
const CREATE_SERVER = "servers/CREATE_SERVER"
const EDIT_SERVER = "servers/EDIT_SERVER"
const DELETE_SERVER = "servers/DELETE_SERVER"


const getServersAction = (servers) => ({
    type: GET_SERVERS,
    servers
})

const getOneServerAction = (server) => ({
    type: GET_ONE_SERVER,
    server
})

const getUserServersAction = (servers) => ({
    type: GET_USER_SERVERS,
    servers
})

const createServerAction = (server) => ({
    type: CREATE_SERVER,
    server
})

const editServerAction = (server) => ({
    type: EDIT_SERVER,
    server
})

const deleteServerAction = (server) => ({
    type: DELETE_SERVER,
    server
})

export const getServers = () => async (dispatch) => {
    const res = await fetch("/api/servers");
    if (res.ok) {
        const server = await res.json();
        dispatch(getServersAction(server))
        return server
    }
}

export const getOneServer = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`);
    if (res.ok) {
        const server = await res.json();
        dispatch(getOneServerAction(server))
        return server
    }
}

export const getUserServers = (userId) => async (dispatch) => {
    const res = await fetch (`/api/users/${userId}/servers`)
    if (res.ok) {
        const userServers = await res.json();
        dispatch(getUserServersAction(userServers))
        return userServers
    }
}

export const createServer = (payload) => async (dispatch) => {
    const res = await fetch (`/api/servers/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const server = await res.json();
        dispatch(createServerAction(server))
    }
    return res
}

export const editServer = (serverId, payload) => async (dispatch) => {
    const res = await fetch (`/api/servers/${serverId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const server = await res.json();
        dispatch(editServerAction(server))
        return server
    }
    return res
}

export const deleteServer = (serverId) => async (dispatch) => {
    const res = await fetch (`/api/servers/${serverId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteServerAction)
    }
}

const initialState = {};

export const serverReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SERVERS: {
            action.servers.forEach((el) => {
                newState[el.id] = el
            });
            return newState;
        }

        case GET_ONE_SERVER: {
            return {...action.server}
        }

        case GET_USER_SERVERS: {
            return {...newState, ...action.servers}
        }

        case CREATE_SERVER: {
            newState[action.server.id] = action.server;
            return newState
        }

        case DELETE_SERVER: {
            delete newState[action.server]
            return newState;
        }

        case EDIT_SERVER: {
            newState[action.server.id] = action.server;
            return newState
        }

        default: {
            return state;
        }
    }
}