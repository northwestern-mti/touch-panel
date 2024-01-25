import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; 
import PowerLogo from './Icons/power.svg';
import VolumeLogo from './Icons/volume-up-fill.svg';
import MicLogo from './Icons/mic-fill.svg';
import CameraLogo from './Icons/camera-video-fill.svg'
import './BottomBar.css'
import CustomModal from './CustomModal';
import { useNavigate } from 'react-router-dom';

function BottomBar () {
  const [showPowerModal, setShowPowerModal] = useState(false);
  const navigate = useNavigate;
  const handleShowPowerModal = () => {
    setShowPowerModal(true);
  }
  const handleClosePowerModal = () => {
    setShowPowerModal(true);
  }
  const programShutOff = () => {
    handleClosePowerModal()
    window.CrComLib.publishEvent('b', '30', true);
    window.CrComLib.publishEvent('b', '30', false);
    navigate('/');
    console.log("program shut off")
}
  return (
    <div className="BottomBar bg-secondary row py-2 col-12">
        <div className="col border border-1 border-top-0 border-bottom-0 border-dark" 
            onClick={handleShowPowerModal}>
            <h5 className='h7'>System Off</h5>
            <img
              src={PowerLogo}
              alt='Power icon'
              size={32}
              className='icon'/>
        </div>
        <div className=''>
            <CustomModal show={showPowerModal} onHide={handleClosePowerModal} title='System Off?' 
            className=''>
                <h5>Are you sure you want to shut down the system?</h5>
                <div className='d-flex justify-content-between'>
                  <Button className='btn btn-gray-600' onClick={handleClosePowerModal}>
                    <h6> Cancel</h6>
                  </Button>
                  <Button className='btn-info' onClick={programShutOff}>
                    <h6>Yes</h6>
                  </Button>
                </div>
            </CustomModal>
        </div>
        <div className="col border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7 '>Presentation Volume</h5>
            <img
              src={VolumeLogo}
              alt='Volume fill icon'
              className='img-fluid'/>
        </div>
        <div className="col border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7 '>Microphones</h5>
            <img
              src={MicLogo}
              alt='Microphone icon'
              className='img-fluid'/>
        </div>
        <div className="col border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7'>Camera Controls</h5>
            <img
              src={CameraLogo}
              alt='Camera icon'
              className='img-fluid'/>
        </div>
        <div className="col border border-1 border-top-0 border-bottom-0 border-right-0 border-dark">
            <h5 className='h7 mb-0'>Presentation Audio</h5>
            <h5 className='h7 mb-0'>Microphones</h5>
            <h5 className='h7 mb-0'>Ceiling Mics</h5>
        </div>
     
      
      
    </div>
  );
};

export default BottomBar;
