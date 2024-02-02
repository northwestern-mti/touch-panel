import * as React from 'react';
import { useState, useEffect } from "react";
import { Button} from 'react-bootstrap';
import CModal from './CModal';
import CameraIcon from './Icons/camera-video.svg';
import CameraOffIcon from './Icons/camera-video-off.svg';
import GearIcon from './Icons/gear.svg';
import GearHigh from './Icons/gear-activated.svg';
import Camera2 from './Icons/camera2.svg';
import Lamp from './Icons/lightbulb-fill.svg';
import Zoom from "./Icons/zoom-in.svg";

function DisplayArea({sourceSelected, displayJoin, side, showAnnotationJpin, showFullScreenJoin,
     annotationJoin, fullscreenJoin, powerOn, powerOff}) {
    const [ipAdd, setIpAdd] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [powerSwitch, setPowerSwitch] = useState(true);
    const [showAnnotation, setShowAnnotation] = useState(false)
    const [showFullScreen, setShowFullScreen] = useState(false);
    useEffect(() => {
        window.CrComLib.subscribeState('s', '2', value=> setIpAdd(value));
        window.CrComLib.subscribeState('b', `${showAnnotationJpin}`, value=> setShowAnnotation(value));
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
    let message;
    switch(sourceSelected) {
        case 'PC':
            message = <h5 className='h6'>Please use the keyboard and mouse to start.</h5>;
            break;
        case 'Laptop':
            message = <h5 className='h6'>Connect your device to start presenting.</h5>;
            break;
        case 'Wireless':
            message = <div>
                <h5 className='h7'>Enter the address below into your browser and follow the instructions
                    to present wirelessly.
                </h5>
                <p className='text-info'>{(ipAdd == "") ? "123.210.123.210" : ipAdd}</p>
            </div>;
            break;
        case 'ConfCall':
            message = <div>
                <h5 className='h6'>Select the button below to dial your number.</h5>
                <Button className="btn btn-info rounded-pill">Conference Call</Button>
            </div>;
            break;
        case 'DocCam':
            message = <div className=''>
                <div className='row py-3'>
                    <div className='row px-5'>
                        <img 
                            src={Camera2}
                            alt='Camera Icon'
                            className='img-fluid'/>
                        <h6 className ="mb-0">Autofocus</h6>
                    </div>
                    <div className='row px-4'>
                        <img 
                            src={Lamp}
                            alt='Lightbulb Icon'
                            className='img-fluid'/>
                        <h6 className=" mb-0">Lamp</h6>
                        
                    </div>
                </div>
                
                <div className='row px-4 ml-3'>
                    <img 
                        src={Zoom}
                        alt='Zoom-in Icon'
                        className='img-fluid'/>
                    <h6>Zoom</h6>

                </div>

            </div>;
            break;
        case 'BluRay':
            message = <div>
                <h5 className='h6'>Your Blu-Ray content is being displayed.</h5>
                <Button className=' btn-info rounded-pill'>
                    <h6>Blu-Ray Controls</h6></Button>
            </div>;
            break;
        default:
            message = <h5 className='h6'>Select a source to the {side} to present.</h5>
    }
    return(
        <div className='d-flex align-items-end flex-column mb-3 h-100'>
            <div className='w-100'>
                {(sourceSelected == '') ? 
                    <div className='bg-dark text-white w-100'>
                        <h5 className='h6 py-4'>Display one is Off</h5>
                    </div> : 
                    <div className={isMuted ? 'bg-warning p-2' : 'bg-success p-2'}>
                        <h5 className={isMuted ? 'h7 py-4 mb-3 ' : 'h6 py-4'}>{isMuted ? 'Display One is Muted' : 'Display One is On'}</h5>
                    </div>}
            </div>
    
            <div className='inputInfo pt-3 p-2 ml-3'>
                {message}
            </div>
            
            <div className='controls mt-auto p-2 mb-2 row'>
                {isMuted ? 
                    <div className='col align-items-center' onClick={() => toggleMute(displayJoin)}>
                        <div className='col-md-7 rounded-circle bg-info icon py-1 px-1 ml-4' >
                            <img 
                                src={CameraOffIcon}
                                alt='Camera Video Off Icon'
                                className='img-fluid'
                                color='white'
                            />
                        </div>
                        <h5 className='h7 mb-0'>Unmute Display</h5>
                    </div> : 
                    <div className='col' onClick={() => toggleMute(displayJoin)}>
                        <div className='icon-mute col-md-7 rounded-circle  py-1 px-1 ml-4  ' style={{backgroundColor: '#dee2e6'}}>
                            <img 
                                src={CameraIcon}
                                alt='Camera Video Icon'
                                className='img-fluid'
                                
                            />
                        </div>
                        <h5 className='h7 mb-0'>Mute Display</h5>
                    </div>}
                
                <div className='col' onClick={handleShowDisplayModal}>
                    {isClicked ? 
                        <div className='col-md-7 rounded-circle bg-info py-1 px-1 ml-4'>
                            <img 
                                src={GearHigh}
                                alt='Gear Icon Highlighted'
                                className='img-fluid'   
                            />
                        </div> :
                        <div className='col-md-7 bg-gray-300 rounded-circle py-1 px-1 ml-4 icon-mute ' style={{backgroundColor: '#dee2e6'}}>
                            <img 
                                src={GearIcon}
                                alt='Gear Icon'
                                className='img-fluid'   
                            />
                        </div>}
                    <h5 className='h7 mb-0'>Display Settings</h5> 
                </div>
                <CModal show={isClicked} onHide={handleCloseDisplayModal} title="Display Settings">
                    <div className='col-10'>
                        <h5>Power</h5>
                        <div className='form-check form-switch'>
                            <input 
                                className='form-check-input'
                                type='checkbox'
                                role='switch'
                                id="flexSwitchCheckChecked"
                                checked={powerSwitch}
                                onChange={togglePowerSwitch} 
                                />
                        </div>
                        
                    </div>
                </CModal>
            </div>
        </div>
    )
}

export default DisplayArea;