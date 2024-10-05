import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ showModal, handleClose, title, body, footer }) => {
  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
             <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          {footer ? 
            <Modal.Footer>{footer}</Modal.Footer>
          :null}
    </Modal>
  );
};

export default CustomModal;