import React from 'react';
import PropTypes from 'prop-types';

const TopNav = ({ className, ...props }) =>
    <nav className={`topnav ${className}`} {...props}>
        <img className="topnav__logo" src="/assets/img/placeholder.png" alt="logo" />
        <a href="https://github.com/eugene-matvejev/react-explorer"><img className="topnav__github-logo" alt="GitHub Logomark" src="/assets/img/github-logo.png"></img></a>
    </nav>

TopNav.propTypes = {
    className: PropTypes.string,
};
TopNav.defaultProps = {
    className: '',
};

export default TopNav;