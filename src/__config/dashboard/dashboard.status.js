import axios from 'axios';
import { hasSequence } from 'byte-sequence-calculator';
import { api } from '../../parameters';

const graphqlURI = `${api.protocol}://${api.host}:${api.port}`;
const resolveClassName = (status) => {
    if (hasSequence(status.seq, 0x1000)) {
        status.className = 'tile--red';
    }

    if (hasSequence(status.seq, 0x0100)) {
        status.className = 'tile--amber';
    }
    if (hasSequence(status.seq, 0x0010)) {
        status.className = 'tile--green';
    }
};

const onMount = (props, state, onSuccess, onError) => {
    axios
        .post(
            graphqlURI,
            {
                query: `
                {
                    statuses {
                        id
                        name
                        seq
                    }
                }`
            }
        )
        .then(({ data: { data } }) => {
            data.statuses.forEach(resolveClassName);

            onSuccess(data.statuses);
        })
        .catch(onError);
};

const onFilter = ({ data }, state, pattern) => {
    for (const el of data) {
        el.disabled = pattern && el.name.indexOf(pattern) === -1;
    }

    return data;
};

export default {
    onMount,
    onFilter,
};


