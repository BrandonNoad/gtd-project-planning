import React from 'react';
import { Flex, Box, Button, Card } from 'rebass';
import { Input, Textarea } from '@rebass/forms';
import { Form, useField } from 'react-final-form';
import { useDispatch } from 'react-redux';

import { createProjectPlan } from '../../actions';

const FieldInput = ({ name, type = 'text' }) => {
    const { input, meta } = useField(name);
    return <Input {...input} {...meta} type={type} />;
};

const FieldTextarea = ({ name }) => {
    const { input, meta } = useField(name);
    return <Textarea {...input} {...meta} />;
};

const App = () => {
    const dispatch = useDispatch();

    return (
        <Card
            width={[3 / 4, null, 1 / 2]}
            mt={4}
            mx="auto"
            p={4}
            bg="white"
            borderRadius={6}
            boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
        >
            <Form
                onSubmit={(values) => dispatch(createProjectPlan(values))}
                render={({ handleSubmit, form }) => (
                    <form
                        onSubmit={async (e) => {
                            await handleSubmit(e);

                            form.reset();
                        }}
                    >
                        <Flex flexWrap="wrap" justifyContent="space-between">
                            <Box flex={['0 1 100%']} mb={[1, null, 2]}>
                                <label>
                                    Project
                                    <FieldInput name="projectName" />
                                </label>
                            </Box>
                            <Box flex={['0 1 100%', null, '0 1 48%']} mb={[1, null, 2]}>
                                <label>
                                    Purpose
                                    <FieldTextarea name="purpose" />
                                </label>
                            </Box>
                            <Box flex={['0 1 100%', null, '0 1 48%']} mb={[1, null, 2]}>
                                <label>
                                    Outcome
                                    <FieldTextarea name="outcome" />
                                </label>
                            </Box>
                            <Box flex={['0 1 100%', null, '0 1 48%']} mb={[1, null, 2]}>
                                <label>
                                    Brainstorming
                                    <FieldTextarea name="brainstorming" />
                                </label>
                            </Box>
                            <Box flex={['0 1 100%', null, '0 1 48%']} mb={[1, null, 2]}>
                                <label>
                                    Next Action
                                    <FieldTextarea name="nextAction" />
                                </label>
                            </Box>
                            <Button type="submit" bg="#00ad9f">
                                GTD
                            </Button>
                        </Flex>
                    </form>
                )}
            />
        </Card>
    );
};

// App.propTypes = {
//     ...propTypes
// };

export default App;
