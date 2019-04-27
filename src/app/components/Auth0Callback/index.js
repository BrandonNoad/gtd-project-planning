import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';

import { logIn, logOut } from '../../actions';
import { parseHash, authResultToSession } from '../../util/Auth0';

const Auth0Callback = ({ auth0Action, boundLogIn, boundLogOut }) => {
    useEffect(() => {
        switch (auth0Action.toLowerCase()) {
            case 'authorize':
                parseHash((err, authResult) => {
                    if (err) {
                        // TODO: handle this case.
                        /* eslint-disable no-console */
                        console.log(err);
                        /* eslint-enable no-console */
                        navigate('/');
                        return;
                    }
                    // TODO: are we sure the user is always logged in at this point??
                    boundLogIn(authResultToSession(authResult));
                    navigate('/app');
                });
                return;

            case 'logout':
                boundLogOut();
                navigate('/');
                return;

            default:
                navigate('/');
                return;
        }
    }, []);

    // TODO: Use loading component.
    return <p>Loading...</p>;
};

Auth0Callback.propTypes = {
    auth0Action: PropTypes.string.isRequired,
    boundLogIn: PropTypes.func.isRequired,
    boundLogOut: PropTypes.func.isRequired
};

export default connect(
    null,
    { boundLogIn: logIn, boundLogOut: logOut }
)(Auth0Callback);
