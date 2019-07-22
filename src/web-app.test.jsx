import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WebApp from './web-app';

configure({ adapter: new Adapter() });

describe('WebApp', () => {
    const props = {
    };

    describe('render', () => {
        it('with default/required props', () => {
            const c = shallow(<WebApp {...props} />);

            expect(c).toMatchSnapshot();
        });

        describe('with optional props', () => {
            [
                ['className', '{{className}}'],
            ].forEach(([prop, v]) => {
                it(`[::${prop}] as "${v}"`, () => {
                    const c = shallow(<WebApp {...props} {...{ [prop]: v }} />);

                    expect(c).toMatchSnapshot();
                });
            });
        });
    });
});
