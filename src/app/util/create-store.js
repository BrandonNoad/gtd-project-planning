import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import rootEpic from '../epics';

const createStore = () => {
    const epicMiddleware = createEpicMiddleware();

    const middleware = [thunk, epicMiddleware];

    if (process.env.NODE_ENV !== 'production') {
        middleware.push(logger);
    }

    const store = reduxCreateStore(rootReducer, {}, applyMiddleware(...middleware));

    epicMiddleware.run(rootEpic);

    return store;
};

export default createStore;
