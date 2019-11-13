import axios from 'axios';
import resolvePayload from '../graphql/payload-resolver';

export const composeMutation = (type) => (props, state, onSuccess, onError) => {
    const v = resolvePayload(state.config);

    return composeQuery(`
mutation {
${type}(
    input: {
    ${
        Object
            .keys(v)
            .reduce(
                (acc, key) => {
                    acc += `
        ${key}: ${typeof v[key] === 'string' ? `"${v[key]}"` : v[key]}`;

                    return acc;
                },
                ''
            )
        }
    }
) {
    id
}
}`,
        ((data) => {
            if (data.errors) {
                throw new Error(data.errors);
            }

            return { data: data[type] };
        })
    )(props, state, onSuccess, onError);
};

export const composeQuery = (query, queryTransformer) => (props, state, onSuccess, onError) =>
    axios
        .post(
            `${process.env['REACT_APP_GRAPHQL']}/graphql`,
            {
                query: typeof query === 'function' ? query(props, state) : query,
            }
        )
        .then(({ data: { data, errors } }) => {
            if (undefined !== errors) {
                return onError(errors);
            }
            if (typeof queryTransformer === 'function') {
                const v = queryTransformer(data, props, state);

                return onSuccess(v);
            }

            return onSuccess(data);
        })
        .catch(onError);
