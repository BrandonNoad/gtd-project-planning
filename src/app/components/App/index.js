import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import netlifyIdentity from 'netlify-identity-widget';

import Layout from '../../../components/layout';

let App = ({ session, handleSubmit }) => (
    <Layout>
        <h1>Hello {session.user_metadata.full_name}</h1>
        <p>Name, Purpose, Desired Outcome, Brainstorming, Next Action</p>
        <button onClick={() => netlifyIdentity.logout()}>Log Out</button>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <Field name="name" component="input" type="text" />
            </div>
            <button type="submit">Submit</button>
        </form>
        )
    </Layout>
);

App.propTypes = {
    // TODO: enforce null or string
    session: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired
};

App = reduxForm({
    form: 'gtd-project-planning'
})(App);

export default connect(
    null,
    () => ({
        onSubmit: (data) => console.log(data)
    })
)(App);
