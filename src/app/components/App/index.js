import React from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Flex, Box, Button } from '@rebass/emotion';
import { css } from '@emotion/core';

const input = css`
    width: 100%;
    border-radius: 4px;
    border: 2px solid #e9ebeb;
    resize: vertical;
`;

import { createProjectPlan } from '../../actions';

const App = ({ handleSubmit }) => (
    <Box width={[1, 1 / 2]} mt={4} mx="auto" p={4}>
        <form onSubmit={handleSubmit}>
            <Box mb={2}>
                <label htmlFor="projectName">Project</label>
                <br />
                <Field name="projectName" component="input" type="text" css={input} />
            </Box>
            <Flex justifyContent="space-between" mb={2}>
                <Box flex="0 1 48%">
                    <label htmlFor="purpose">Purpose</label>
                    <br />
                    <Field name="purpose" component="textarea" css={input} />
                </Box>
                <Box flex="0 1 48%">
                    <label htmlFor="outcome">Outcome</label>
                    <br />
                    <Field name="outcome" component="textarea" css={input} />
                </Box>
            </Flex>
            <Flex justifyContent="space-between" mb={2}>
                <Box flex="0 1 48%">
                    <label htmlFor="brainstorming">Brainstorming</label>
                    <br />
                    <Field name="brainstorming" component="textarea" css={input} />
                </Box>
                <Box flex="0 1 48%">
                    <label htmlFor="nextAction">Next Action</label>
                    <br />
                    <Field name="nextAction" component="textarea" css={input} />
                </Box>
            </Flex>
            <Button type="submit" bg="#00ad9f">
                GTD
            </Button>
        </form>
    </Box>
);

App.propTypes = {
    ...propTypes
};

export default reduxForm({
    form: 'gtdProjectPlanning',
    onSubmit: (values, dispatch) => dispatch(createProjectPlan(values)),
    onSubmitSuccess: (result, dipatch, { reset }) => reset()
})(App);
