import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const Header = ({ session, siteTitle }) => {
    const isLoggedIn = session !== null;

    return (
        <header
            style={{
                background: `SeaGreen`,
                marginBottom: `1.45rem`
            }}
        >
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`
                }}
            >
                <h1 style={{ margin: 0 }}>
                    <Link
                        to="/"
                        style={{
                            color: `white`,
                            textDecoration: `none`
                        }}
                    >
                        {siteTitle}
                    </Link>
                </h1>
                <button
                    onClick={() => (isLoggedIn ? netlifyIdentity.logout() : netlifyIdentity.open())}
                >
                    {isLoggedIn ? 'Log Out' : 'Log In'}
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string,
    session: PropTypes.any
};

Header.defaultProps = {
    siteTitle: ``
};

export default Header;
