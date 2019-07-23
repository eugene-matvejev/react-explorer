import axios from 'axios';
import { api } from '../../parameters';

const graphqlURI = `${api.protocol}://${api.host}:${api.port}`;

export const onMount = (props, state, onSuccess, onError) => {
    axios
        .post(
            graphqlURI,
            {
                query: `
                {
                    statuses {
                        name
                        seq
                    }
                }`
            }
        )
        .then(({ data: { data } }) => { onSuccess(data.statuses); })
        .catch((e) => { debugger; });
};

export const onFilter = ({ data }, state, pattern) => {
    for (const el of data) {
        el.disabled = pattern && el.name.indexOf(pattern) === -1;
    }

    return data;
}

