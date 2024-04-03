import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './Header.css'
import logo from "./Icons/Northwestern_WHITE.svg"
import CModal from './CModal';


function Header(){
    const [classRoom, setClassRoom] = useState("");
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const holdTimeoutRef = useRef(null);
    
    const handleShowHelpModal = () => {
        console.log("Showing Modal")
        setShowHelpModal(true);
    }
    const handleCloseHelpModal = () => {
        setShowHelpModal(false);
    }
    // const handleShowAdminModal = () => {
    //     setShowAdminModal(true);
    // }
    const handleCloseAdminModal = () => {
        setShowAdminModal(false);
    }

    const handleAdminLongPress = () => {
        setShowAdminModal(true);
      };

    useEffect(() =>{
        window.CrComLib.subscribeState('s','1', value=> setClassRoom(value));
        console.log(classRoom)
    }, [])
    
    
    return(
        <div className='row p-0 m-0 headerRow'>
            <div className="col-12 d-flex flex-row justify-content-around align-items-center bg-primary font-size-3 font-size-4-xl p-0">
                    <div className="col-3">
                        <img
                            src={logo}
                            alt="Northwestern Logo"
                            className='img-fluid'
                            style={{width:'12em', height:'auto'}}/>
                    </div>
                    <div className="col-1 text-center p-0">
                        <div className="text-primary py-3 py-xl-5 font-size-1"
                        onMouseDown={() => {
                            holdTimeoutRef.current = setTimeout(() => handleAdminLongPress(), 500);
                          }}
                          onMouseUp={() => clearTimeout(holdTimeoutRef.current)}
                          onTouchStart={() => {
                            holdTimeoutRef.current = setTimeout(() => handleAdminLongPress(), 500);
                          }}
                          onTouchEnd={() => clearTimeout(holdTimeoutRef.current)}
                          onMouseLeave={() => clearTimeout(holdTimeoutRef.current)}
                        >
                        admin button
                        </div>
                    </div>
                    <div className="col-2 text-center text-white">
                        <span>{(classRoom == "") ? 'Room' : classRoom}</span>
                    </div>
                    <div className="col-3 text-center text-white">
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
                    <div className="col-1 text-white text-center">
                    <button
                        className="btn btn-info d-flex align-items-center rounded-circle mx-auto text-white font-size-4 font-size-5-xl circleIcon" onClick={handleShowHelpModal}>
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
                        <Modal.Body className="font-size-4 font-size-5-xl p-4 p-xl-5">
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
                    
                    {/* Admin Modal */}
                    <Modal show={showAdminModal} onHide={handleCloseAdminModal} fullscreen={fullscreen}>
                        <Modal.Header className="p-0 pt-2">
                            <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                                <h1 className="font-size-4 font-size-5-xl">
                                    <button type="button" className="border-0 text-dark"
                                        onClick={handleCloseAdminModal}><i class="bi bi-arrow-left"></i></button>Admin</h1>
                                <h2 className="align-self-center font-size-2 font-size-4-xl text-center">
                                    <strong>Project file:</strong> placeholder.ch5z
                                </h2>
                                <button type="button" className="border-0 text-muted font-size-3 font-size-5-xl"
                                    onClick={handleCloseAdminModal}><i class="bi bi-x-lg"></i></button>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="font-size-4 font-size-5-xl p-0 pt-1">
                            <div className='container-fluid overflow-y-auto'>
                                <div className="row flex-wrap align-items-start justify-content-around pt-xl-3">
                                    <div className="col-5 d-flex flew-row align-items-center p-0 mb-2 mb-xl-2">
                                        <FloatingLabel
                                            controlId="roomName"
                                            label="Room Name"
                                            className="col text-muted font-size-1 font-size-2-xl p-0"
                                        >
                                            <Form.Control type="text/input" placeholder="Room Name" className="font-size-1 font-size-2-xl pt-3 pb-0 pt-xl-5 pb-xl-4" />
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-5 d-flex flew-row align-items-center p-0 mb-2 mb-xl-2">
                                        <FloatingLabel
                                            controlId="panoptoAddress"
                                            label="Panopto Address"
                                            className="col text-muted font-size-1 font-size-2-xl"
                                        >
                                            <Form.Control type="text" placeholder="Panopto Address" className="font-size-2 font-size-3-xl pt-3 pb-0 pt-xl-5 pb-xl-4" />
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-5 d-flex flew-row align-items-center p-0 mb-2 mb-xl-2">
                                        <FloatingLabel
                                            controlId="wirelessAddress"
                                            label="Wireless Address"
                                            className="col text-muted font-size-1 font-size-2-xl"
                                        >
                                            <Form.Control type="text" placeholder="Wireless Address" className="font-size-2 font-size-3-xl pt-3 pb-0 pt-xl-5 pb-xl-4" />
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-5 d-flex flew-row align-items-center justify-content-start p-0 mb-2 mb-xl-2">
                                        <FloatingLabel
                                            controlId="crowdmicsAddress"
                                            label="CrowdMics Address"
                                            className="col text-muted font-size-1 font-size-2-xl"
                                        >
                                            <Form.Control type="text" placeholder="CrowdMics Address" className="font-size-2 font-size-3-xl pt-3 pb-0 pt-xl-5 pb-xl-4" />
                                        </FloatingLabel>

                                    </div>

                                </div>
                                {/* HDMI Switcher row */}
                                <div className="row flex-wrap mt-1 mb-xl-2 font-size-2 font-size-4-xl">
                                    <h3 className="text-center fw-bold mb-4 font-size-2 font-size-4-xl">Enter input # of HDMI switcher or 0 for none</h3>
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}
                                    {/* HDMI Switcher */}
                                    <div className="col-6 h-100">
                                        <div className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                            <div className="col-6 text-center">
                                                <span className="fw-bold">:0</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                    <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"><i className="bi bi-dash-circle-fill"></i></button>
                                                    <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"><i className="bi bi-plus-circle-fill"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /HDMI Switcher */}

                                </div>
                                {/* /HDMI button row */}
                                <div className="row align-items-center justify-content-around adminPresetButtonRow p-0 mt-1">
                                    <button className='btn btn-info rounded-pill border-0 px-3 py-xl-3 mb-3 presetButton'>
                                    </button>
                                    <button className='btn btn-info rounded-pill border-0 px-3 mb-3 presetButton'>
                                    </button>
                                    <button className='btn btn-info rounded-pill border-0 px-3 mb-3 presetButton'>
                                    </button>
                                    <button className='btn btn-info rounded-pill border-0 px-3 mb-3 presetButton'>
                                    </button>
                                    <button className='btn btn-info rounded-pill border-0 px-3 mb-3 presetButton'>
                                    </button>
                                    <button className='btn btn-info rounded-pill border-0 px-3 mb-3 presetButton'>
                                    </button>
                                    <button className='btn btn-info rounded-pill border-0 px-3 mb-3 presetButton'>
                                    </button>
                                    <button className='btn btn-info rounded-pill border-0 px-3 mb-3 presetButton'>
                                    </button>
                                   
                                    
                                    
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="p-1">
                            <Button variant="secondary" className="font-size-2 font-size-4-xl mx-2" onClick={handleCloseAdminModal}><i className="bi bi-x-circle me-1"></i> Cancel</Button>
                            <Button variant="info" className="font-size-2 font-size-4-xl mx-2"><i className="bi bi-arrow-clockwise me-1"></i>Reset</Button>
                            <Button variant="primary" className="font-size-2 font-size-4-xl mx-2"> <i className="bi bi-floppy-fill me-1"></i>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>

           </div>   
        </div>
    );

}


export default Header;