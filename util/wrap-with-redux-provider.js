import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import netlifyIdentity from 'netlify-identity-widget';

import createStore from '../src/app/util/create-store';

import { netlifyIdentityResultToSession } from '../src/app/util/NetlifyIdentity';
import { logIn, logOut } from '../src/app/actions';

const ReduxProviderPreloadedWithSession = ({ store, children }) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const netlifyIdentityCallback = (netlifyIdentityResult) => {
            const session = netlifyIdentityResultToSession(netlifyIdentityResult);

            // Is the user logged in?
            if (session !== null) {
                store.dispatch(logIn(session));
            }
        };

        netlifyIdentity.init();

        // May be null.
        const netlifyIdentityResult = netlifyIdentity.currentUser();

        // TODO: check expired
        netlifyIdentityCallback(netlifyIdentityResult);

        netlifyIdentity.on('login', (netlifyIdentityResult) => {
            netlifyIdentityCallback(netlifyIdentityResult);
            netlifyIdentity.close();
        });

        netlifyIdentity.on('logout', () => store.dispatch(logOut()));

        setIsReady(true);
    }, [store]);

    if (!isReady) {
        // TODO: Use loading component.
        return <p>Loading...</p>;
    }

    return <Provider store={store}>{children}</Provider>;
};

ReduxProviderPreloadedWithSession.propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
};

const wrapWithReduxProvider = ({ element }) => {
    // Creating store in `wrapRootElement` handler ensures:
    //  - there is fresh store for each SSR page
    //  - it will be called only once in browser, when React mounts
    const store = createStore();

    return (
        <ReduxProviderPreloadedWithSession store={store}>
            {element}
        </ReduxProviderPreloadedWithSession>
    );
};

wrapWithReduxProvider.propTypes = {
    element: PropTypes.any
};

export default wrapWithReduxProvider;
