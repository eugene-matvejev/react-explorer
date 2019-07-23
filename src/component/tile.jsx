import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ className, ...props }) =>
    <div
        {...props}
        className={`tile ${className}`}
    />;

Tile.propTypes = {
    className: PropTypes.string,
};

Tile.defaultProps = {
    className: '',
};

export default Tile;