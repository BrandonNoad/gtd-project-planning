const session = (state = null, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return action.session;

        case 'LOG_OUT':
            return null;

        default:
            return state;
    }
};

export default session;
