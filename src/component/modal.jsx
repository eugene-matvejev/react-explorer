import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ 'data-cy': cy, className, onClose, children }) =>
    <div className="modal-container">
        <section className={`modal ${className}`}>
            <div className="modal-head">
                <button className="modal-button" data-cy={`${cy}-modal-close`} onClick={onClose}>
                    ×
                </button>
            </div>
            <div className="modal-content">
                {children}
            </div>
        </section>
    </div>;

Modal.propTypes = {
    'data-cy': PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};
Modal.defaultProps = {
    'data-cy': '',
    className: '',
};

export default Modal;
