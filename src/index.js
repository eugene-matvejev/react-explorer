import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthHandler from './handler/auth-handler';
import { composeGraphQLRequest } from './__config/helpers'
import routes from './__config/routes';
import './index.scss';

const onMount = composeGraphQLRequest(`
{
    me {
        displayName
        photo
    }
}`,
    ({ me }) => me
);

const onLogout = (props, state) => {
    localStorage.removeItem('session');
}

const providers = [
    {
        href: `//localhost:8081/auth/github`,
        provider: 'github',
        label: 'log in with Github',
    },
    {
        href: `//localhost:8081/auth/github`,
        provider: 'bitbucket',
        label: 'log in with Bitbucket',
    },
];

ReactDOM.render(
    <BrowserRouter>
        <AuthHandler onMount={onMount} onLogout={onLogout} providers={providers} routes={routes} />
    </BrowserRouter>,
    document.getElementById('root')
);
