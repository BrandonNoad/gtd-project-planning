import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Flex, Box, Button } from '@rebass/emotion';

import { createProjectPlan } from '../../actions';

let App = ({ handleSubmit }) => (
    <Flex justifyContent="center">
        <form onSubmit={handleSubmit}>
            <Box>
                <Box>
                    <label htmlFor="projectName">Project</label>
                    <Field name="projectName" component="input" type="text" />
                </Box>
                <Box>
                    <label htmlFor="purpose">Purpose</label>
                    <Field name="purpose" component="textarea" />
                </Box>
                <Box>
                    <label htmlFor="outcome">Outcome</label>
                    <Field name="outcome" component="textarea" />
                </Box>
                <Box>
                    <label htmlFor="brainstorming">Brainstorming</label>
                    <Field name="brainstorming" component="textarea" />
                </Box>
                <Box>
                    <label htmlFor="nextAction">Next Action</label>
                    <Field name="nextAction" component="textarea" />
                </Box>
            </Box>
            <Button type="submit">GTD</Button>
        </form>
    </Flex>
);

App.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

App = reduxForm({
    form: 'gtdProjectPlanning'
})(App);

export default connect(
    null,
    (dispatch) => ({ onSubmit: (data) => dispatch(createProjectPlan(data)) })
)(App);
