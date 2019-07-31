import React from 'react';
import PropTypes from 'prop-types';

const Suggestions = ({ 'data-cy': cy, className, options }) =>
    <div className={`suggestions ${className}`}>
        {
            options.map(({ className, hierarchy, label, description }, i) =>
                <div key={i} className={`suggestion ${className}`}>
                    {
                        hierarchy &&
                        !!hierarchy.length &&
                        <div className="suggestion__hierarchy">
                            {
                                hierarchy.map((label, i) => <span key={i} className={`suggestion__hierarchy-label ${className}`}>{label}</span>)
                            }
                        </div>
                    }
                    <div className="suggestion__label">{label}</div>
                    {description && <p className="suggestion__description">{description}</p>}
                </div>
            )
        }
    </div>;

Suggestions.propTypes = {
    'data-cy': PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            hierarchy: PropTypes.arrayOf(PropTypes.string),
            label: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
}

Suggestions.defaultProps = {
    'data-cy': '',
    className: ''
}

export default Suggestions;
