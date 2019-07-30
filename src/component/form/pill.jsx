import React from 'react';
import PropTypes from 'prop-types';

const Pill = ({ 'data-cy': cy, label, onClick }) =>
    <span className="pill" data-cy={cy}>
        {label}
        {onClick && <button data-cy={`${cy}-remove`} className="pill__control" onClick={onClick}>×</button>}
    </span>;

Pill.propTypes = {
    'data-cy': PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

Pill.defaultProps = {
    'data-cy': '',
}

export default Pill;
