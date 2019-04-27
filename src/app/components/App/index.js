import React from 'react';
import PropTypes from 'prop-types';
import netlifyIdentity from 'netlify-identity-widget';

import Layout from '../../../components/layout';

const App = ({ session }) => (
    <Layout>
        <h1>Hello {session.user_metadata.full_name}</h1>
        <p>Name, Purpose, Desired Outcome, Brainstorming, Next Action</p>
        <button onClick={() => netlifyIdentity.logout()}>Log Out</button>
    </Layout>
);

App.propTypes = {
    // TODO: enforce null or string
    session: PropTypes.any
};

export default App;
