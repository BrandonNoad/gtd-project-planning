import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import session from './session';
import isLoading from './is-loading';
import errorMessage from './error-message';

export default combineReducers({
    session,
    form,
    isLoading,
    errorMessage
});
