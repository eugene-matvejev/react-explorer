import axios from 'axios';
import { api } from '../../parameters';

const graphqlURI = `${api.protocol}://${api.host}:${api.port}`;

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
        .then(({ data: { data } }) => { onSuccess(data.statuses); })
        .catch((e) => { debugger; });
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


