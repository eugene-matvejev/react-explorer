import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ className, 'data-cy': cy, onClose, children }) =>
    <div className="modal_container">
        <section className={`modal ${className}`}>
            <div className="modal_title">
                <button className="modal-control__close" data-cy={`${cy}-modal-close`} onClick={onClose}>×</button>
            </div>
            <div className="modal_body">
                {children}
            </div>
        </section>
    </div>;

Modal.propTypes = {
    'data-cy': PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func,
};
Modal.defaultProps = {
    'data-cy': '',
    className: '',
};

export default Modal;
