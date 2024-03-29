import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import BackArrow from './Icons/arrow-left.svg';
import X from './Icons/x.svg'

const CustomModal = ({ show, onHide, title, children }) => {
  return (
    
    <Modal show={show} onHide={onHide} centered >
      <Modal.Header className="bg-secondary" >
        <div className="d-flex justify-content-between w-100 align-items-center">
          <Button variant="link" onClick={onHide} className="btn-close text-white">
                <img
                    src={BackArrow}
                    alt='Back arrow'
                    className='img-fluid' />
          </Button>
          <Modal.Title className="text-center ">{title}</Modal.Title>
          <Button variant="link" onClick={onHide} className="btn-close text-white">
                <img
                    src={X}
                    alt='X'
                    className='img-fluid' />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className='modal-xl' style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        {/* Your modal content goes here */}
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;