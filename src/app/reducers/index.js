import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import session from './session';

export default combineReducers({
    session,
    form
});
