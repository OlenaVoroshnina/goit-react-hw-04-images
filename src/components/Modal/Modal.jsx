import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClick, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };
  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>
        <img src={children} alt="#" />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
