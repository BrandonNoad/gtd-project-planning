import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { exhaustMap, mapTo, catchError } from 'rxjs/operators';

import * as api from '../../api';
import * as actionTypes from '../../constants/action-types';

export const createProjectPlanFactory = ({ createProjectPlan }) => (action$) =>
    action$.pipe(
        ofType(actionTypes.CREATE_PROJECT_PLAN_REQUEST),
        exhaustMap(({ payload }) =>
            from(createProjectPlan(payload)).pipe(
                mapTo({ type: actionTypes.CREATE_PROJECT_PLAN_SUCCESS }),
                catchError((err) =>
                    of({
                        type: actionTypes.CREATE_PROJECT_PLAN_FAILURE,
                        message: err.message || 'Error creating project plan!'
                    })
                )
            )
        )
    );

export default createProjectPlanFactory(api);
