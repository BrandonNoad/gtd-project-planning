import { ofType } from 'redux-observable';
import { tap, map } from 'rxjs/operators';

import * as api from '../../api';
import * as actionTypes from '../../constants/action-types';

const logIn = (action$) =>
    action$.pipe(
        ofType(actionTypes.LOG_IN),
        // Initialize the api service.
        tap(({ session }) => api.init(session.token.access_token)),
        map(({ session }) => ({ type: actionTypes.INIT_SESSION, session }))
    );

export default logIn;
