const GET_MESSAGES = "messages/GET_MESSAGES";
const CREATE_MESSAGE = "messages/CREATE_MESSAGE"
const CLEAR_MESSAGES = "messages/CLEAR_MESSAGES";

const getMessagesAction = (messages) => ({
  type: GET_MESSAGES,
  messages,
});

const createMessageAction = (message) => ({
    type: CREATE_MESSAGE,
    message
})

const clearMessagesAction = () => ({
  type: CLEAR_MESSAGES,
});

export const getMessages = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${channelId}/messages`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getMessagesAction(data.messages));
    return data.messages
  }
  return res;
};

export const createNewMessage = (message, channelId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${channelId}/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (res.ok) {
    const newMessage = await res.json();
    dispatch(createMessageAction(newMessage));
    return newMessage;
  }
  return res;
};


export const clearAllMessages = () => async (dispatch) => {
  dispatch(clearMessagesAction());
};

const initialState = {};

export const messageReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_MESSAGES: {
      newState = {};
       action.messages.forEach((message) => {
        newState[message.id] = message;
      });
      return newState;
    }

    case CREATE_MESSAGE: {
      newState[action.message.id] = action.message;
      return newState;
    }

    case CLEAR_MESSAGES: {
      newState = {};
      return newState;
    }

    default: {
      return state;
    }
  }
};
