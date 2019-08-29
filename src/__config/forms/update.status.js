import create, { composeMutation } from './create.status';
import { composeGraphQLRequest } from '../helpers';

const onMount = composeGraphQLRequest(
    (props, state) => `
{
    status(id: ${props.match.params.id}) {
        id
        name
        parent {
            id
            name
        }
    }
}`,
    ({ status }, props, state) => {
        const { config } = state;

        config[0].items.push({
            c: () => null,
            attr: 'id',
            value: status.id,
        });

        config[0].items[0].value = status.name;

        if (null !== status.parent) {
            config[0].items[1].value = [{ value: status.parent.id, label: status.parent.name }];
        }

        return ({ data: status, config });
    }
);

export default {
    ...create,
    title: undefined,
    onSuccess: undefined,
    onMount,
    onSubmit: composeMutation('updateStatus'),
}
