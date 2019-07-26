import { composeRule, isRequired, isMatchRegex } from '../../validation/rules';
import { validationEngine } from '../../validation/engine';
import Text from '../../component/form/interactive-search';
import resolvePayload from '../../graphql/payload-resolver';
import { api } from '../../parameters';
import axios from 'axios';

const graphqlURI = `${api.protocol}://${api.host}:${api.port}`;

const onSubmit = (props, state, onSuccess, onError) => {
    const v = resolvePayload(state.config);

    const query = `
mutation {
    addStatus(
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
}`;

    axios
        .post(
            graphqlURI,
            {
                query,
            }
        )
        .then(({ data }) => {
            if (data.errors) {
                throw new Error(data.errors);
            }

            onSuccess({ data: data.data.addStatus, config: state.config });
        })
        .catch(onError);
};

export default {
    title: 'create new status',
    validate: validationEngine,
    isValid: true,
    onSuccess: ({ history }, state) => {
        const { data } = state;

        history.push(`/explore/${data.id}`);
    },
    config: [
        {
            items: [
                {
                    c: Text,
                    attr: 'name',
                    label: 'name',
                    placeholder: 'status name',
                    validators: [
                        composeRule(isRequired, 'name is mandatory'),
                    ],
                },
                {
                    c: Text,
                    attr: 'parent',
                    label: 'parent',
                    placeholder: 'parent status',
                    validators: [
                        composeRule(isMatchRegex, 'id should be a number', [/^[1-9][0-9]*$/]),
                    ],
                },
            ],
        },
    ],
    onSubmit,
    submitCTRL: {
        label: 'submit',
    },
    cancelCTRL: {
        label: 'cancel',
    },
}
