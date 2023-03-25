export const GET_USERS = "users/GET_USERS"

const getUsersAction = (users) => {
    return {
        type: GET_USERS,
        users,
    }
}

export const getAllUsers = () => async (dispatch) => {
    const res = await fetch(`/api/users`);
    const data = await res.json();

    if (res.ok) {
        dispatch(getUsersAction(data.users));
    }
    return res
}


const initialState = {};

export const usersReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_USERS: {
            action.users.forEach((el) => {
                newState[el.id] = el
            });
            return newState;
        }
        default: {
            return state;
        }
    }
};

