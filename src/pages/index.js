import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import netlifyIdentity from 'netlify-identity-widget';

import { selectSession } from '../app/selectors';

import Layout from '../components/layout';

// TODO: this isn't refreshing when we log in/log out. Probably something to do with it being a static page.
const IndexPage = ({ session }) => {
    const isLoggedIn = session !== null;

    // If the user is already logged in, then redirect to the app page.
    if (isLoggedIn) {
        navigate('/app');
        return null;
    }

    return (
        <Layout>
            <button onClick={() => netlifyIdentity.open()}>Log In</button>
        </Layout>
    );
};

IndexPage.propTypes = {
    // TODO: enforce null or string
    session: PropTypes.any
};

export default connect((state) => ({
    session: selectSession(state)
}))(IndexPage);
