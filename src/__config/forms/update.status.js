import create, { composeMutation } from './create.status';
import axios from 'axios';
// import resolvePayload from '../../graphql/payload-resolver';
import { api } from '../../parameters';

const graphqlURI = `${api.protocol}://${api.host}:${api.port}`;

const onMount = (props, { config }, onSuccess, onError) => {
    axios
        .post(
            graphqlURI,
            {
                query: `
{
    status(id: ${props.match.params.id}) {
        id
        name
        parent {
            id
            name
        }
    }
}`
            }
        )
        .then(({ data: { data } }) => {
            const status = data.status;

            config[0].items.push({
                c: () => null,
                attr: 'id',
                value: status.id,
            });

            config[0].items[0].value = status.name;

            if (null !== status.parent) {
                config[0].items[1].value = [{ value: status.parent.id, label: status.parent.name }];
            }

            onSuccess({ data: status, config });
        })
        .catch(onError)
};
// const onSubmit = (props, state, onSuccess, onError) => {
//     const v = resolvePayload(state.config);

//     const query = `
// mutation {
//     updateStatus(
//         input: {
//     ${
//         Object
//             .keys(v)
//             .reduce(
//                 (acc, key) => {
//                     acc += `
//             ${key}: ${typeof v[key] === 'string' ? `"${v[key]}"` : v[key]}`;

//                     return acc;
//                 },
//                 ''
//             )
//     }
//         }
//     ) {
//         id
//     }
// }`;

//     axios
//         .post(
//             graphqlURI,
//             {
//                 query,
//             }
//         )
//         .then(({ data }) => {
//             if (data.errors) {
//                 throw new Error(data.errors);
//             }

//             onSuccess({ data: data.data.updateStatus, config: state.config });
//         })
//         .catch(onError);
// };

export default {
    ...create,
    title: undefined,
    onMount,
    onSubmit: composeMutation('updateStatus'),
}
