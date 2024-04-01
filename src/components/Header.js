import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './Header.css'
import logo from "./Icons/Northwestern_WHITE.svg"
import CModal from './CModal';


function Header(){
    const [classRoom, setClassRoom] = useState("");
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const handleShowHelpModal = () => {
        console.log("Showing Modal")
        setShowHelpModal(true);
      }
      const handleCloseHelpModal = () => {
        setShowHelpModal(false);
      }
    useEffect(() =>{
        window.CrComLib.subscribeState('s','1', value=> setClassRoom(value));
        console.log(classRoom)
    }, [])
    
    
    return(
        <div className='row p-0 m-0 headerRow'>
            <div className="col-12 d-flex flex-row justify-content-evenly align-items-center  font-size-3 font-size-4-xl p-0" style={{ backgroundColor: 'var(--bs-primary)' }}>
                    <div className="col-3">
                        <img
                            src={logo}
                            alt="Northwestern Logo"
                            className='img-fluid'
                            style={{width:'12em', height:'auto'}}/>
                    </div>
                    <div className="col-3 text-center text-white">
                        <span>{(classRoom == "") ? 'Room' : classRoom}</span>
                    </div>
                    <div className="col-4 text-center text-white">
                                <span className="d-block mb-2">
                                    <ch5-datetime 
                                        displaytype="date" 
                                        styleForDate="MMMM d, yyyy">
                                    </ch5-datetime>
                                </span>    
                                <span className='d-inline-block'>
                                    <ch5-datetime 
                                        displaytype="time">
                                    </ch5-datetime>
                                </span>
                    </div>
                    <div className="col-2 text-white text-center">
                    <button type="button"
                        className="btn d-flex align-items-center rounded-circle mx-auto text-white font-size-4 font-size-5-xl circleIcon" style={{backgroundColor: '#007FA4'}} onClick={handleShowHelpModal}>
                        <i className="d-inline-block bi bi-question-lg mx-auto"></i>
                    </button>
                    </div>
                <div>

                    {/* Help Modal */}
                    <Modal show={showHelpModal} onHide={handleCloseHelpModal} fullscreen={fullscreen}>
                        <Modal.Header className="pb-0">
                            <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                                <h1 className="font-size-5 font-size-6-xl">
                                    <button type="button" className="border-0 text-dark"
                                        onClick={handleCloseHelpModal}><i class="bi bi-arrow-left"></i></button>Help</h1>
                                <button type="button" className="border-0 text-muted"
                                    onClick={handleCloseHelpModal}><i class="bi bi-x-lg"></i></button>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="font-size-4 font-size-5-xl p-5">
                            <div className='container-fluid text-center'>
                                    <p>Please use the number below to call our support team for assistance.</p>
                                    <span className="d-block text-info fw-bold mt-5">7-ROOM</span>
                                    <span className="d-block text-muted mb-5">(847-467-7666)</span>
                                    <p>You are currently in room:</p>
                                    <span className='text-info fw-bold'>
                                    {(classRoom == "") ? 'Room' : classRoom}
                                </span>
                            </div>
                        </Modal.Body>
                    </Modal>
                    </div>

           </div>   
        </div>
    );

}


export default Header;