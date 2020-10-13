import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import _TopNav from './top-nav';

const TopNav = (props) =>
    <MemoryRouter>
        <_TopNav {...props} />
    </MemoryRouter>;

describe('<TopNav />', () => {
    const props = {
        label: '{{label}}',
    };

    describe('render', () => {
        it('with default/required props', () => {
            const { container, debug } = render(<TopNav {...props} />);

            expect(container.querySelector('[data-cy="topnav-main"]')).toBeInTheDocument();
            expect(container.querySelector('[data-cy="topnav-github"]')).toBeInTheDocument();
        });
    });
});
