const GET_MESSAGES = "messages/GET_MESSAGES";
const CREATE_MESSAGE = "messages/CREATE_MESSAGE";
const CLEAR_MESSAGES = "messages/CLEAR_MESSAGES";
const EDIT_MESSAGE = "messages/EDIT_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

const getMessagesAction = (messages) => ({
  type: GET_MESSAGES,
  messages,
});

const createMessageAction = (message) => ({
  type: CREATE_MESSAGE,
  message,
});

const clearMessagesAction = () => ({
  type: CLEAR_MESSAGES,
});

const editMessageAction = (message) => {
  return {
    type: EDIT_MESSAGE,
    message,
  };
};

const deleteMessageAction = (message) => ({
  type: DELETE_MESSAGE,
  message,
});

export const getMessages = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${channelId}/messages`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getMessagesAction(data.messages));
    return data.messages;
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

export const editMessage = (message) => async (dispatch) => {
  const res = await fetch(`/api/messages/${message.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (res.ok) {
    const updatedMessage = await res.json();
    dispatch(editMessageAction(updatedMessage));
  }
  return res;
};

export const deleteMessage = (messageId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${messageId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteMessageAction(messageId));
  }
  return res;
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

    case EDIT_MESSAGE: {
      newState[action.message.id] = action.message;
      return newState;
    }

    case DELETE_MESSAGE: {
      delete newState[action.message];
      return newState;
    }

    default: {
      return state;
    }
  }
};
