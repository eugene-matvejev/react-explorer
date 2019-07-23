import React from 'react';
import ReactDOM from 'react-dom';
import WebApp from './web-app';
import Query from './handlers/query';
import TileHandler from './handlers/tile_-handler';

import './index.scss';

const onMount = (props, state, onSuccess, onError) => {
    const data = (new Array(128)).fill(1).map((_, i) => ({
        name: `name ${i + 1}`,
        id: i,
    }))

    setTimeout(() => {
        onSuccess(data)
    }, 300);
}
const children = (props, state) => <TileHandler {...state} />

ReactDOM.render(
    <WebApp>
        <Query
            onMount={onMount}
            children={children}
        />
    </WebApp>,
    document.getElementById('app')
);
