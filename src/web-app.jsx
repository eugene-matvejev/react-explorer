import React from 'react';
import PropTypes from 'prop-types';
import TopNav from './components/top-nav';

const WebApp = ({ className, children }) =>
    <section className={`webapp ${className}`}>
        <TopNav data-cy="topnav" />
        {children}
    </section>;

WebApp.propTypes = {
    className: PropTypes.string.isRequired,
};

WebApp.defaultProps = {
    className: '',
};

export default WebApp;