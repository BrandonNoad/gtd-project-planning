import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { connect } from 'react-redux';

import { selectSession } from '../app/selectors';

import Layout from '../components/layout';
import PrivateRoute from '../app/components/PrivateRoute';
import App from '../app/components/App';

const AppPage = ({ session }) => (
    <Layout session={session}>
        <Router>
            <PrivateRoute path="/app" component={App} default />
        </Router>
    </Layout>
);

AppPage.propTypes = {
    // TODO: enforce null or string
    session: PropTypes.any
};

export default connect((state) => ({
    session: selectSession(state)
}))(AppPage);
