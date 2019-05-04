// import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { Flex, Heading } from '@rebass/emotion';
import SessionButton from '../../app/components/SessionButton';

const Header = ({ siteTitle }) => {
    return (
        <header>
            <Flex justifyContent="space-between" p={2}>
                <Heading>{siteTitle}</Heading>

                <SessionButton />
            </Flex>
        </header>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string
};

// TODO: pass in siteTitle
Header.defaultProps = {
    siteTitle: 'GTD Project Planning'
};

export default Header;
