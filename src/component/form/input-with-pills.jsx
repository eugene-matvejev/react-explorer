import React from 'react';
import PropTypes from 'prop-types';
import { PureGenericInput } from './generic-input';
import Pill from './pill';

const InputWithPills = ({ 'data-cy': cy, value, ...props }) =>
    <div className="input-with-pills">
        {
            value.map((props, i) => <Pill key={i} data-cy={`${cy}-pill-${i}`} {...props} />)
        }
        <PureGenericInput {...props} data-cy={cy} className="input-with-pills__input" />
    </div>;

InputWithPills.propTypes = {
    'data-cy': PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.object)
}

InputWithPills.defaultProps = {
    'data-cy': '',
}

export default InputWithPills;
