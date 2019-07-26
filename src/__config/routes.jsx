import React, { Fragment } from 'react';
import Query from '../handler/query';
import TileHandler from '../handler/tile-handler';
import FormHandler from '../handler/form-handler';
import TreeHandler from '../handler/tree-handler';
import createStatus from './forms/create.status';
import updateStatus from './forms/update.status';
import searchStatus from './trees/explore.status';
import dashboardProps from './dashboard/dashboard.status';

export default [
    {
        path: ['/', '/dashboard'],
        exact: true,
        component: () =>
            <Query
                onMount={dashboardProps.onMount}
                children={(_, state) => <TileHandler {...state} onFilter={dashboardProps.onFilter} />}
            />,
    },
    {
        path: ['/new', '/create'],
        exact: true,
        component: (props) => <FormHandler {...props} {...createStatus} />,
    },
    {
        path: ['/tree'],
        exact: true,
        component: (props) =>
            <Query
                {...props}
                onMount={searchStatus.onMount}
                children={(_, state) => <TreeHandler {...props} {...state} {...searchStatus} className="" />}
            />,
    },
    {
        path: ['/explore', '/explore/:id'],
        exact: true,
        component: (props) =>
            <Fragment>
                <FormHandler {...props} {...updateStatus} />
                <Query
                    {...props}
                    onMount={searchStatus.onMount}
                    children={(_, state) => <TreeHandler {...props} {...state} {...searchStatus} />}
                />
            </Fragment>,
    },
]
