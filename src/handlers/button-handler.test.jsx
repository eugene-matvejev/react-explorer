import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ButtonHandler from './button-handler';

configure({ adapter: new Adapter() });

describe('<ButtonHandler/>', () => {
    const props = {
        data: [
            {
                name: 'Add',
            },
        ],
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<ButtonHandler {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['data-cy', '{{data-cy}}'], /** should be passed 'as is' */
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<ButtonHandler {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });
});

