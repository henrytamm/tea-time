const GET_CHANNELS = 'channels/GET_CHANNELS'
const CREATE_CHANNEL = 'channels/CREATE_CHANNEL'
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL'
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL'

const getChannelsAction = (channels) => ({
    type: GET_CHANNELS,
    channels
})


const createChannelAction = (channel) => ({
    type: CREATE_CHANNEL,
    channel
})

export const getChannels = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${serverId}/channels`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getChannelsAction(data))
    }
    return res
}

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

        case CREATE_CHANNEL: {
            newState[action.channel.id] = action.channel;
            return newState
        }

        default: {
            return state;
        }
    }
}