const GET_EVERY_SERVER = "allServers/GET_EVERY_SERVER";

const getEveryServerAction = (servers) => ({
  type: GET_EVERY_SERVER,
  servers,
});

export const getEveryServer = () => async (dispatch) => {
  const res = await fetch("/api/servers");

  if (res.ok) {
    const servers = await res.json();
    dispatch(getEveryServerAction(servers));
    return servers;
  }
};

const initialState = {
    servers: {}
  };
  
  export const allServerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EVERY_SERVER: {
        const newState = { ...state };
        action.servers.servers.forEach((server) => {
          newState.servers[server.id] = server;
        });
        return newState;
      }
  
      default: {
        return state;
      }
    }
  };
  