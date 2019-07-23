import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TileHandler from './tile_-handler';

configure({ adapter: new Adapter() });

describe('<TileHandler/>', () => {
    const props = {
        data: [
            {
                id: 1,
            },
        ],
    };

    describe('render', () => {
        it('with default/require d props', () => {
            const c = shallow(<TileHandler {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
                ['data-cy', '{{data-cy}}'], /** should be passed 'as is' */
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<TileHandler {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });

    describe('internal callbacks', () => {
        describe('::onClick', () => {
            it('should be invoked from a click on a [data-cy="-tile-0"]', () => {
                const spy = spyOn(TileHandler.prototype, 'onClick');

                mount(<TileHandler {...props} />)
                    .find('Tile[data-cy="-tile-0"]')
                    .simulate('click');

                expect(spy).toBeCalled();
            });
        });
    });
});

