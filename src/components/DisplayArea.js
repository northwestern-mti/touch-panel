import * as React from 'react';
import { useState, useEffect } from "react";
import { Button, Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import CModal from './CModal';
import Opad from './Opad';
import VolumeControl from './VolumeControl';


function DisplayArea({sourceSelected, displayJoin, side, showAnnotationJoin, showFullScreenJoin,
     annotationJoin, fullscreenJoin, powerOn, powerOff, upJoin, downJoin}) {
    const [ipAdd, setIpAdd] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [bluRayClicked, setBluRayClicked] = useState(false);
    const [confCallClicked, setConfCallClicked] = useState(false);
    const [showConfCallVolume, setShowConfCallVolume] = useState(false);
    const [isConfCallMuted, setIsConfCallMuted] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);
    const [blurayButton, setBluRayButton] = useState('');
    const [powerSwitch, setPowerSwitch] = useState(true);
    const [lampSwitch, setLampSwitch] = useState(true);
    const [autoFocusSwitch, setAutoFocusSwitch] = useState(true);
    const [showAnnotation, setShowAnnotation] = useState(false);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [annotationPressed, setAnnotationPressed] = useState(false);
    const [fullscreenPressed, setFullscreenPressed] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    useEffect(() => {
        window.CrComLib.subscribeState('s', '2', value=> setIpAdd(value));
        window.CrComLib.subscribeState('b', `${showAnnotationJoin}`, value=> setShowAnnotation(value));
        window.CrComLib.subscribeState('s', `${showFullScreenJoin}`, value=> setShowFullScreen(value)); 
        
    }, []);
    const toggleMute = (joinNumber) => {
        setIsMuted((prevIsMuted) => !(prevIsMuted));
        if (isMuted) {
            window.CrComLib.publishEvent('b', `${joinNumber}`, false);
            console.log('display unmuted')
        } else{
            window.CrComLib.publishEvent('b', `${joinNumber}`, true);
            console.log('display muted')
        }
    }
    const handleShowDisplayModal = () => {
        console.log("Showing Display Modal")
        setIsClicked(true);
      }
    const handleCloseDisplayModal = () => {
        setIsClicked(false);
    }
    const handleShowBluRayModal = () => {
        console.log("Showing BluRay Modal")
        setBluRayClicked(true);
    }
    const handleCloseBluRayModal = () => {
        console.log("Closing BluRay Modal")
        setBluRayClicked(false);
    }
    const handleShowConfCallModal = () => {
        console.log("Showing ConfCall Modal")
        setConfCallClicked(true);
    }
    const handleCloseConfCallModal = () => {
        console.log("Closing ConfCall Modal")
        setConfCallClicked(false);
    }
    const handleShowConfCallVolumeModal = () => {
        setShowConfCallVolume(true);
    }
    const handleCloseConfCallVolumeModal = () => {
        setShowConfCallVolume(false);
    }
    const toggleConfCallVolumeMute = () => { 
        setIsConfCallMuted(!isConfCallMuted);
    }
    const toggleCallActive = () => { 
        setIsCallActive(!isCallActive);
    }

    const togglePowerSwitch = () => {
        setPowerSwitch(!powerSwitch)
        if (!powerSwitch) {
            window.CrComLib.publishEvent('b', `${powerOn}`, true);
            window.CrComLib.publishEvent('b', `${powerOn}`, false);
            console.log('Power On')
        } else {
            window.CrComLib.publishEvent('b', `${powerOff}`, true);
            window.CrComLib.publishEvent('b', `${powerOff}`, false);
            console.log('Power Off')
        }
    }
    const toggleLampSwitch = () => {
        setLampSwitch(!lampSwitch)
        if (!lampSwitch) {
            window.CrComLib.publishEvent('b', '85', true);
            window.CrComLib.publishEvent('b', '85', false);
            console.log('Lamp On')
        } else {
            window.CrComLib.publishEvent('b', '86', true);
            window.CrComLib.publishEvent('b', '86', false);
            console.log('Lamp Off')
        }
    }
    const toggleAutoFocusSwitch = () => {
        setAutoFocusSwitch(!autoFocusSwitch)
        if (!autoFocusSwitch) {
            window.CrComLib.publishEvent('b', '81', true);
            window.CrComLib.publishEvent('b', '81', false);
            console.log('AutoFocus On')
        } else {
            window.CrComLib.publishEvent('b', '82', true);
            window.CrComLib.publishEvent('b', '82', false);
            console.log('AutoFocus Off')
        }
    }

    const handleAnnotationPressed = () => {
        setAnnotationPressed(!annotationPressed)
        if (!powerSwitch) {
            window.CrComLib.publishEvent('b', `${annotationJoin}`, true);
            window.CrComLib.publishEvent('b', `${annotationJoin}`, false);
            console.log('Power On')
        } else {
            window.CrComLib.publishEvent('b', `${annotationJoin}`, true);
            window.CrComLib.publishEvent('b', `${annotationJoin}`, false);
            console.log('Power Off')
        }
    }
    const handleFullscreenPressed = () => {
        setFullscreenPressed(!fullscreenPressed)
        if (!powerSwitch) {
            window.CrComLib.publishEvent('b', `${fullscreenJoin}`, true);
            window.CrComLib.publishEvent('b', `${fullscreenJoin}`, false);
            console.log('Power On')
        } else {
            window.CrComLib.publishEvent('b', `${fullscreenJoin}`, true);
            window.CrComLib.publishEvent('b', `${fullscreenJoin}`, false);
            console.log('Power Off')
        }
    } 
    const blurayControl = (joinNumber, press) => {
        setBluRayButton(press)
        window.CrComLib.publishEvent('b', `${joinNumber}`, true);
        window.CrComLib.publishEvent('b', `${joinNumber}`, false);
        console.log(`${press} pressed`)
        console.log(blurayButton)
    }
    let message;
    let displayNum;
    switch (side) {
        case 'left':
            displayNum = "One"
            break;
        case 'right':
            displayNum = "Two"
            break;
    } 
    switch(sourceSelected) {
        case 'PC':
            message = <p>Please use the keyboard and mouse to start.</p>;
            break;
        case 'Laptop':
            message = <p>Connect your device to start presenting.</p>;
            break;
        case 'Wireless':
            message = <span>
                <p>Enter the address below into your browser and follow the instructions
                    to present wirelessly.
                </p>
                <p className='text-info'>{(ipAdd == "") ? "123.210.123.210" : ipAdd}</p>
                </span>
            ;
            break;
        case 'ConfCall':
            message = <span>
                <p>Select the button below to dial your number.</p>
                <Button 
                className="btn btn-info rounded-pill border-0 px-3 mt-3 font-size-3 font-size-4-xl"
                onClick={handleShowConfCallModal}
                >Conference Call</Button>
                {/* Conference Call Modal */}
                <Modal show={confCallClicked} onHide={handleCloseConfCallModal} fullscreen={fullscreen}>
                    <Modal.Header className="pb-1">
                        <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                            <h1 className="font-size-5 font-size-6-xl">
                                <button type="button" className="border-0 text-dark"
                                    onClick={handleCloseConfCallModal}><i class="bi bi-arrow-left"></i></button>Conference Call</h1>
                            <button type="button" className="border-0 text-muted"
                                onClick={handleCloseConfCallModal}><i class="bi bi-x-lg"></i></button>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="font-size-2 font-size-3-xl p-0">
                        <div className='container-fluid text-center pt-3 pt-xl-5'>
                            <div className="col-7 position-relative mx-auto">
                            <div className="d-flex flex-wrap col-6 justify-content-around mx-auto">
                                <div className="d-flex flex-row col-12 justify-content-between">
                                    <div className="col-10">
                                        <input className="form-control border-0 rounded-pill bg-gray-300 text-muted text-center font-size-1 font-size-3-xl p-2 mb-3"
                                            placeholder='847-555-5555' />
                                    </div>
                                    <div className="col pt-2">
                                        <i className="bi bi-backspace-fill"></i>
                                    </div>
                                </div>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">1</span>
                                    <span className="d-block font-size-1" style={{ height: 'var(--font-size-2' }}></span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">2</span>
                                    <span className="d-block font-size-1 font-size-2-xl">ABC</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">3</span>
                                    <span className="d-block font-size-1 font-size-2-xl">DEF</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">4</span>
                                    <span className="d-block font-size-1 font-size-2-xl">GHI</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">5</span>
                                    <span className="d-block font-size-1 font-size-2-xl">JKL</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">6</span>
                                    <span className="d-block font-size-1 font-size-2-xl">MNO</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">7</span>
                                    <span className="d-block font-size-1 font-size-2-xl">PQRS</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">8</span>
                                    <span className="d-block font-size-1 font-size-2-xl">TUV</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">9</span>
                                    <span className="d-block font-size-1 font-size-2-xl">WXYZ</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">*</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">0</span>
                                    <span className="d-block font-size-1 font-size-2-xl">+</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">#</span>
                                </Button>
                                <Button
                                className={`btn btn-gray bg-success text-white rounded-circle border-0 p-0 mb-2 dialpadButton ${isCallActive ? 'bg-danger' : 'bg-success'}`} onClick={toggleCallActive}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">
                                        <i 
                                        className={`bi ${isCallActive ? 'bi-telephone-x-fill' : 'bi-telephone-fill'}`}
                                        ></i>
                                    </span>
                                </Button>
                            </div>
                            <Button className="btn btn-secondary position-absolute top-50 start-100 translate-middle rounded-circle border-0 p-0 mb-2 dialpadButton" onClick={handleShowConfCallVolumeModal}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">
                                        <i className="bi bi-volume-up-fill"></i>
                                    </span>
                            </Button>
                            </div>

                        </div>
                    </Modal.Body>
                </Modal>
                {/* /Conference Call Modal */}
                {/* Conference Call Volume Modal */}
                <Modal show={showConfCallVolume} onHide={handleCloseConfCallVolumeModal} fullscreen={fullscreen}>
                    <Modal.Header>
                        <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                            <h1 className="font-size-5 font-size-6-xl">
                                <button type="button" className="border-0 text-dark"
                                    onClick={handleCloseConfCallVolumeModal}><i class="bi bi-arrow-left"></i></button>Conference Call Volume</h1>
                            <button type="button" className="border-0 text-muted"
                                onClick={handleCloseConfCallVolumeModal}><i class="bi bi-x-lg"></i></button>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="font-size-2 font-size-3-xl p-0">
                        <div className='container-fluid text-center pt-5'>
                            <div className="my-5">
                                <VolumeControl className="mx-auto" />
                            </div>
                            <div class="col-12 text-center">
                                <button type="button"
                                    className={`btn border-0 rounded-circle text-center mx-auto mb-3 mb-xl-4 muteIcon ${isConfCallMuted ? 'btn-info' : 'btn-gray'}`}
                                    onClick={toggleConfCallVolumeMute}>
                                    <i
                                        className={`d-inline-block bi font-size-5 font-size-5-xl mx-auto ${isConfCallMuted ? 'bi-mic-mute-fill text-white' : 'bi-mic-fill'}`}
                                    ></i>
                                </button>
                                <div className='font-size-3 font-size-4-xl'>{isConfCallMuted ? 'Unmute' : 'Mute'}</div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* /Conference Volume Modal */}
            </span>;
            break;
        case 'DocCam':
            message = <span>
                {/* /Document Camera settings */}
                <div className="col d-flex flex-row flex-wrap justify-content-around text-center font-size-3 font-size-4-xl py-3">
                    <div className="col-6 p-0 mb-3 mb-xl-5">
                        <div className="form-switch p-0">
                            <input
                                className={`form-check-input m-0 mb-3 mediumSwitch ${autoFocusSwitch ? 'customSwitchCheck' : ''}`}
                                type="checkbox"
                                role="switch"
                                id='autoFocusSwitch'
                                checked={autoFocusSwitch}
                                onChange={toggleAutoFocusSwitch}
                            />
                            <label className="d-block form-check-label font-size-2 font-size-4-xl"
                                htmlFor="autoFocusSwitch"><i className="bi bi-camera"></i> Autofocus</label>
                        </div>
                    </div>
                    <div className="col-6 p-0 mb-3 mb-xl-5">
                        <div className="form-switch p-0">
                            <input 
                            className={`form-check-input m-0 mb-3 mediumSwitch ${lampSwitch ? 'customSwitchCheck' : ''}`}
                            type="checkbox"
                            role="switch"
                            id='lampSwitch'
                            checked={lampSwitch}
                            onChange={toggleLampSwitch}                      
                            />
                                <label className="d-block form-check-label font-size-2 font-size-4-xl"
                                    htmlFor="lampSwitch"><i className="bi bi-lightbulb-fill"></i> Lamp</label>
                        </div>
                    </div>
                    {/* Zoom buttons */}
                    <div className="col-12 mb-2">
                        <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                            <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-4-xl" onClick={() => {
                            window.CrComLib.publishEvent('b', '83', true);
                            window.CrComLib.publishEvent('b', '83', false);
                            console.log('DocCam Zooming Out') 
                        }}><i className="bi bi-dash-circle-fill"></i></button>
                            <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-4-xl" onClick={() => {
                            window.CrComLib.publishEvent('b', '84', true);
                            window.CrComLib.publishEvent('b', '84', false);
                            console.log('DocCam Zooming In') 
                        }}><i className="bi bi-plus-circle-fill"></i></button>
                        </div>
                        <label className="d-block font-size-2 font-size-4-xl"
                            for="Zoom buttons"><i className="bi bi-zoom-in"></i> Zoom</label>
                    </div>
                    {/* /Zoom buttons */}
                </div>
                {/* /Document Camera settings */}
            </span>;
            break;
        case 'BluRay':
            message = <div>
                <p>Your Blu-Ray content is being displayed.</p>
                <button className='btn btn-info rounded-pill border-0 px-3 mt-3 font-size-3 font-size-4-xl' onClick={handleShowBluRayModal}>
                    Blu-Ray Controls</button>
                
                {/* Blu-Ray Modal */}
                <Modal show={bluRayClicked} onHide={handleCloseBluRayModal} fullscreen={fullscreen}>
                    <Modal.Header className="pb-0">
                        <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                            <h1 className="font-size-5 font-size-6-xl">
                                <button type="button" className="border-0 text-dark"
                                    onClick={handleCloseBluRayModal}><i class="bi bi-arrow-left"></i></button>Blu-Ray Controls</h1>
                            <button type="button" className="border-0 text-muted"
                                onClick={handleCloseBluRayModal}><i class="bi bi-x-lg"></i></button>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="font-size-2 font-size-3-xl p-0">
                        <div className='container-fluid text-center'>
                            {/* Opad Control */}
                            <div className='col-3 mx-auto pt-2 mb-3 mb-xl-5'>
                                <Opad centerButton={true} upJoin='271' downJoin='273'
                                    leftJoin='274' rightJoin='272' centerJoin='275' />
                            </div>
                            {/* Media Buttons Row */}
                            <div className='d-flex flex-row mx-auto my-2 mb-2 mb-xl-5'>
                                <button className='btn btn-white border border-1 position-relative rounded-circle mx-auto pt-2 blurayControls'
                                    onClick={() => { blurayControl('59', 'Eject') }}>
                                        <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-eject-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl('57', 'Previous')}>
                                     <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-skip-backward-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl('67', 'Rewind')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-rewind-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl('65', 'Pause')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-pause-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl('64', 'Play')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-play-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl('66', 'Stop')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-stop-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl('68', 'Fast Forward')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-fast-forward-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl('58', 'Next')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-skip-forward-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                            </div>
                            {/* /Media Buttons Row */}
                            {/* Menu Buttons Group */}
                            <div className='d-flex flex-row flex-wrap justify-content-center'>
                                <button className='btn btn-info col-4 rounded-pill border-0 my-3 mx-3 font-size-3 font-size-4-xl' onClick={() => blurayControl('60', 'Home')}>
                                    <i className="d-inline-block bi bi-house-fill me-1"></i>
                                    Home</button>
                                <button className='btn btn-info col-4 rounded-pill border-0 my-3 mx-3 font-size-3 font-size-4-xl' onClick={() => blurayControl('62', 'Menu')}>
                                    <i className="d-inline-block bi bi-list me-1"></i>
                                    Menu</button>
                                <button className='btn btn-info col-4 rounded-pill border-0 my-3 mx-3 font-size-3 font-size-4-xl' onClick={() => blurayControl('61', 'Info')}>
                                    <i className="d-inline-block bi bi-info-circle-fill me-1"></i>
                                    Info</button>
                                <button className='btn btn-info col-4 rounded-pill border-0 my-3 mx-3 font-size-3 font-size-4-xl' onClick={() => blurayControl('63', 'Return')}>
                                    <i className="d-inline-block bi bi-arrow-left me-1"></i>
                                    Return</button>
                            </div>
                            {/* /Menu Buttons Group */}
                        </div>
                    </Modal.Body>
            </Modal> 
            </div>;
            break;
        default:
            message = <p>Select a source to the {side} to present.</p>
    }
    return(
        <div className="col-12">
            <div className="row m-0">
                {(sourceSelected == '') ? 
                    <div className='col bg-dark text-white text-center font-size-3 font-size-4-xl p-2 p-xl-3 sourceStatus'>
                        <p>Display {displayNum} is off.</p>
                    </div> : 
                    <div className={`col text-center font-size-3 font-size-4-xl p-2 p-xl-3 sourceStatus ${(isMuted ? 'bg-warning' : 'bg-success')}`}>
                        <p>{isMuted ? `Display ${displayNum} is muted.` : `Display ${displayNum} is on.`}</p>
                    </div>}
            </div>

            <div className="row p-0 m-0">
                <div className="col text-center font-size-3 font-size-4-xl py-3 contentArea">
                {message}
                </div>
            </div>

            {/* Button Row */}
            <div className="row align-items-center m-0 text-center font-size-2 font-size-3-xl contentAreaButtonRow">
                {isMuted ?
                    <div className="col-6 p-0">
                        <button type="button"
                            className="d-flex align-items-center border-0 rounded-circle text-center text-white mx-auto mb-2 bg-info circleIcon"
                             data-bs-toggle="button" onClick={() => toggleMute(displayJoin)}>
                            <i
                                className="d-inline-block bi bi-camera-video-off font-size-4 font-size-5-xl mx-auto"></i>
                        </button>
                        <div className="font-size-2 font-size-3-xl">Unmute Display</div>
                    </div> :
                    <div className="col-6 p-0">
                        <button type="button"
                            className="d-flex align-items-center border-0 rounded-circle text-center text-dark mx-auto mb-2 bg-gray-300 circleIcon"
                            data-bs-toggle="button" onClick={() => toggleMute(displayJoin)}>
                            <i className="d-inline-block bi bi-camera-video-fill font-size-4 font-size-5-xl mx-auto"></i>
                        </button>
                        <div className="font-size-2 font-size-3-xl">Mute Display</div>
                    </div>}
                    <div className='col-6 p-0'>
                    {isClicked ? 
                          <button type="button"
                          className="d-flex align-items-center border-0 rounded-circle text-center text-dark mx-auto mb-2 bg-info circleIcon"
                            data-bs-toggle="modal" data-bs-target="#displaySettingsModal">
                          <i className="d-inline-block bi bi-gear-fill font-size-4 font-size-5-xl mx-auto"></i>
                      </button> :
                        <button type="button"
                        className="d-flex align-items-center border-0 rounded-circle text-center text-dark mx-auto mb-2 bg-gray-300 circleIcon"
                        onClick={handleShowDisplayModal}>
                        <i className="d-inline-block bi bi-gear-fill font-size-4 font-size-5-xl mx-auto"></i>
                    </button>}
                    <div className='font-size-2 font-size-3-xl'>Display Settings</div> 
                </div>
            </div>

            {/* Display Settings Modal */}
            <Modal show={isClicked} fullscreen={fullscreen} onHide={handleCloseDisplayModal}>
                <Modal.Header className="pb-0">
                    <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                        <h1 className="font-size-5 font-size-6-xl">
                            <button type="button" className="border-0 text-dark"
                                onClick={handleCloseDisplayModal}><i class="bi bi-arrow-left"></i></button>Display Settings</h1>
                        <button type="button" className="border-0 text-muted"
                            onClick={handleCloseDisplayModal}><i class="bi bi-x-lg"></i></button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-size-2 font-size-3-xl p-0 pt-xl-3"> 
                <div className='container-fluid text-center'>
                        <h2 className='font-size-5 font-size-6-xl my-1 my-xl-2'>Display {displayNum}</h2>
                        {/* Power Button */}
                        <div className="row my-4 my-xl-5">
                            <div className="col text-center mx-auto">
                                <div className="form-switch p-0">
                                    <input
                                        className={`form-check-input m-0 mb-4 largeSwitch ${powerSwitch ? 'customSwitchCheck' : ''}`}
                                        // className="form-check-input m-0 mb-4 border-0 largeSwitch"
                                        type="checkbox"
                                        role="switch"
                                        id="powerSwitch"
                                        checked={powerSwitch}
                                        onChange={togglePowerSwitch}
                                    />
                                    <label className="d-block form-check-label font-size-3 font-size-4-xl"
                                        htmlfor="powerSwitch">Power</label>
                                </div>
                            </div>
                        </div>
                        {/* /Power Button */}
                        {/* Options */}
                        <div className="row justify-content-around mb-4 mb-xl-5">
                            <div className="col-4">
                                <button type="button"
                                    className={`d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-2 circleIcon ${annotationPressed ? 'text-white' : 'text-dark'}`}
                                    style={{backgroundColor:annotationPressed ? 'var(--bs-info' : 'var(--bs-gray-300'}} onClick={handleAnnotationPressed}>
                                    <i className="d-inline-block bi bi-pencil-fill font-size-4 font-size-5-xl mx-auto"></i>
                                </button>
                                <div className="font-size-3 font-size-4-xl">Annotate</div>
                            </div>
                            <div className="col-4">
                                 <button type="button"
                                    className={`d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-2 circleIcon ${fullscreenPressed ? 'text-white' : 'text-dark'}`}
                                    style={{backgroundColor:fullscreenPressed ? 'var(--bs-info' : 'var(--bs-gray-300'}} onClick={handleFullscreenPressed}>
                                    <i className="d-inline-block bi bi-arrows-fullscreen font-size-4 font-size-5-xl mx-auto"></i>
                                </button>
                                <div className="font-size-3 font-size-4-xl">Preview Fullscreen</div>
                            </div>
                            <div className="col-4">
                                <button type="button"
                                    className={`d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-2 circleIcon ${isMuted ? 'text-white' : 'text-dark'}`}
                                    style={{backgroundColor:isMuted ? 'var(--bs-info' : 'var(--bs-gray-300'}} onClick={() => toggleMute(displayJoin)}>
                                    <i className={`d-inline-block bi ${isMuted ? 'bi-camera-video-off-fill' : 'bi-camera-video-fill'}  font-size-4 font-size-5-xl mx-auto`}></i>
                                </button>
                                <div className="font-size-3 font-size-4-xl">Mute Display</div>
                            </div>

                        </div>
                     {/* /Options */}
                     {/* Screen Position Buttons */}
                        <div className="row">
                            <div className="col text-center">
                                <div className="my-2 my-xl-3">
                                    {/* Down Button */}
                                    <button type="button"
                                        className="btn btn-info col-4 border-0 rounded-pill py-2 me-3 text-white fw-bold font-size-3" onClick={() => {
                                            window.CrComLib.publishEvent('b', `${downJoin}`, true);
                                            window.CrComLib.publishEvent('b', `${downJoin}`, false);
                                            console.log('Screen downed')
                                        }}><i
                                            className="d-inline-block bi bi-chevron-down font-size-4 font-size-5-xl mx-auto"></i></button>
                                    {/* Up Button */}
                                    <button type="button"
                                        className="btn btn-info col-4 border-0 rounded-pill py-2 text-white fw-bold font-size-3"><i
                                            className="d-inline-block bi bi-chevron-up font-size-4 font-size-5-xl mx-auto" onClick={() => {
                                                window.CrComLib.publishEvent('b', `${upJoin}`, true);
                                                window.CrComLib.publishEvent('b', `${upJoin}`, false);
                                                console.log('Screen upped')
                                            }}></i></button>
                                </div>
                                <span className="d-inline-block font-size-3 font-size-4-xl">Screen Position</span>
                            </div>
                        </div>
                        {/* /Screen Position Buttons */}
                    </div>
                </Modal.Body>
            </Modal> 
        </div>
    )
}

export default DisplayArea;