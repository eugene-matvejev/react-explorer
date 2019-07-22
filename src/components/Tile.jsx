import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ className, label, ...props }) => 
    <div 
        {...props}
        className={`rag-tile ${className}`}
    >
        <div className="rag-tile__label">{label}</div>  
    </div>;

Tile.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
}

Tile.defaultProps = {
    className: '',
}

export default Tile;