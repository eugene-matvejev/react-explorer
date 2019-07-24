import React from 'react';
import PropTypes from 'prop-types';

const TopNav = ({ className, ...props }) =>
    <nav className={`topnav ${className}`} {...props}>
        <img className="topnav__logo" src="/assets/img/placeholder.png" alt="logo" />
    </nav>

TopNav.propTypes = {
    className: PropTypes.string,
};
TopNav.defaultProps = {
    className: '',
};

export default TopNav;