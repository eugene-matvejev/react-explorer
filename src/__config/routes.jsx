import React from 'react';
import Query from '../handler/query';
import TileHandler from '../handler/tile-handler';
import FormHandler from '../handler/form-handler';
import createStatus from './forms/create.status';

const onMount = (props, state, onSuccess, onError) => {
    const data = (new Array(128)).fill(1).map((_, i) => ({
        name: `name ${i + 1}`,
        id: i,
    }))

    setTimeout(() => {
        onSuccess(data)
    }, 300);
};

export default [
    {
        path: '/',
        exact: true,
        component: () =>
            <Query
                onMount={onMount}
                children={(props, state) => <TileHandler {...state} />}
            />
    },
    {
        path: '/new',
        exact: true,
        component: () => <FormHandler {...createStatus} />,
    },
]