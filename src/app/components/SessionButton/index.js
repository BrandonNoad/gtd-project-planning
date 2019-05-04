import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@rebass/emotion';
import netlifyIdentity from 'netlify-identity-widget';

import { selectSession } from '../../selectors';

const SessionButton = ({ session }) => {
    const isLoggedIn = session !== null;

    if (isLoggedIn) {
        return <Button onClick={() => netlifyIdentity.logout()}>Log Out</Button>;
    }

    return <Button onClick={() => netlifyIdentity.open()}>Log In</Button>;
};

SessionButton.propTypes = {
    // TODO: enforce null or string
    session: PropTypes.any
};

export default connect((state) => ({
    session: selectSession(state)
}))(SessionButton);
