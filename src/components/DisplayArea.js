import * as React from 'react';
import { useState, useEffect } from "react";
import { Button, Row, Col} from 'react-bootstrap';
import CModal from './CModal';
import Opad from './Opad';
import Camera2 from './Icons/camera2.svg';
import Lamp from './Icons/lightbulb-fill.svg';
import Zoom from "./Icons/zoom-in.svg";
import Pencil from "./Icons/pencil-fill.svg";
import PencilWhite from "./Icons/pencil-fill-white.svg";
import Fullscreen from './Icons/arrows-fullscreen.svg';
import FullscreenWhite from './Icons/arrows-fullscreen-white.svg';
import CameraIconFillWhite from './Icons/camera-video-fill-white.svg';
import CameraOffFill from './Icons/camera-video-off-fill.svg';
import UpArrow from './Icons/chevron-up.svg';
import DownArrow from './Icons/chevron-down.svg';
import MinusWhite from './Icons/dashWhite.svg';
import PlusWhite from './Icons/plusWhite.svg';
import Eject from './Icons/eject-fill.svg'
import RewindEnd from './Icons/skip-backward-fill.svg';
import Rewind from './Icons/rewind-fill.svg';
import Play from './Icons/play-fill.svg';
import Pause from './Icons/pause-fill.svg';
import Stop from './Icons/stop-fill.svg';
import FastForward from './Icons/fast-forward-fill.svg';
import FastForwardEnd from './Icons/skip-forward-fill.svg';
import House from './Icons/house-fill.svg';
import Menu from './Icons/list.svg';
import ReturnArrow from './Icons/arrow-left-short.svg';
import InfoIcon from './Icons/info-circle-fill.svg';
import Dpad from './Icons/dpad.svg'

