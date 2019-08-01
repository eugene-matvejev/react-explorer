import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pill from './pill';

configure({ adapter: new Adapter() });

describe('<Pill/>', () => {
    const props = {
        label: '{{label}}',
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<Pill {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['data-cy', '{{data-cy}}'],
                ['onClick', () => { }],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<Pill {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });

    describe('external callbacks', () => {
        describe('::onClick', () => {
            it('should be invoked from a click on a [data-cy="-remove"]', () => {
                const spy = jest.fn();

                shallow(<Pill {...props} onClick={spy} />).find('[data-cy="-remove"]').simulate('click');

                expect(spy).toBeCalled();
            })
        });
    });
});
