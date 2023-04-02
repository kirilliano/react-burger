import PropTypes from 'prop-types';
import styleOverlay from '../modal-overlay/modal-overlay.module.css';

function ModalOverlay({ children, onClick }) {
  return (
    <div className={styleOverlay.overlay} onClick={onClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default ModalOverlay;