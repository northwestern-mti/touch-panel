import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import { Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Icon from '@mdi/react';
import { mdiBroadcastOff } from '@mdi/js';
import { mdiBroadcast } from '@mdi/js';
import Opad from './Opad';
import VolumeControl from './VolumeControl';


function DisplayArea({sourceSelected, displayJoin, side, showAnnotationJoin, showFullScreenJoin,
    annotationJoin, fullscreenJoin, powerOn, powerOff, upJoin, downJoin,showDisplayModalJoin, closeDisplayModalJoin,
    electricScreenJoin, displayIsProjectorJoin}) {
    const [ipAdd, setIpAdd] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [bluRayClicked, setBluRayClicked] = useState(false);
    const [confCallClicked, setConfCallClicked] = useState(false);
    const [showConfCallVolume, setShowConfCallVolume] = useState(false);
    const [isConfCallMuted, setIsConfCallMuted] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);
    const [isPrivacyModeEnabled, setIsPrivacyModeEnabled] = useState(false);
    const [configPrivacyMode, setConfigPrivacyMode] = useState(false)
    const [blurayButton, setBluRayButton] = useState('');
    const [powerSwitch, setPowerSwitch] = useState(false);
    const [lampSwitch, setLampSwitch] = useState(true);
    const [autoFocusSwitch, setAutoFocusSwitch] = useState(true);
    const [showAnnotation, setShowAnnotation] = useState(false);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [annotationPressed, setAnnotationPressed] = useState(false);
    const [fullscreenPressed, setFullscreenPressed] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [isElectricScreen, setIsElectricScreen] = useState(false);
    const [isProjector, setIsProjector] =  useState(false);
    const [dialString, setDialString] = useState('');
    const [confCallVolume, setConfCallVolume] = useState(0);
    const [showIncomingCall, setShowIncomingCall] = useState(false);
    const pressIntervalRef = useRef(null);


    const CrSignalNames = {
        'IpAddress' : '2',
        'ShowConfCallModal': '117',
        'CloseConfCallModal': '118',
        'ConfCall_DialString': '16',
        'ConfCall_Volume': '3',
        'ConfCall_Mute': '100',
        'ShowConfCallIncomingCall': '109',
        'ConfCall_EndCall': '105',
        'ConfCall_CallActive': '106',
        'Config_PrivacyMode': '79',
        'EnablePrivacyMode': '103',
        'ShowBlurayModal': '55',
        'CloseBlurayModal': '56',
        'DocCam_LampOn': '85',
        'DocCam_LampOff': '86',
        'DocCam_AutoFocus': '80',
        'ConfCall_DialPad_1': '281',
        'ConfCall_DialPad_2': '282',
        'ConfCall_DialPad_3': '283',
        'ConfCall_DialPad_4': '284',
        'ConfCall_DialPad_5': '285',
        'ConfCall_DialPad_6': '286',
        'ConfCall_DialPad_7': '287',
        'ConfCall_DialPad_8': '288',
        'ConfCall_DialPad_9': '289',
        'ConfCall_DialPad_0': '290',
        'ConfCall_DialPad_Star': '291',
        'ConfCall_DialPad_Pound': '292',
        'ConfCall_DialString_Clear': '104',
        'ConfCall_DialString_Backspace': '107',
        'ConfCall_CallIgnore': '108',
        'ConfCall_VolumeUp': '102',
        'ConfCall_VolumeDown': '102',
        'DocCam_ZoomOut': '83',
        'DocCam_ZoomIn': '84',
        'Bluray_Up': '271',
        'Bluray_Right':'272',
        'Bluray_Down': '273',
        'Bluray_Left': '274',
        'Bluray_Ok': '275',
        'Bluray_Previous': '57',
        'Bluray_Next': '58',
        'Bluray_Eject': '59',
        'Bluray_Home': '60',
        'Bluray_Info': '61',
        'Bluray_Menu': '62',
        'Bluray_Return': '63',
        'Bluray_Play': '64',
        'Bluray_Pause': '65',
        'Bluray_Stop': '66',
        'Bluray_Rewind': '67',
        'Bluray_Fast_Forward': '68'
    }
    const CrSignalType = {
        'Boolean' : 'b',
        'Number' : 'n',
        'String': 's',
    }
    useEffect(() => {
        window.CrComLib.subscribeState(CrSignalType.String, CrSignalNames.IpAddress, value=> setIpAdd(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${showAnnotationJoin}`, value=> setShowAnnotation(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${showFullScreenJoin}`, value=> setShowFullScreen(value)); 
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${displayJoin}`, value=> setIsMuted(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${powerOn}`, value=> setPowerSwitch(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${annotationJoin}`, value=> setAnnotationPressed(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${fullscreenJoin}`, value=> setFullscreenPressed(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${showDisplayModalJoin}`, value => setIsClicked(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowBlurayModal, value => setBluRayClicked(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowConfCallModal, value => setConfCallClicked(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${electricScreenJoin}`, value=> setIsElectricScreen(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, `${displayIsProjectorJoin}`, value=> setIsProjector(value));
        window.CrComLib.subscribeState(CrSignalType.String, CrSignalNames.ConfCall_DialString, value=> setDialString(value));
        window.CrComLib.subscribeState(CrSignalType.Number, CrSignalNames.ConfCall_Volume, value=> setConfCallVolume(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ConfCall_Mute, value=> setIsConfCallMuted(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowConfCallIncomingCall, value=> setShowIncomingCall(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ConfCall_CallActive, value=> setIsCallActive(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.Config_PrivacyMode, value=> setConfigPrivacyMode(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.EnablePrivacyMode, value=> setIsPrivacyModeEnabled(value));

        
        console.log('dialstring is ', dialString)
    }, []);
    const toggleMute = (joinNumber) => {
        setIsMuted((prevIsMuted) => !(prevIsMuted));
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
       
    }
    const handleShowDisplayModal = () => {
        console.log("Showing Display Modal")
        setIsClicked(true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${showDisplayModalJoin}`, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${showDisplayModalJoin}`, false);
      }
    const handleCloseDisplayModal = () => {
        setIsClicked(false);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${closeDisplayModalJoin}`, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${closeDisplayModalJoin}`, false);
    }
    const handleShowBluRayModal = () => {
        console.log("Showing BluRay Modal")
        setBluRayClicked(true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ShowBlurayModal, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ShowBlurayModal, false);
    }
    const handleCloseBluRayModal = () => {
        console.log("Closing BluRay Modal")
        setBluRayClicked(false);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.CloseBlurayModal, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.CloseBlurayModal, false);
    }
    const handleShowConfCallModal = () => {
        console.log("Showing ConfCall Modal")
        setConfCallClicked(true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ShowConfCallModal, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ShowConfCallModal, false);
    }
    const handleCloseConfCallModal = () => {
        console.log("Closing ConfCall Modal")
        setConfCallClicked(false);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.CloseConfCallModal, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.CloseConfCallModal, false);
    }
    const handleShowConfCallVolumeModal = () => {
        setShowConfCallVolume(true);
    }
    const handleCloseConfCallVolumeModal = () => {
        setShowConfCallVolume(false);
    }
    const toggleConfCallVolumeMute = () => { 
        setIsConfCallMuted(!isConfCallMuted);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_Mute, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_Mute, false);
    }
    const handleCloseIncomingCallModal = () => {
        setShowIncomingCall(false);
    }
    const toggleCallActive = () => { 
        setIsCallActive(!isCallActive);
        if (isCallActive) {
            window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_EndCall, true);
            window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_EndCall, false);
            console.log('On_hook: End Call')
        } else {
            window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_CallActive, true);
            window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_CallActive, false);
            console.log('On_hook: Call Active')
        }
    }

    const togglePrivacyMode = () => {
        setIsPrivacyModeEnabled(!isPrivacyModeEnabled);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.EnablePrivacyMode, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.EnablePrivacyMode, false);
      }

    const togglePowerSwitch = () => {
        setPowerSwitch(!powerSwitch)
        if (!powerSwitch) {
            window.CrComLib.publishEvent(CrSignalType.Boolean, `${powerOn}`, true);
            window.CrComLib.publishEvent(CrSignalType.Boolean, `${powerOn}`, false);
            console.log('Power On')
        } else {
            window.CrComLib.publishEvent(CrSignalType.Boolean, `${powerOff}`, true);
            window.CrComLib.publishEvent(CrSignalType.Boolean, `${powerOff}`, false);
            console.log('Power Off')
        }
    }
    const toggleLampSwitch = () => {
        setLampSwitch(!lampSwitch)
        if (!lampSwitch) {
            window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.DocCam_LampOn, true);
            window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.DocCam_LampOn, false);
            console.log('Lamp On')
        } else {
            window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.DocCam_LampOff, true);
            window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.DocCam_LampOff, false);
            console.log('Lamp Off')
        }
    }
    const toggleAutoFocusSwitch = () => {
        setAutoFocusSwitch(!autoFocusSwitch);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.DocCam_AutoFocus, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.DocCam_AutoFocus, false);
        console.log('Status of AutoFocus is: ', autoFocusSwitch)
    }

    const handleAnnotationPressed = () => {
        setAnnotationPressed(!annotationPressed)
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${annotationJoin}`, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${annotationJoin}`, false);
        console.log('state of annotation button', showAnnotation);
        console.log('state of fullscreen button', showFullScreen);
    }
    const handleFullscreenPressed = () => {
        setFullscreenPressed(!fullscreenPressed);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${fullscreenJoin}`, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${fullscreenJoin}`, false);
        console.log('state of annotation button', showAnnotation);
        console.log('state of fullscreen button', showFullScreen);
    } 
    const blurayControl = (joinNumber, press) => {
        setBluRayButton(press)
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
        console.log(`${press} pressed`)
        console.log(blurayButton)
    };
