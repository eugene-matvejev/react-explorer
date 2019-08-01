import { composeRule, isRequired, isLengthBetween } from '../../validation/rules';
import { validationEngine } from '../../validation/engine';
import Text from '../../component/form/generic-input';
import InteractiveSearch from '../../component/form/interactive-search';
import resolvePayload from '../../graphql/payload-resolver';
import { api } from '../../parameters';
import { hasSequence } from 'byte-sequence-calculator';
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
                    c: InteractiveSearch,
                    attr: 'parent',
                    label: 'parent',
                    placeholder: 'parent status',
                    validators: [
                        composeRule(isLengthBetween, 'only one parent allowed', [, 1]),
                    ],
                    maxValues: 1,
                    valueTransformer: (v) => !v ? null : v[0].value,
                    onFilter: (props, state, onSuccess, onError) => {
                        axios
                            .post(
                                graphqlURI,
                                {
                                    query: `
{
    statuses {
        id
        seq
        name
    }
}`
                                }
                            )
                            .then(({ data: { data } }) => {
                                const resolveClassName = (seq) => {
                                    if (hasSequence(seq, 0x1000)) {
                                        return 'suggestion--red';
                                    }
                                    if (hasSequence(seq, 0x0100)) {
                                        return 'suggestion--amber';
                                    }
                                    if (hasSequence(seq, 0x0010)) {
                                        return 'suggestion--green';
                                    }

                                    return '';
                                }

                                const v = data.statuses.map(({ id: value, name: label, seq }) => ({
                                    value,
                                    label,
                                    className: resolveClassName(seq),
                                    description: 'lorum ipsum, '.repeat(20),
                                }));

                                onSuccess(v);
                            })
                            .catch(onError);
                    }
                },
            ],
        },
    ],
    onSubmit,
    submitCTRL: {
        label: 'submit',
    },
    updateCTRL: {
        label: 'update',
    },
    cancelCTRL: {
        label: 'cancel',
    },
}
