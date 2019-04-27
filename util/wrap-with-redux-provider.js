import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import netlifyIdentity from 'netlify-identity-widget';

import createStore from '../src/app/util/create-store';
import { netlifyIdentityResultToSession } from '../src/app/util/NetlifyIdentity';
import { logIn, logOut } from '../src/app/actions';

const ReduxProviderPreloadedWithSession = ({ children }) => {
    netlifyIdentity.init();

    // Creating store in `wrapRootElement` handler ensures:
    //  - there is fresh store for each SSR page
    //  - it will be called only once in browser, when React mounts
    const store = createStore();

    const logInHandler = (netlifyIdentityResult) => {
        const session = netlifyIdentityResultToSession(netlifyIdentityResult);

        // Is the user logged in?
        if (session !== null) {
            store.dispatch(logIn(session));
        }
    };

    // May be null.
    const netlifyIdentityResult = netlifyIdentity.currentUser();

    logInHandler(netlifyIdentityResult);

    netlifyIdentity.on('login', (netlifyIdentityResult) => {
        logInHandler(netlifyIdentityResult);
        netlifyIdentity.close();
    });
    netlifyIdentity.on('logout', () => store.dispatch(logOut()));

    return <Provider store={store}>{children}</Provider>;
};

ReduxProviderPreloadedWithSession.propTypes = {
    children: PropTypes.any
};

const wrapWithReduxProvider = ({ element }) => (
    <ReduxProviderPreloadedWithSession>{element}</ReduxProviderPreloadedWithSession>
);

wrapWithReduxProvider.propTypes = {
    element: PropTypes.any
};

export default wrapWithReduxProvider;
