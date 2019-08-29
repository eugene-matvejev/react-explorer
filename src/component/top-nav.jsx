import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class TopNav extends PureComponent {
    constructor({ isExpanded }) {
        super();

        this.state = {
            isExpanded,
        }

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    render() {
        const { 'data-cy': cy, user, className, onLogout, ...props } = this.props;
        const { isExpanded } = this.state;

        return <nav className={`topnav ${className}`} {...props}>
            <Link to="/" className="topnav__link--main">
                <img data-cy={`${cy}topnav-main`} className="topnav__logo--main" alt="Logo" src="/assets/img/placeholder.png" />
            </Link>
            <span className={`topnav__user-wrapper`}>
                <img
                    onClick={this.onToggle}
                    data-cy={`${cy}topnav-user`}
                    className="topnav__user-avatar"
                    alt="user avatar"
                    src={user.photo}
                />
                {
                    isExpanded &&
                    <ul onClick={this.onToggle} className="topnav__user-menu-options">
                        <li className="topnav__user-menu-option" onMouseDown={onLogout}>logout</li>
                        <li className="topnav__user-menu-option">
                            <Link to="/sessions">sessions</Link>
                        </li>
                        <li className="topnav__user-menu-option">
                            <Link to="/connected-accounts">connected accounts</Link>
                        </li>
                    </ul>
                }
            </span>
        </nav>;
    }

    static propTypes = {
        'data-cy': PropTypes.string,
        className: PropTypes.string,
        isExpanded: PropTypes.bool,
    };
    static defaultProps = {
        'data-cy': '',
        className: '',
    };
}
