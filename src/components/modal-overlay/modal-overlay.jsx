import PropTypes from 'prop-types';
import styleOverlay from '../modal-overlay/modal-overlay.module.css';

function ModalOverlay({ onClick }) {
  return <div className={styleOverlay.overlay} onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
