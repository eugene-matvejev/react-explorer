import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopNav = ({ 'data-cy': cy, className, ...props }) =>
    <nav className={`topnav ${className}`} {...props}>
        <Link to="/" className="topnav__link--main">
            <img data-cy={`${cy}topnav-main`} className="topnav__logo--main" alt="Logo" src="/assets/img/placeholder.png" />
        </Link>
        <Link to="//github.com/eugene-matvejev/react-explorer" className="topnav__link--github" target="_blank">
            <img data-cy={`${cy}topnav-github`} className="topnav__logo--github" alt="GitHub logo" src="/assets/img/github-logo.png" />
        </Link>
    </nav>;

TopNav.propTypes = {
    'data-cy': PropTypes.string,
    className: PropTypes.string,
};
TopNav.defaultProps = {
    'data-cy': '',
    className: '',
};

export default TopNav;
