import React from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Flex, Box, Button } from '@rebass/emotion';

import { createProjectPlan } from '../../actions';

const App = ({ handleSubmit }) => (
    <Flex justifyContent="center">
        <form onSubmit={handleSubmit}>
            <Box>
                <Box>
                    <label htmlFor="projectName">Project</label>
                    <br />
                    <Field name="projectName" component="input" type="text" />
                </Box>
                <Box>
                    <label htmlFor="purpose">Purpose</label>
                    <br />
                    <Field name="purpose" component="textarea" />
                </Box>
                <Box>
                    <label htmlFor="outcome">Outcome</label>
                    <br />
                    <Field name="outcome" component="textarea" />
                </Box>
                <Box>
                    <label htmlFor="brainstorming">Brainstorming</label>
                    <br />
                    <Field name="brainstorming" component="textarea" />
                </Box>
                <Box>
                    <label htmlFor="nextAction">Next Action</label>
                    <br />
                    <Field name="nextAction" component="textarea" />
                </Box>
            </Box>
            <Button type="submit">GTD</Button>
        </form>
    </Flex>
);

App.propTypes = {
    ...propTypes
};

export default reduxForm({
    form: 'gtdProjectPlanning',
    onSubmit: (values, dispatch) => dispatch(createProjectPlan(values)),
    onSubmitSuccess: (result, dipatch, { reset }) => reset()
})(App);
