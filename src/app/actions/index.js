// import * as api from '../api';
import * as actionTypes from '../constants/action-types';

export const logIn = (session) => (dispatch) => {
    // Initialize the api service.
    // api.init(session.accessToken);

    return dispatch({
        type: actionTypes.LOG_IN,
        session
    });
};

export const logOut = () => ({
    type: actionTypes.LOG_OUT
});
