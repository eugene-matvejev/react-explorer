import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../component/landing-page';
import TopNav from '../component/top-nav';

export default class AuthHandler extends PureComponent {
    constructor({ user, errors }) {
        super();

        this.state = {
            user,
            errors,
        };

        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentWillMount() {
        this.props.onMount && this.props.onMount(this.props, this.state, this.onSuccess, this.onError);
    }

    onLogout() {
        this.setState(
            { user: undefined, errors: undefined },
            () => { this.props.onLogout && this.props.onLogout(this.props, this.state); }
        );
    }

    onSuccess(user) {
        this.setState({ user, errors: undefined });
    }

    onError(errors) {
        this.setState({ user: undefined, errors });
    }

    render() {
        const { user, errors } = this.state;
        const { routes, providers } = this.props;

        if (!user) {
            return <LandingPage providers={providers} errors={errors} />;
        }

        return <>
            <TopNav user={user} onLogout={this.onLogout} />
            <Switch>
                {
                    routes.map((props, i) => <Route key={i} {...props} {...this.state} />)
                }
            </Switch>
        </>;
    }

    static propTypes = {
        errors: PropTypes.arrayOf(PropTypes.string),
        user: PropTypes.shape({
            displayName: PropTypes.string.isRequired,
            hash: PropTypes.string.isRequired
        }),
        onMount: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                component: PropTypes.func.isRequired,
                path: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.arrayOf(PropTypes.string),
                ]).isRequired,
            })
        ).isRequired,
    }

    static defaultProps = {
    }
}
