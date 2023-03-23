const GET_CHANNELS = 'channels/GET_CHANNELS'
const GET_ONE_CHANNEL = 'channels/GET_ONE_CHANNEL'
const CREATE_CHANNEL = 'channels/CREATE_CHANNEL'
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL'
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL'

const getChannelsAction = (channels) => ({
    type: GET_CHANNELS,
    channels
})

const getOneChannelAction = (channel) => ({
    type: GET_ONE_CHANNEL,
    channel
})

const createChannelAction = (channel) => ({
    type: CREATE_CHANNEL,
    channel
})

const editChannelAction = (channel) => ({
    type: EDIT_CHANNEL,
    channel
})

const deleteChannelAction = (channel) => ({
    type: DELETE_CHANNEL,
    channel
})

export const getChannels = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}/channels`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getChannelsAction(data))
    }
    return res
}

// export const getOneChannel = (serverId, channelId) => async (dispatch) => {
//     const res = await fetch(`/api/channels/${serverId}/${channelId}`)
//     if (res.ok) {
//         const data = await res.json()
//         dispatch(getOneChannelAction(data))
//     }
//     return res
// }

export const createChannel = (serverId, payload) => async (dispatch) => {
    const res = await fetch (`/api/servers/${serverId}/channels/new`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const channel = await res.json();
        dispatch(createChannelAction(channel))
    }
    return res
}

export const editChannel = (serverId, channelId, channel) => async (dispatch) => {
    const res = await fetch (`/api/servers/${serverId}/${channelId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(channel)
    })
    if (res.ok) {
        const editedChannel = await res.json();
        dispatch(editChannelAction(editedChannel))
    }
    return res
}

export const deleteChannel = (serverId, channelId) => async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}/${channelId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteChannelAction)
    }
    return res
}


const initialState = {}

export const channelReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_CHANNELS: {
            newState = {}
            action.channels.channels.forEach((channel) => {
                newState[channel.id] = channel
            });
            return newState
        }

        case GET_ONE_CHANNEL: {
            newState[action.channel.id] = action.channel;
            return newState;
        }

        case CREATE_CHANNEL: {
            newState[action.channel.id] = action.channel;
            return newState
        }

        case EDIT_CHANNEL: {
            newState[action.channel.id] = action.channel;
            return newState;
        }

        case DELETE_CHANNEL: {
            delete newState[action.channel];
            return newState;
        }


        default: {
            return state;
        }
    }
}