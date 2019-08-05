import React from 'react';
import Query from '../handler/query';
import withModal from '../handler/with-modal';
import TileHandler from '../handler/tile-handler';
import TreeHandler from '../handler/tree-handler';
import searchStatus from './trees/explore.status';
import dashboardProps from './dashboard/dashboard.status';

const TileHandlerWithModal = withModal(TileHandler);

export default [
    {
        path: ['/'],
        // exact: true,
        component: (props) =>
            <Query
                onMount={dashboardProps.onMount}
                children={(_, state) => <TileHandlerWithModal {...props} {...state} {...dashboardProps} />}
            />,
    },
    {
        path: ['/explore'],
        exact: true,
        component: (props) =>
            <Query
                {...props}
                onMount={searchStatus.onMount}
                children={(_, state) => <TreeHandler {...props} {...state} {...searchStatus} className="" />}
            />,
    },
];
