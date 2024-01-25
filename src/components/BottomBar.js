import React from 'react';
import { Button } from 'react-bootstrap'; 
import PowerLogo from './Icons/power.svg';
import VolumeLogo from './Icons/volume-up-fill.svg';
import MicLogo from './Icons/mic-fill.svg';
import CameraLogo from './Icons/camera-video-fill.svg'
import './BottomBar.css'

function BottomBar () {
  return (
    <div className="BottomBar bg-secondary row">
        <Button className="col btn btn-secondary btn-block border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7 label'>System Off</h5>
            <img
              src={PowerLogo}
              alt='Power icon'
              size={32}
              className='icon'/>
        </Button>
        <Button className="col btn btn-secondary btn-block border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7 '>Presentation Volume</h5>
            <img
              src={VolumeLogo}
              alt='Volume fill icon'
              className='img-fluid'/>
        </Button>
        <Button className="col btn btn-secondary btn-block border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7 '>Microphones</h5>
            <img
              src={MicLogo}
              alt='Microphone icon'
              className='img-fluid'/>
        </Button>
        <Button className="col btn btn-secondary btn-block border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7'>Camera Controls</h5>
            <img
              src={CameraLogo}
              alt='Camera icon'
              className='img-fluid'/>
        </Button>
        <Button className="col btn btn-secondary btn-block border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7'>Presentation Volume</h5>
        </Button>
     
      
      
    </div>
  );
};

export default BottomBar;
