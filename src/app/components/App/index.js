import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

let App = ({ session, handleSubmit }) => (
    <>
        <h1>Hello {session.user_metadata.full_name}</h1>
        <p>Name, Purpose, Desired Outcome, Brainstorming, Next Action</p>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <Field name="name" component="input" type="text" />
            </div>
            <button type="submit">Submit</button>
        </form>
    </>
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
