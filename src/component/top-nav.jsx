import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopNav = ({ className, ...props }) =>
    <nav className={`topnav ${className}`} {...props}>
        <img className="topnav__logo" src="/assets/img/placeholder.png" alt="logo" />
        <Link to="//github.com/eugene-matvejev/react-explorer" target="_blank" >
            <img className="topnav__github-logo" alt=" GitHub logo" src="/assets/img/github-logo.png"></img>
        </Link>
    </nav>

TopNav.propTypes = {
    className: PropTypes.string,
};
TopNav.defaultProps = {
    className: '',
};

export default TopNav;