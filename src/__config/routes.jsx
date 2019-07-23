import React from 'react';
import Query from '../handler/query';
import TileHandler from '../handler/tile-handler';
import FormHandler from '../handler/form-handler';
import TreeHandler from '../handler/tree-handler';
import createStatus from './forms/create.status';
import searchStatus from './trees/search.status';
import { onMount, onFilter } from './dashboard/default';

export default [
    {
        path: '/',
        exact: true,
        component: () =>
            <Query
                onMount={onMount}
                children={(props, state) => <TileHandler {...state} onFilter={onFilter} />}
            />
    },
    {
        path: ['/new', '/add', '/status/new', '/status/add'],
        exact: true,
        component: () => <FormHandler {...createStatus} />,
    },
    {
        path: ['/view', '/tree', '/explore', '/status/:id/explore'],
        exact: true,
        component: () => <TreeHandler {...searchStatus} />,
    }
]