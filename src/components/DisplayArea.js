import * as React from 'react';
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import CameraIcon from './Icons/camera-video.svg';
import CameraOffIcon from './Icons/camera-video-off.svg';
import GearIcon from './Icons/gear.svg';
import GearHigh from './Icons/gear-activated.svg'

function DisplayArea({sourceSelected, displayJoin}) {
    const [ipAdd, setIpAdd] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        window.CrComLib.subscribeState('s', '2', value=> setIpAdd(value));    
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
                <h5 className='h6'>Enter the address below into your browser and follow the instructions
                    to present wirelessly.
                </h5>
                <p className='text-info'>{ipAdd}</p>
            </div>;
            break;
        case 'ConfCall':
            message = <div>
                <h5 className='h6'>Select the button below to dial your number.</h5>
                <Button className="btn btn-info control">Conference Call</Button>
            </div>;
            break;
        case 'DocCam':
            message = <div>
                <Button>AutoFocus</Button>
                <Button>Lamp</Button>
                <Button>Zoom</Button>
            </div>;
            break;
        case 'BluRay':
            message = <div>
                <h5 className='h6'>Your Blu-Ray content is being displayed.</h5>
                <Button className=' btn-info rounded-0'>Blu-Ray Controls</Button>
            </div>;
            break;
        default:
            message = <h5 className='h6'>Select a source to the left to present.</h5>
    }
    return(
        <div className='d-flex flex-column'>
            <div className='bg-success '>
                <h5 className='h6 py-4'>Display one is On</h5>
            </div>
            <div className='inputInfo pt-3 flex-grow-1 '>
                {message}
            </div>
            
            <div className='controls pt-5 mt-5 mb-2 row'>
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
                        <div className='col-md-7 rounded-circle bg-light py-1 px-1 ml-4 icon-mute '>
                            <img 
                                src={CameraIcon}
                                alt='Camera Video Icon'
                                className='img-fluid'
                                
                            />
                        </div>
                        <h5 className='h7 mb-0'>Mute Display</h5>
                    </div>}
                
                <div className='col' onClick={() => setIsClicked(true)}>
                    {isClicked ? 
                        <div className='col-md-7 rounded-circle bg-info py-1 px-1 ml-4 icon-mute '>
                            <img 
                                src={GearHigh}
                                alt='Gear Icon Highlighted'
                                className='img-fluid'   
                            />
                        </div> :
                        <div className='col-md-7 rounded-circle bg-light py-1 px-1 ml-4 icon-mute '>
                            <img 
                                src={GearIcon}
                                alt='Gear Icon'
                                className='img-fluid'   
                            />
                        </div>}
                    <h5 className='h7 mb-0'>Display Settings</h5> 
                </div>
            </div>
        </div>
    )
}

export default DisplayArea;