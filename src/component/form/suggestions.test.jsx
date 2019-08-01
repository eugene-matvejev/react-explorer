import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Suggestions from './suggestions';

configure({ adapter: new Adapter() });

describe('<Suggestions/>', () => {
    const props = {
        options: [
            {
                label: '{{label-only}}',
            },
            {
                label: '{{label-with-hierarchy}}',
                hierarchy: ['{{root}}', '{{sub-children}}', '{{label-with-hierarchy}}'],
            },
            {
                label: '{{label-with-description}}',
                description: '{{description}}',
            },
        ],
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<Suggestions {...props} />);

            expect(c).toMatchSnapshot();
        });


        describe('with optional props', () => {
            [
                ['data-cy', '{{data-cy}}'],
                ['className', '{{className}}'],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<Suggestions {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });
});
