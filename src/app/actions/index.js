import * as actionTypes from '../constants/action-types';

export const logIn = (session) => ({
    type: actionTypes.LOG_IN,
    session
});

export const logOut = () => ({
    type: actionTypes.LOG_OUT
});

export const createProjectPlan = (payload) => ({
    type: actionTypes.CREATE_PROJECT_PLAN_REQUEST,
    payload
});
