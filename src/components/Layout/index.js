import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';

// TODO: use hook
// import { StaticQuery, graphql } from 'gatsby';

import 'normalize.css';

const Layout = ({ children }) => (
    <div>
        <Header />
        <main>{children}</main>
    </div>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
