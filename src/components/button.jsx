import React from 'react';
import PropTypes from 'prop-types';

const Button = ({name: label}) => 
  <button className={`button ${label}`}> {label} </button>


Button.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
};

Button.defaultProps = {
    className: '',
    label: '',

};

export default Button