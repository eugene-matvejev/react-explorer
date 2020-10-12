import React from 'react';
// import { setupServer } from 'msw/node'
import { render, asFragment } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'
import Button from './button';

describe('<Button/>', () => {
    const props = {
        label: '{{label}}',
    };

    describe('render', () => {
        it('with default/required props', () => {
            const { container } = render(<Button {...props} />);

            expect(container).toMatchSnapshot();
        });
        it('with default/required props 2', () => {
            const { asFragment } = render(<Button {...props} />);

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
