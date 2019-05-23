import React from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Flex, Box, Button, Card } from '@rebass/emotion';

import Input from '../Input';
import Textarea from '../Textarea';

import { createProjectPlan } from '../../actions';

const App = ({ handleSubmit }) => (
    <Card
        width={[3 / 4, null, 1 / 2]}
        mt={4}
        mx="auto"
        p={4}
        bg="white"
        borderRadius={6}
        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
    >
        <form onSubmit={handleSubmit}>
            <Flex flexWrap="wrap" justifyContent="space-between">
                <Box flex={['0 1 100%']} mb={[1, null, 2]}>
                    <label htmlFor="projectName">Project</label>
                    <Field name="projectName" component={Input} type="text" />
                </Box>
                <Box flex={['0 1 100%', null, '0 1 48%']} mb={[1, null, 2]}>
                    <label htmlFor="purpose">Purpose</label>
                    <Field name="purpose" component={Textarea} />
                </Box>
                <Box flex={['0 1 100%', null, '0 1 48%']} mb={[1, null, 2]}>
                    <label htmlFor="outcome">Outcome</label>
                    <Field name="outcome" component={Textarea} />
                </Box>
                <Box flex={['0 1 100%', null, '0 1 48%']} mb={[1, null, 2]}>
                    <label htmlFor="brainstorming">Brainstorming</label>
                    <Field name="brainstorming" component={Textarea} />
                </Box>
                <Box flex={['0 1 100%', null, '0 1 48%']} mb={[1, null, 2]}>
                    <label htmlFor="nextAction">Next Action</label>
                    <Field name="nextAction" component={Textarea} />
                </Box>
                <Button type="submit" bg="#00ad9f">
                    GTD
                </Button>
            </Flex>
        </form>
    </Card>
);

App.propTypes = {
    ...propTypes
};

export default reduxForm({
    form: 'gtdProjectPlanning',
    onSubmit: (values, dispatch) => dispatch(createProjectPlan(values)),
    onSubmitSuccess: (result, dipatch, { reset }) => reset()
})(App);
