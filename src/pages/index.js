import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';

import { selectSession } from '../app/selectors';

import Layout from '../components/Layout';

// TODO: this isn't refreshing when we log in/log out. Probably something to do with it being a static page.
const IndexPage = ({ session }) => {
    const isLoggedIn = session !== null;

    useEffect(() => {
        // If the user is already logged in, then redirect to the app page.
        if (isLoggedIn) {
            navigate('/app');
        }
    }, [isLoggedIn]);

    if (isLoggedIn) {
        // TODO: Use loading component.
        return <p>Loading...</p>;
    }

    return (
        <Layout>
            <h1>GTD</h1>
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
