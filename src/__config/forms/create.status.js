import { composeRule, isRequired } from '../../validation/rules';
import { validationEngine } from '../../validation/engine';
import Text from '../../component/form/generic-input';

const onSubmit = (props, state, onSuccess, onError) => {
    const { config } = state;

    console.log({ config });
};

export default {
    title: 'create new status',
    className: 'form--rounded',
    validate: validationEngine,
    isValid: true,
    config: [
        {
            items: [
                {
                    c: Text,
                    label: 'name',
                    value: 'exmaple',
                    validators: [
                        composeRule(isRequired, 'name is mandatory'),
                    ],
                },
                {
                    c: Text,
                    label: 'description',
                    value: 'example',
                    validators: [
                        composeRule(isRequired, 'password is required'),
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
