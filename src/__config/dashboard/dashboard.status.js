import React from 'react';
import { hasSequence } from 'byte-sequence-calculator';
import FormHandler from '../../handler/form-handler';
import TreeHandler from '../../handler/tree-handler';
import Query from '../../handler/query';
import createStatus from '../forms/create.status';
import updateStatus from '../forms/update.status';
import searchStatus from '../trees/explore.status';
import { composeGraphQLRequest } from '../helpers';

const resolveClassName = (status) => {
    if (hasSequence(status.seq, 0x1000)) {
        return 'tile--red';
    }
    if (hasSequence(status.seq, 0x0100)) {
        return 'tile--amber';
    }
    if (hasSequence(status.seq, 0x0010)) {
        return 'tile--green';
    }
};

const onMount = composeGraphQLRequest(`
{
    statuses {
        id
        name
        seq
    }
}`,
    ({ statuses }) => statuses.map((v) => ({ ...v, className: resolveClassName(v) }))
);

const onFilter = ({ data }, state, pattern) => {
    for (const el of data) {
        el.disabled = pattern && el.name.indexOf(pattern) === -1;
    }

    return data;
};

export default {
    onMount,
    onFilter,
    label: 'filter by pattern',
    placeholder: 'type pattern here...',
    modals: [
        {
            path: ['/new'],
            // exact: true,
            component: (props) => <FormHandler className="form--centered" {...props} {...createStatus} onCancel={props.history.goBack} />,
        },
        {
            path: ['/explore/:id'],
            exact: true,
            component: (props) =>
                <>
                    <FormHandler {...props} {...updateStatus} className="form--explore-mode" />
                    <Query
                        {...props}
                        onMount={searchStatus.onMount}
                        children={(_, state) =>
                            <TreeHandler
                                {...props}
                                {...state}
                                {...searchStatus}
                                onCancel={props.history.goBack}
                            />
                        }
                    />
                </>,
        },
    ],
};
