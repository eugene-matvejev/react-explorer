import { hasSequence } from 'byte-sequence-calculator';
import { composeRule, isRequired } from '../../validation/rules';
import { validationEngine } from '../../validation/engine';
import Text from '../../component/form/html-input';
import InteractiveSearch from '../../component/form/interactive-search';
import { composeQuery, composeMutation } from '../helpers';

export default {
    title: 'create new status',
    validate: validationEngine,
    isValid: true,
    onMount: (props, state, onSuccess, onError) => {
        const { config: c } = state;

        c[0].items[0].value = '';
        c[0].items[1].value = undefined;
        // c[0].items.splice(2);

        /** hack for because of PureComponent, @TODO improve it */
        onSuccess({ config: [...c] });
    },
    onSuccess: (props, state) => {
        const { data } = state;

        data && props.history.push(
            {
                pathname: `/explore/${data.id}`,
                state: { isModal: true },
            }
        );
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
                    maxValues: 1,
                    valueTransformer: (v) => !v ? null : v[0].value,
                    onFilter: composeQuery(
                        (props, state) => `
{
    searchStatus(pattern: "${state.pattern}") {
        id
        seq
        name
    }
}`,
                        ({ data }) => {
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

                            return data.searchStatus.map(({ id: value, name: label, seq }) => ({
                                value,
                                label,
                                className: resolveClassName(seq),
                            }));
                        }
                    ),
                },
            ],
        },
    ],
    onSubmit: composeMutation('addStatus'),
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
