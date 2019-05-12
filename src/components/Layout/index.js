import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';

// TODO: use hook
// import { StaticQuery, graphql } from 'gatsby';

import 'normalize.css';
import './index.css';

const Layout = ({ children }) => (
    <>
        <Header />
        <main>{children}</main>
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
