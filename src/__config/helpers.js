import axios from 'axios';

export const composeGraphQLRequest = (query, queryTransformer) => (props, state, onSuccess, onError) => {
    const token = window.location.search
        .slice(1)
        .split('&')
        .reduce(
            (token, v) => {
                const p = v.split('=');

                if (p[0] === 'token') {
                    token = p[1];
                }

                return token;
            },
            ''
        ) || localStorage.getItem('session');

    axios
        .post(
            `${process.env['REACT_APP_GRAPHQL']}/graphql`,
            {
                query: v.query === 'function' ? query(props, state) : query,
            },
            // {
            //     query: q.query || q,
            //     variables: typeof q.variables === 'function' ? q.variables(props, state) : q.variables,
            // },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        .then(({ data: { data } }) => {
            localStorage.setItem('session', token);

            if (typeof queryTransformer === 'function') {
                const v = queryTransformer(data, props, state);
                onSuccess(v);
            } else {
                onSuccess(data)
            }
        })
        .catch(onError);
}
