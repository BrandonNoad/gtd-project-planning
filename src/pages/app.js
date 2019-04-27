import React from 'react';
import { Router } from '@reach/router';

import PrivateRoute from '../app/components/PrivateRoute';
import App from '../app/components/App';

const AppPage = () => (
    <Router>
        <PrivateRoute path="/app" component={App} default />
    </Router>
);

export default AppPage;