function DisplayArea({sourceSelected, displayJoin, side, showAnnotationJoin, showFullScreenJoin,
     annotationJoin, fullscreenJoin, powerOn, powerOff, upJoin, downJoin}) {
    const [ipAdd, setIpAdd] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [bluRayClicked, setBluRayClicked] = useState(false);
    const [blurayButton, setBluRayButton] = useState('');
    const [powerSwitch, setPowerSwitch] = useState(true);
    const [lampSwitch, setLampSwitch] = useState(true);
    const [autoFocusSwitch, setAutoFocusSwitch] = useState(true);
    const [showAnnotation, setShowAnnotation] = useState(false);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [annotationPressed, setAnnotationPressed] = useState(false);
    const [fullscreenPressed, setFullscreenPressed] = useState(false);
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
            displayNum = "one"
            break;
        case 'right':
            displayNum = "two"
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
                <Button className="btn btn-info rounded-pill">Conference Call</Button>
            </span>;
            break;
        case 'DocCam':
            message = <div className='d-flex flex-column'>
                <div className='mx-auto mb-5'>
                    <div className='d-flex flex-row'>
                        <img 
                            src={Camera2}
                            alt='Camera Icon'
                            className='img-fluid pr-2'/>
                        <h6 className="mb-0">Autofocus</h6>
                    </div>
                    <div className="col-9 custom-control custom-switch custom-switch-md pt-0 mt-0">
                        <input 
                            className="custom-control-input"
                            type="checkbox"
                            role="switch"
                            id='autoFocusSwitch'
                            checked={autoFocusSwitch}
                            onChange={toggleAutoFocusSwitch}
                            style={{backgroundColor:autoFocusSwitch ? '#007FA4' : '#e9ecef'}}
                            />
                            <label className="custom-control-label" htmlFor="autoFocusSwitch"></label> 
                    </div>
                </div>
                <div className='mx-auto mb-5'>
                    <div className='d-flex flex-row'>
                        <img 
                            src={Lamp}
                            alt='Lightbulb Icon'
                            className='img-fluid pl-0 pr-2'/>
                            <h6 className=" mb-0">Lamp</h6>   
                    </div>
                    <div className="col-9 custom-control custom-switch custom-switch-md pt-0 mt-0">
                        <input 
                            className="custom-control-input"
                            type="checkbox"
                            role="switch"
                            id='lampSwitch'
                            checked={lampSwitch}
                            onChange={toggleLampSwitch}
                            style={{backgroundColor:lampSwitch ? '#007FA4' : '#e9ecef'}}
                            />
                            <label className="custom-control-label" htmlFor="lampSwitch"></label> 
                    </div>
                </div>
                <div className='mx-auto'>
                    <div className='d-flex flex-row'>
                        <img 
                            src={Zoom}
                            alt='Zoom-in Icon'
                            className='img-fluid pr-2 pl-3'/>
                        <h6>Zoom</h6>
                    </div>
                    <div className='d-flex bg-info rounded-pill justify-content-between'>
                        <div onClick={() => {
                            window.CrComLib.publishEvent('b', '83', true);
                            window.CrComLib.publishEvent('b', '83', false);
                            console.log('DocCam Zooming Out') 
                        }}>
                            <img 
                                src={MinusWhite}
                                alt='Minus Icon'
                                className='img-fluid'/>
                        </div>
                        <div onClick={() => {
                            window.CrComLib.publishEvent('b', '84', true);
                            window.CrComLib.publishEvent('b', '84', false);
                            console.log('DocCam Zooming In') 
                        }}>
                            <img 
                                src={PlusWhite}
                                alt='Plus Icon'
                                className='img-fluid'/>
                        </div>
                        
                    </div>
                </div>
                

            </div>;
            break;
        case 'BluRay':
            message = <div>
                <p className='h6'>Your Blu-Ray content is being displayed.</p>
                <Button className=' btn-info rounded-pill' onClick={handleShowBluRayModal}>
                    <h6>Blu-Ray Controls</h6></Button>
                <CModal show={bluRayClicked} onHide={handleCloseBluRayModal} title="BluRay Controls">
                    
                    <div className='col-3 mx-auto pb-5 pt-2'>
                        <Opad centerButton={true} upJoin='271' downJoin='273' 
                            leftJoin='274' rightJoin='272' centerJoin='275'/>
                    </div>
                    <div className='d-flex flex-row col-10 mx-auto pb-4 pt-2'>
                        <div className='bg-white rounded-circle  mx-auto pt-2  shadow blurayControls border-black'
                        style={{width:'80px', height:'80px', backgroundColor: (blurayButton === 'Eject') ? 'black': ''}}
                        onClick={() => {blurayControl('59', 'Eject')}}>
                            <img 
                                src={Eject}
                                alt='Eject Icon'
                                className='img-fluid'/>
                        </div>
                        <div className='bg-white rounded-circle  mx-auto shadow pt-2 border-black border-1'
                            style={{width:'80px', height:'80px'}}
                            onClick={() => blurayControl('57', 'Previous')}>
                            <img 
                                src={RewindEnd}
                                alt='Skip Backward Icon'
                                className='img-fluid'/>
                        </div>
                        <div className='bg-white rounded-circle  mx-auto shadow pt-2 border-black border-1'
                            style={{width:'80px', height:'80px'}}
                            onClick={() => blurayControl('67', 'Rewind')}>
                            <img 
                                src={Rewind}
                                alt='Rewind Icon'
                                className='img-fluid'/>
                        </div>
                        <div className='bg-white rounded-circle  mx-auto shadow pt-2 border-black border-1'
                            style={{width:'80px', height:'80px'}}
                            onClick={() => blurayControl('65', 'Pause')}>
                            <img 
                                src={Pause}
                                alt='Pause Icon'
                                className='img-fluid'/>
                        </div>
                        <div className='bg-white rounded-circle  mx-auto shadow pt-2 border-black border-1'
                            style={{width:'80px', height:'80px'}}
                            onClick={() => blurayControl('64', 'Play')}>
                            <img 
                                src={Play}
                                alt='Play Icon'
                                className='img-fluid'/>
                        </div>
                        <div className='bg-white rounded-circle  mx-auto shadow pt-2 border-black border-1'
                            style={{width:'80px', height:'80px'}}
                            onClick={() => blurayControl('66', 'Stop')}>
                            <img 
                                src={Stop}
                                alt='Stop Icon'
                                className='img-fluid'/>
                        </div>
                        <div className='bg-white rounded-circle  mx-auto shadow pt-2 border-black border-1'
                            style={{width:'80px', height:'80px'}}
                            onClick={() => blurayControl('68', 'Fast Forward')}>
                            <img 
                                src={FastForward}
                                alt='Fast Forward Icon'
                                className='img-fluid'/>
                        </div>
                        <div className='bg-white rounded-circle  mx-auto shadow pt-2 border-black border-1'
                            style={{width:'80px', height:'80px'}}
                            onClick={() => blurayControl('58', 'Next')}>
                            <img 
                                src={FastForwardEnd}
                                alt='Skip Forward Icon'
                                className='img-fluid'/>
                        </div>
                    </div>
                    <div className='pt-4 mb-4'>
                        <div className='d-flex flex-row py-2 '>
                            <div className='col-3 bg-info mx-auto rounded-pill d-flex flex-row justify-content-center'
                            onClick={() => blurayControl('60', 'Home')}>
                                <img 
                                    src={House}
                                    alt='House Icon'
                                    className='img-fluid pr-2'/>
                                <h6 className='text-white'>Home</h6>
                            </div>
                            <div className='col-3 bg-info mx-auto rounded-pill d-flex flex-row justify-content-center'
                            onClick={() => blurayControl('62', 'Menu')}>
                                <img 
                                    src={Menu}
                                    alt='Menu Icon'
                                    className='img-fluid pr-2'/>
                                <h6 className='text-white'>Menu</h6>
                            </div>                       
                        </div>
                        <div className='d-flex flex-row pt-3'>
                            <div className='col-3 mx-auto bg-info rounded-pill d-flex flex-row justify-content-center'
                            onClick={() => blurayControl('61', 'Info')}>
                                <img 
                                    src={InfoIcon}
                                    alt='Info Icon'
                                    className='img-fluid pr-2 '/>
                                <h6 className='text-white pr-4'>Info</h6>
                            </div>
                            <div className='col-3 bg-info mx-auto rounded-pill d-flex flex-row justify-content-center'
                            onClick={() => blurayControl('63', 'Return')}>
                                <img 
                                    src={ReturnArrow}
                                    alt='Back Arrow Icon'
                                    className='img-fluid pr-2 pl-2'/>
                                <h6 className='text-white'>Return</h6>
                            </div>                       
                        </div>
                    </div>
                </CModal>
            </div>;
            break;
        default:
            message = <p>Select a source to the {side} to present.</p>
    }
    return(
        <div>
            <div className="row m-0">
                {(sourceSelected == '') ? 
                    <div className='col bg-dark text-white text-center font-size-3 font-size-4-xl pt-3 pt-xl-4 sourceStatus'>
                        <p>Display {displayNum} is off</p>
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
            <div className="row align-items-center m-0 font-size-2 font-size-3-xl contentAreaButtonRow">
                {isMuted ?
                    <div className="col-6 p-0 text-center">
                        <button type="button"
                            className="d-flex align-items-center border-0 rounded-circle text-center text-white mx-auto mb-2 circleIcon"
                            style={{ backgroundColor: 'var(--bs-info)' }} data-bs-toggle="button" onClick={() => toggleMute(displayJoin)}>
                            <i
                                className="d-inline-block bi bi-camera-video-off font-size-4 font-size-5-xl mx-auto"></i>
                        </button>
                        <div className="font-size-2 font-size-3-xl">Unmute Display</div>
                    </div> :
                    <div className="col-6 p-0 text-center">
                        <button type="button"
                            className="d-flex align-items-center border-0 rounded-circle text-center text-dark mx-auto mb-2 circleIcon"
                            style={{ backgroundColor: '#D5D5D5' }} data-bs-toggle="button" onClick={() => toggleMute(displayJoin)}>
                            <i className="d-inline-block bi bi-camera-video-fill font-size-4 font-size-5-xl mx-auto"></i>
                        </button>
                        <div className="font-size-2 font-size-3-xl">Mute Display</div>
                    </div>}
                    <div className='col-6 p-0'>
                    {isClicked ? 
                          <button type="button"
                          className="d-flex align-items-center border-0 rounded-circle text-center text-dark mx-auto mb-2 circleIcon"
                          style={{ backgroundColor: 'var(--cyan)'}} onClick={handleShowDisplayModal}>
                          <i class="d-inline-block bi bi-gear-fill font-size-4 font-size-5-xl mx-auto"></i>
                      </button> :
                        <button type="button"
                        className="d-flex align-items-center border-0 rounded-circle text-center text-dark mx-auto mb-2 circleIcon"
                        style={{ backgroundColor: '#D5D5D5'}} onClick={handleShowDisplayModal}>
                        <i class="d-inline-block bi bi-gear-fill font-size-4 font-size-5-xl mx-auto"></i>
                    </button>}
                    <div className='font-size-2 font-size-3-xl'>Display Settings</div> 
                </div>
            </div>

            {/* Display Serttings Modal */}
            <div>
                <CModal show={isClicked} onHide={handleCloseDisplayModal} title="Display Settings">
                    <div className='d-flex flex-column justify-content-center'>
                        <h5 className='pb-2'>Display {displayNum}</h5>
                        <Row className='col-4 mx-auto'>
                            <Col className='mb-0 pt-3 pl-5'><h5>Power</h5></Col>
                            <Col className='ml-0'>
                                <div className="custom-control custom-switch custom-switch-lg">
                                    <input 
                                        className="custom-control-input"
                                        type="checkbox"
                                        role="switch"
                                        id="powerSwitch"
                                        checked={powerSwitch}
                                        onChange={togglePowerSwitch}
                                        style={{backgroundColor:powerSwitch ? '#007FA4' : '#e9ecef'}}
                                        />
                                    <label className="custom-control-label" htmlFor="powerSwitch"></label>
                            
                                </div>
                            </Col>
                        </Row>
                        
                        <div className=' row d-flex justify-content-center ml-4 pl-4 mt-4 mb-4 mx-auto'>
                            <div className='col-4 d-flex flex-column'>
                                <div className='col-5 rounded-circle  py-4 ml-5 '  onClick={handleAnnotationPressed}
                                    style={{backgroundColor:annotationPressed ? '#007FA4' : '#dee2e6'}}>
                                    <img
                                        src={annotationPressed ? PencilWhite : Pencil}
                                        alt='Pencil Icon'
                                        className='img-fluid'/>
                                </div>
                                <h6 className='mr-5'>Annotate</h6>
                            </div>
                            <div className='col-4 d-flex flex-column'>
                                <div className='col-5 rounded-circle py-4 ml-5'  onClick={handleFullscreenPressed}
                                    style={{backgroundColor:fullscreenPressed ? '#007FA4' : '#dee2e6'}}>
                                    <img
                                        src={fullscreenPressed ? FullscreenWhite : Fullscreen}
                                        alt='Pencil Icon'
                                        className=''/>
                                </div>
                                <h6 className='mr-5'>Preview Fullscreen</h6>
                            </div>
                            <div className='col-4'>
                                <div className='col-5 rounded-circle py-4  ml-5'  onClick={() => toggleMute(displayJoin)}
                                    style={{backgroundColor:isMuted ? '#dee2e6' : '#007FA4'}}>
                                    <img
                                        src={isMuted ? CameraOffFill : CameraIconFillWhite}
                                        alt='Camera Icon'
                                        className='img-fluid'/>
            
                                </div>
                                <h6 className='pr-3'>{isMuted ? 'Unmute Display' : "Mute Display"}</h6>
                            </div>
                        </div>
                        <h5 className='mt-3 mb-2'>Screen Position</h5>
                        <div className='row justify-content-center ml-4 pl-4 mt-4'>
                            <div className='col-4 bg-info rounded-pill py-3 mr-4' onClick={() => {
                                window.CrComLib.publishEvent('b', `${downJoin}`, true);
                                window.CrComLib.publishEvent('b', `${downJoin}`, false);
                                console.log('Screen downed')
                            }}>
                                <img 
                                    src={DownArrow}
                                    alt='Down Arrow'
                                    className='img-fluid'/>
                            </div>
                            <div className='col-4 bg-info rounded-pill py-3 ml-4' onClick={() => {
                                window.CrComLib.publishEvent('b', `${upJoin}`, true);
                                window.CrComLib.publishEvent('b', `${upJoin}`, false);
                                console.log('Screen upped')
                            }}>
                                <img 
                                    src={UpArrow}
                                    alt='Up Arrow'
                                    className='img-fluid'/>
                            </div>
                        </div>
                        
                    </div>
                </CModal>
            </div>
        </div>
    )
}

export default DisplayArea;