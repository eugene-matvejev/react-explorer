import create, { composeMutation } from './create.status';
import axios from 'axios';
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

export default {
    ...create,
    title: undefined,
    className: 'form--explore-mode',
    onMount,
    onSubmit: composeMutation('updateStatus'),
}
