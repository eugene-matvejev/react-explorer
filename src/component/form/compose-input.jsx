import React from 'react';
import PropTypes from 'prop-types';

export default (Component) => {
    const ComposedInput = ({ 'data-cy': cy, className, label, errors, validators, ...props }) =>
        <div className={`form-input ${className}`}>
            <label className={`form-input_label`}>
                {label}
                <Component {...props} data-cy={cy} />
                {
                    errors &&
                    !!errors.length &&
                    <ul className="form-input_errors">
                        {
                            errors.map((v, i) =>
                                <li
                                    key={i}
                                    data-cy={`${cy}-error-${i}`}
                                    className="form-input_error"
                                >
                                    {v}
                                </li>
                            )
                        }
                    </ul>
                }
            </label>
        </div>;

    ComposedInput.propTypes = {
        'data-cy': PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string,
        errors: PropTypes.arrayOf(PropTypes.string),
    };
    ComposedInput.defaultProps = {
        'data-cy': '',
        className: '',
    };

    return ComposedInput;
}
