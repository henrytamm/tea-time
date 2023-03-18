const GET_MESSAGES = 'messages/GET_MESSAGES'


const getMessagesAction = (messages) => ({
    type: GET_MESSAGES,
    messages
})

export const getMessages = (serverId, channelId) => async (dispatch) => {
    const res = await fetch (`/api/messages/${serverId}/${channelId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getMessagesAction(data))
    }
    return res
}

const initialState = {}

export const messageReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_MESSAGES : {
            newState = {}
            action.messages.messages.forEach((message) => {
                newState[message.id] = message
            });
            return newState
        }

        default: {
            return state
        }
    }
}