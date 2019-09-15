import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import netlifyIdentity from 'netlify-identity-widget';
import { Flex, Box } from 'rebass';

import { selectSession } from '../app/selectors';

import Layout from '../components/Layout';

import { css } from '@emotion/core';

const container = css`
    height: calc(100vh - 50px);
`;

const serif = css`
    font-family: serif;
`;

// TODO: this isn't refreshing when we log in/log out. Probably something to do with it being a static page.
const IndexPage = ({ session }) => {
    const isLoggedIn = session !== null;

    useEffect(() => {
        // If the user is already logged in, then redirect to the app page.
        if (isLoggedIn) {
            navigate('/app');
            return;
        }

        if (window.location.hash === '') {
            netlifyIdentity.open();
        }
    }, [isLoggedIn]);

    if (isLoggedIn) {
        // TODO: Use loading component.
        return <p>Loading...</p>;
    }

    return (
        <Layout>
            <Flex justifyContent="center" alignItems="center" css={container}>
                <Box as="p" width={1 / 2} fontSize={[4, null, 5]} fontWeight="bold" css={serif}>
                    The key ingredients of relaxed control are (1) clearly defined outcomes
                    (projects) and the next actions required to move them toward closure, and (2)
                    reminders placed in a trusted system that is reviewed regularly.
                </Box>
            </Flex>
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
