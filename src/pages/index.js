import React, { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        netlifyIdentity.init();
        netlifyIdentity.on('login', (user) => setUser(user));
        netlifyIdentity.on('logout', () => setUser());
    }, []);

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <h1>Hello {user ? user.user_metadata.full_name : 'World!'}</h1>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build something great.</p>
            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                <Image />
            </div>
            <button onClick={() => netlifyIdentity.open()}>{user ? 'Log Out' : 'Log In'}</button>
        </Layout>
    );
};
export default IndexPage;
