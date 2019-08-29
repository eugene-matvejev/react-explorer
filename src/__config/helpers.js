import axios from 'axios';

export const composeGraphQLRequest = (query, queryTransformer) => (props, state, onSuccess, onError) => {
    axios
        .post(
            `${process.env['REACT_APP_GRAPHQL']}/graphql`,
            {
                query: query === 'function' ? query(props, state) : query,
            }
        )
        .then(({ data: { data } }) => {
            if (typeof queryTransformer === 'function') {
                const v = queryTransformer(data, props, state);
                onSuccess(v);
            } else {
                onSuccess(data)
            }
        })
        .catch(onError);
}
