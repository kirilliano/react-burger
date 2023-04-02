import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styleModal from '../modal/modal.module.css';

function Modal({ children, onClose }) {
  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styleModal.modal} onClick={handleClick}>
        <button className={styleModal.button} type="button" onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById('react-modals'),
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