;
    const handleDialKeyPres = (joinNumber) => {
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
        console.log('pw key pressed', joinNumber)
    };

    const docCamZoom = (action) => {
        window.CrComLib.publishEvent(CrSignalType.Boolean, action === 'in' ? CrSignalNames.DocCam_ZoomIn : CrSignalNames.DocCam_ZoomOut, true);
        window.CrComLib.publishEvent(CrSignalType.Boolean, action === 'in' ? CrSignalNames.DocCam_ZoomIn : CrSignalNames.DocCam_ZoomOut, false);
        console.log('zooming', action)
    }

    const docCamZoomOnMouseDown = (action) => {
        if (pressIntervalRef.current !== null) {
            return;
          }
        
        pressIntervalRef.current = setInterval(() => {
            window.CrComLib.publishEvent(CrSignalType.Boolean, action === 'in' ? CrSignalNames.DocCam_ZoomIn : CrSignalNames.DocCam_ZoomOut, true);
            console.log('zooming', action)
        }, 200)
    }

    const docCamZoomOnMouseUp = (action) => {
        if (pressIntervalRef.current) {
            clearInterval(pressIntervalRef.current);
            pressIntervalRef.current = null;
        }
        window.CrComLib.publishEvent(CrSignalType.Boolean, action === 'in' ? CrSignalNames.DocCam_ZoomIn : CrSignalNames.DocCam_ZoomOut, false);
    }
    // Privacy Mode Popover
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header className="text-center font-size-2 font-size-3-xl fw-bold" as="h3">Privacy Mode</Popover.Header>
            <Popover.Body className="text-center px-3 py-2 font-size-2 font-size-3-xl">
                Mute audio being sent to external sources (for example, Zoom or a conference call).
                <br /><span className="font-size-1 font-size-2-xl fst-italic">Room microphones won't be affected by this setting.</span>
            </Popover.Body>
        </Popover>
    );
    
    let message;
    let displayNum;
    switch (side) {
        case 'left':
            displayNum = "One"
            break;
        case 'right':
            displayNum = "Two"
            break;
        default:
            displayNum =""
    } 
    switch(sourceSelected) {
        case 1:
            message = <p>Please use the keyboard and mouse to start.</p>;
            break;
        case 2:
            message = <p>Connect your device to start presenting.</p>;
            break;
        case 3:
            message = <span>
                <p>Enter the address below into your browser and follow the instructions
                    to present wirelessly.
                </p>
                <p className='text-info'>{(ipAdd === "") ? "123.210.123.210" : ipAdd}</p>
                </span>
            ;
            break;
        case 6:
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
                        <div className='container-fluid text-center pt-2 pt-xl-5'>
                            <div className="col-7 position-relative mx-auto">
                            <div className="d-flex flex-wrap col-6 justify-content-around mx-auto">
                                <div className="d-flex flex-row col-12 justify-content-between">
                                    
                                    <div className="col">
                                        <input readOnly className="form-control border-0 rounded-pill bg-gray-300 text-dark text-center font-size-2 font-size-3-xl p-2 p-xl-3 mb-3"
                                            placeholder='' 
                                            value={dialString}/>
                                    </div>
                                    
                                </div>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_1)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">1</span>
                                    <span className="d-block font-size-1" style={{ height: 'var(--font-size-2' }}></span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_2)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">2</span>
                                    <span className="d-block font-size-1 font-size-2-xl">ABC</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_3)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">3</span>
                                    <span className="d-block font-size-1 font-size-2-xl">DEF</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_4)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">4</span>
                                    <span className="d-block font-size-1 font-size-2-xl">GHI</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_5)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">5</span>
                                    <span className="d-block font-size-1 font-size-2-xl">JKL</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_6)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">6</span>
                                    <span className="d-block font-size-1 font-size-2-xl">MNO</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_7)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">7</span>
                                    <span className="d-block font-size-1 font-size-2-xl">PQRS</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_8)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">8</span>
                                    <span className="d-block font-size-1 font-size-2-xl">TUV</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_9)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">9</span>
                                    <span className="d-block font-size-1 font-size-2-xl">WXYZ</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_Star)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">*</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_0)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">0</span>
                                    <span className="d-block font-size-1 font-size-2-xl">+</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => handleDialKeyPres(CrSignalNames.ConfCall_DialPad_Pound)}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">#</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => {
                                        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_DialString_Clear, true);
                                        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_DialString_Clear, false);
                                        console.log('Clear pressed')
                                }}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">
                                        <i className="bi bi-x"></i>
                                    </span>
                                    <span className="d-block font-size-1 font-size-2-xl">clear</span>
                                </Button>
                                <Button
                                className={`btn btn-gray bg-success text-white rounded-circle border-0 p-0 mb-2 dialpadButton ${isCallActive ? 'bg-danger' : 'bg-success'}`} 
                                onClick={toggleCallActive}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">
                                        <i 
                                        className={`bi ${isCallActive ? 'bi-telephone-x-fill' : 'bi-telephone-fill'}`}
                                        ></i>
                                    </span>
                                </Button>
                                {/* Clear button */}
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 dialpadButton"
                                    onClick={() => {
                                        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_DialString_Backspace, true);
                                        window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_DialString_Backspace, false);
                                        console.log('backspace pressed')
                                }}>
                                    <span className="d-block fw-bold font-size-3 font-size-4-xl">
                                    <i className="bi bi-backspace-fill"></i>
                                    </span>
                                </Button>
                                {/* Clear button */}
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
                    <Modal.Header className="pb-1">
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
                            <div className="mt-4 mb-5 mt-xl-5">
                                <VolumeControl className="mx-auto" initialVolume={confCallVolume} plusJoin={CrSignalNames.ConfCall_VolumeUp} minusJoin={CrSignalNames.ConfCall_VolumeDown} isMuted={isConfCallMuted}/>
                            </div>
                            <div className="row m-0 my-xl-5"></div>
                            <div className="col-12 d-flex flex-wrap justify-content-evenly py-3">
                                <div class="col-3 text-center">
                                    <button type="button"
                                        className={`btn border-0 rounded-circle text-center mx-auto mb-3 mb-xl-4 muteIcon ${isConfCallMuted ? 'btn-info' : 'btn-gray'}`}
                                        onClick={toggleConfCallVolumeMute}>
                                        <i
                                            className={`d-inline-block bi font-size-5 font-size-5-xl mx-auto ${isConfCallMuted ? 'bi-mic-mute-fill text-white' : 'bi-mic-fill'}`}
                                        ></i>
                                    </button>
                                    <div className='font-size-3 font-size-4-xl'>{isConfCallMuted ? 'Unmute' : 'Mute'}</div>
                                </div>
                                {configPrivacyMode &&
                                    <div className="col-3 position-relative">
                                        {isPrivacyModeEnabled
                                            ? <div>
                                                <button type="button"
                                                    className={`btn d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-3 mb-xl-4 muteIcon btn-info`}
                                                    onClick={togglePrivacyMode}>
                                                    <Icon className="d-inline-block mx-auto" path={mdiBroadcastOff} size={2} />
                                                </button>
                                                <div className='font-size-3 font-size-4-xl'>
                                                    Disable Privacy Mode
                                                </div>
                                            </div>
                                            : <div>
                                                <button type="button"
                                                    className={`btn d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-3 mb-xl-4 muteIcon btn-gray`}
                                                    onClick={togglePrivacyMode}>
                                                    <Icon className="d-inline-block mx-auto" path={mdiBroadcast} size={2} />
                                                </button>
                                                <div className='font-size-3 font-size-4-xl'>
                                                    Enable Privacy Mode
                                                </div>
                                            </div>
                                        }
                                        <div className="position-absolute top-0 start-100 translate-middle">
                                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                                <a className="ms-3">
                                                    <i
                                                        className={`d-block bi bi-info-circle-fill font-size-4 font-size-5-xl`}
                                                    ></i>
                                                </a>
                                            </OverlayTrigger>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* /Conference Volume Modal */}
                {/* /Conference Incoming Call Modal */}
                <Modal show={showIncomingCall} onHide={handleCloseIncomingCallModal} fullscreen={fullscreen}>
                    <Modal.Header className="pb-0">
                        <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                        <h1 className="font-size-5 font-size-6-xl">
                            <button type="button" className="border-0 text-dark"
                            onClick={handleCloseIncomingCallModal}><i class="bi bi-arrow-left"></i></button>Incoming Telephone Call</h1>
                        <button type="button" className="border-0 text-muted"
                            onClick={handleCloseIncomingCallModal}><i class="bi bi-x-lg"></i></button>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="font-size-4 font-size-5-xl p-0">
                        <div className='container-fluid text-center p-5'>
                        <div className="mb-xl-5">Would you like to pick up the call?</div>
                        <div className='d-flex justify-content-center mt-5'>
                            <button className='btn btn-danger col-4 rounded-pill px-5 text-white mx-3'
                                onClick={() => {
                                    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_CallIgnore, true);
                                    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ConfCall_CallIgnore, false);
                                    console.log('Call ignored')
                                }}>
                                Ignore
                            </button>
                            <button className='btn btn-success col-4 rounded-pill px-5 mx-3 text-white' 
                                onClick={() => {
                                    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ShowConfCallIncomingCall, true);
                                    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalNames.ShowConfCallIncomingCall, false);
                                    console.log('Call picked up')
                                }}>
                                Answer
                            </button>
                        </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* /Conference Incoming Call Modal */}
            </span>;
            break;
        case 5:
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
                            <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-4-xl" 
                              onClick={() => docCamZoom('out')}
                              onMouseDown={() => docCamZoomOnMouseDown('out')}
                              onMouseUp={() => docCamZoomOnMouseUp('out')}
                              onMouseLeave={() => docCamZoomOnMouseUp('out')}
                              onTouchStart={() => docCamZoomOnMouseDown('out')}
                              onTouchEnd={() => docCamZoomOnMouseUp('out')}
                              onTouchCancel={() => docCamZoomOnMouseUp('out')}>
                                <i className="bi bi-dash-circle-fill"></i>
                            </button>
                            <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-4-xl" 
                              onClick={() => docCamZoom('in')}
                              onMouseDown={() => docCamZoomOnMouseDown('in')}
                              onMouseUp={() => docCamZoomOnMouseUp('in')}
                              onMouseLeave={() => docCamZoomOnMouseUp('in')}
                              onTouchStart={() => docCamZoomOnMouseDown('in')}
                              onTouchEnd={() => docCamZoomOnMouseUp('in')}
                              onTouchCancel={() => docCamZoomOnMouseUp('in')}>
                                <i className="bi bi-plus-circle-fill"></i>
                            </button>
                        </div>
                        <label className="d-block font-size-2 font-size-4-xl"
                            for="Zoom buttons"><i className="bi bi-zoom-in"></i> Zoom</label>
                    </div>
                    {/* /Zoom buttons */}
                </div>
                {/* /Document Camera settings */}
            </span>;
            break;
        case 4:
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
                                <Opad centerButton={true} upJoin={CrSignalNames.Bluray_Up} downJoin={CrSignalNames.Bluray_Down}
                                    leftJoin={CrSignalNames.Bluray_Left} rightJoin={CrSignalNames.Bluray_Right} centerJoin={CrSignalNames.Bluray_Ok}/>
                            </div>
                            {/* Media Buttons Row */}
                            <div className='d-flex flex-row mx-auto my-2 mb-2 mb-xl-5'>
                                <button className='btn btn-white border border-1 position-relative rounded-circle mx-auto pt-2 blurayControls'
                                    onClick={() => { blurayControl(CrSignalNames.Bluray_Eject, 'Eject') }}>
                                        <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-eject-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl(CrSignalNames.Bluray_Previous, 'Previous')}>
                                     <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-skip-backward-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl(CrSignalNames.Bluray_Rewind, 'Rewind')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-rewind-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl(CrSignalNames.Bluray_Pause, 'Pause')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-pause-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl(CrSignalNames.Bluray_Play, 'Play')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-play-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl(CrSignalNames.Bluray_Stop, 'Stop')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-stop-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl(CrSignalNames.Bluray_Fast_Forward, 'Fast Forward')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-fast-forward-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                                <button className='position-relative btn btn-white border border-1 rounded-circle  mx-auto pt-2 blurayControls'
                                    onClick={() => blurayControl(CrSignalNames.Bluray_Next, 'Next')}>
                                    <i className="d-inline-block position-absolute top-50 start-50 translate-middle bi bi-skip-forward-fill font-size-5 font-size-5-xl mx-auto"></i>
                                </button>
                            </div>
                            {/* /Media Buttons Row */}
                            {/* Menu Buttons Group */}
                            <div className='d-flex flex-row flex-wrap justify-content-center'>
                                <button className='btn btn-info col-4 rounded-pill border-0 my-3 mx-3 font-size-3 font-size-4-xl' onClick={() => blurayControl(CrSignalNames.Bluray_Home, 'Home')}>
                                    <i className="d-inline-block bi bi-house-fill me-1"></i>
                                    Home</button>
                                <button className='btn btn-info col-4 rounded-pill border-0 my-3 mx-3 font-size-3 font-size-4-xl' onClick={() => blurayControl(CrSignalNames.Bluray_Menu, 'Menu')}>
                                    <i className="d-inline-block bi bi-list me-1"></i>
                                    Menu</button>
                                <button className='btn btn-info col-4 rounded-pill border-0 my-3 mx-3 font-size-3 font-size-4-xl' onClick={() => blurayControl(CrSignalNames.Bluray_Info, 'Info')}>
                                    <i className="d-inline-block bi bi-info-circle-fill me-1"></i>
                                    Info</button>
                                <button className='btn btn-info col-4 rounded-pill border-0 my-3 mx-3 font-size-3 font-size-4-xl' onClick={() => blurayControl(CrSignalNames.Bluray_Return, 'Return')}>
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
                { !powerSwitch ? 
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
                {(isProjector && powerSwitch) &&
                <div className="col p-0">
                    <button type="button"
                        className={`d-flex align-items-center border-0 rounded-circle text-center  mx-auto mb-2  circleIcon ${isMuted ? 'bg-info text-white' : 'bg-gray-300 text-dark'}`}
                        data-bs-toggle="button" onClick={() => toggleMute(displayJoin)}>
                        <i
                            className={`d-inline-block  font-size-4 font-size-5-xl mx-auto ${isMuted ? 'bi bi-camera-video-off' : 'bi bi-camera-video-fill'}`}></i>
                    </button>
                    <div className="font-size-2 font-size-3-xl">{isMuted ? 'Unmute Display' : 'Mute Display'}</div> 
                </div>}
                    
                <div className='col p-0'>
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
                            {showAnnotation && 
                                <div className="col-4">
                                    <button type="button"
                                        className={`d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-2 circleIcon ${annotationPressed ? 'text-white' : 'text-dark'}`}
                                        style={{backgroundColor:annotationPressed ? 'var(--bs-info' : 'var(--bs-gray-300'}} onClick={handleAnnotationPressed}>
                                        <i className="d-inline-block bi bi-pencil-fill font-size-4 font-size-5-xl mx-auto"></i>
                                    </button>
                                    <div className="font-size-3 font-size-4-xl">Annotate</div>
                                </div>}
                            {showFullScreen && 
                                <div className="col-4">
                                    <button type="button"
                                        className={`d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-2 circleIcon ${fullscreenPressed ? 'text-white' : 'text-dark'}`}
                                        style={{backgroundColor:fullscreenPressed ? 'var(--bs-info' : 'var(--bs-gray-300'}} onClick={handleFullscreenPressed}>
                                        <i className="d-inline-block bi bi-arrows-fullscreen font-size-4 font-size-5-xl mx-auto"></i>
                                    </button>
                                    <div className="font-size-3 font-size-4-xl">Preview Fullscreen</div>
                                </div>}
                            {(isProjector && powerSwitch) &&
                                <div className="col-4">
                                    <button type="button"
                                        className={`d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-2 circleIcon ${isMuted ? 'text-white' : 'text-dark'}`}
                                        style={{backgroundColor:isMuted ? 'var(--bs-info' : 'var(--bs-gray-300'}} onClick={() => toggleMute(displayJoin)}>
                                        <i className={`d-inline-block bi ${isMuted ? 'bi-camera-video-off-fill' : 'bi-camera-video-fill'}  font-size-4 font-size-5-xl mx-auto`}></i>
                                    </button>
                                    <div className="font-size-3 font-size-4-xl">Mute Display</div>
                                </div>}

                        </div>
                     {/* /Options */}
                     {/* Screen Position Buttons */}
                     {isElectricScreen &&
                        <div className="row">
                            <div className="col text-center">
                                <div className="my-2 my-xl-3">
                                    {/* Down Button */}
                                    <button type="button"
                                        className="btn btn-info col-4 border-0 rounded-pill py-2 me-3 text-white fw-bold font-size-3" onClick={() => {
                                            window.CrComLib.publishEvent(CrSignalType.Boolean, `${downJoin}`, true);
                                            window.CrComLib.publishEvent(CrSignalType.Boolean, `${downJoin}`, false);
                                            console.log('Screen downed')
                                        }}><i
                                            className="d-inline-block bi bi-chevron-down font-size-4 font-size-5-xl mx-auto"></i></button>
                                    {/* Up Button */}
                                    <button type="button"
                                        className="btn btn-info col-4 border-0 rounded-pill py-2 text-white fw-bold font-size-3"><i
                                            className="d-inline-block bi bi-chevron-up font-size-4 font-size-5-xl mx-auto" onClick={() => {
                                                window.CrComLib.publishEvent(CrSignalType.Boolean, `${upJoin}`, true);
                                                window.CrComLib.publishEvent(CrSignalType.Boolean, `${upJoin}`, false);
                                                console.log('Screen upped')
                                            }}></i></button>
                                </div>
                                <span className="d-inline-block font-size-3 font-size-4-xl">Screen Position</span>
                            </div>
                        </div>}
                        {/* /Screen Position Buttons */}
                    </div>
                </Modal.Body>
            </Modal> 
        </div>
    )
}

export default DisplayArea;