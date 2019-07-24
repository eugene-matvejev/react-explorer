import React, { Fragment } from 'react';
import Query from '../handler/query';
import TileHandler from '../handler/tile-handler';
import FormHandler from '../handler/form-handler';
import TreeHandler from '../handler/tree-handler';
import createStatus from './forms/create.status';
import searchStatus from './trees/search.status';
import dashboardProps from './dashboard/default';

export default [
    {
        path: ['/', '/dashboard'],
        exact: true,
        component: () =>
            <Query
                onMount={dashboardProps.onMount}
                children={(_, state) => <TileHandler {...state} onFilter={dashboardProps.onFilter} />}
            />
    },
    {
        path: ['/new', '/create', '/status/create'],
        exact: true,
        component: () => <FormHandler {...createStatus} />,
    },
    {
        path: ['/explore', '/explore/:id', '/status/:id/explore'],
        exact: true,
        component: (props) =>
            <Query
                {...props}
                onMount={searchStatus.onMount}
                children={(_, state) => <TreeHandler {...props} {...state} {...searchStatus} />}
            />
    },
    {
        path: ['/view/:id'],
        exact: true,
        component: (props) =>
            <Fragment>
                <FormHandler {...createStatus} />
                <TreeHandler {...props} {...searchStatus} />
            </Fragment>,
    },
]
