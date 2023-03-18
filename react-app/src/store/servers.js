const GET_SERVERS = "servers/GET_SERVERS"
const GET_ONE_SERVER = "servers/GET_ONE_SERVER"
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

const initialState = {};

export const serverReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SERVERS: {
            action.servers.servers.forEach((el) => {
                newState[el.id] = el
            });
            return newState;
        }

        case GET_ONE_SERVER: {
            return action.server
        }

        default: {
            return state;
        }
    }
}