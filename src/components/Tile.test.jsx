import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tile from './Tile';

configure({ adapter: new Adapter() });

describe('<Tile/>', () => {
    const props = {
        label: '{{label}}',
    };
    describe('render', () => {
        it('with default/require d props', () => {
            const c = shallow(<Tile {...props} />);
            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
                ['data-cy', '{{data-cy}}'], /** should be passed 'as is' */
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<Tile {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });
});

