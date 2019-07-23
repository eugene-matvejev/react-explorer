import React from 'react';
import PropTypes from 'prop-types';
import TopNav from './components/top-nav';
import ButtonHandler from './handlers/button-handler';

const WebApp = ({ className, children }) =>
    <section className={`webapp ${className}`}>
        <TopNav data-cy="topnav" />
        {children}
        <ButtonHandler />
    </section>;

WebApp.propTypes = {
    className: PropTypes.string.isRequired,
};

WebApp.defaultProps = {
    className: '',
};

export default WebApp;