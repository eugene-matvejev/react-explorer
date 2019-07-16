import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import WebApp from './web-app';

import './index.scss';

const props = {
}

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={() => <WebApp {...props} />} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
