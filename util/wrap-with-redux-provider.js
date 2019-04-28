const React = require('react');
const { useState, useEffect } = React;
const PropTypes = require('prop-types');
const { Provider } = require('react-redux');

const createStore = require('../src/app/util/create-store').default;

const { netlifyIdentityResultToSession } = require('../src/app/util/NetlifyIdentity');
const { logIn, logOut } = require('../src/app/actions');

const ReduxProviderPreloadedWithSession = ({ store, children }) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const netlifyIdentity = require('netlify-identity-widget');

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

        netlifyIdentityCallback(netlifyIdentityResult);

        netlifyIdentity.on('login', (netlifyIdentityResult) => {
            netlifyIdentityCallback(netlifyIdentityResult);
            netlifyIdentity.close();
        });

        netlifyIdentity.on('logout', () => store.dispatch(logOut()));

        setIsReady(true);
    }, []);

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
