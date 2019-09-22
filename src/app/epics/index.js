import { combineEpics } from 'redux-observable';

import logIn from './log-in';
import createProjectPlan from './create-project-plan';

export default combineEpics(logIn, createProjectPlan);
