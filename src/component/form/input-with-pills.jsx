import React from 'react';
import PropTypes from 'prop-types';
import { PureGenericInput } from './generic-input';
import Pill from './pill';

const InputWithPills = ({ 'data-cy': cy, value, onClick, ...props }) =>
    <div className="input-with-pills" onClick={onClick}>
        {
            value && value.map((props, i) =>
                <Pill
                    key={i}
                    data-cy={`${cy}-pill-${i}`}
                    data-id={onClick && i}
                    {...props}
                />
            )
        }
        <PureGenericInput {...props} data-cy={cy} className="input-with-pills__input" />
    </div>;

InputWithPills.propTypes = {
    'data-cy': PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
}

InputWithPills.defaultProps = {
    'data-cy': '',
}

export default InputWithPills;
