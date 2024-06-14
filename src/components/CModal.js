import React, {useEffect, useRef} from 'react';
import { Button } from 'react-bootstrap';
import BackArrow from './Icons/arrow-left.svg';
import X from './Icons/x.svg'

const CModal = ({ show, onHide, title, children }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (show) {
        modalElement.classList.add('show');
        document.body.classList.add('modal-open');
      } else {
        modalElement.classList.remove('show');
        document.body.classList.remove('modal-open');
      }
    }
  }, [show]);
  return (
    <div className={`modal ${show ? 'show' : ''} align-middle p-0` }  role="dialog" ref={modalRef}
        style={{display: show ? 'block' : 'none', backgroundColor:'rgba(0,0,0,0.3', height: '100vh', width: '100vw'}}>
      <div className="modal-dialog modal-fullscreen" role="document" >
        <div className="modal-content">
          <div className="modal-header pb-0">
            <div className="modal-title col-12 d-flex flex-row justify-content-between">
            <h1 className="font-size-5 font-size-6-xl">
              <button variant="link" onClick={onHide} className="border-0 text-dark">
              <i className="bi bi-arrow-left"></i>
              </button>{title}
            </h1>
            <button variant="link" onClick={onHide} className="border-0 text-muted h4">
              <i className="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div className="modal-body text-black p-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CModal;
