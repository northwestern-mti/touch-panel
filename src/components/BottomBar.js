import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 
import PowerLogo from './Icons/power.svg';
import VolumeLogo from './Icons/volume-up-fill.svg';
import MicLogo from './Icons/mic-fill.svg';
import CameraLogo from './Icons/camera-video-fill.svg'
import './BottomBar.css'
import CustomModal from './CustomModal';
import CModal from './CModal';
import VolumeControl from './VolumeControl';
import MicIcon from './Icons/mic-fill2.svg';
import MicMuteIcon from './Icons/mic-mute-fill.svg'


function BottomBar () {
  const [showPowerModal, setShowPowerModal] = useState(false);
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [showMicModal, setShowMicModal] = useState(false);
  const [presentationVolume, setPresentationVolume] = useState(0);
  const [MicVolume, setMicVolume] = useState(0);
  const [isPresentationMuted, setIsPresentationMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCeilingMicMuted, setIsCeilingMicMuted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.CrComLib.subscribeState('n', '1', value=> setPresentationVolume(value))
    window.CrComLib.subscribeState('n', '2', value=> setMicVolume(value))
  }, [])

  const programShutOff = () => {
    handleClosePowerModal()
    navigate('/');
    window.CrComLib.publishEvent('b', '30', true);
    window.CrComLib.publishEvent('b', '30', false);
    
    console.log("program shut off")
}
  const handleShowPowerModal = () => {
    console.log("Showing Power Modal")
    setShowPowerModal(true);
    console.log(showPowerModal);
  }
  const handleClosePowerModal = () => {
    setShowPowerModal(false);
  }

  const handleShowVolumeModal = () => {
    console.log("Showing Volume Modal")
    setShowVolumeModal(true);
    console.log(showVolumeModal);
  }
  const handleCloseVolumeModal = () => {
    setShowVolumeModal(false);
  }
  const handleShowMicModal = () => {
    console.log("Showing Volume Modal")
    setShowMicModal(true);
    console.log(showVolumeModal);
  }
  const handleCloseMicModal = () => {
    setShowMicModal(false);
  }
  const togglePresentationMute = () => {
    setIsPresentationMuted((prevIsPresentationMuted) => !(prevIsPresentationMuted));
    if (isPresentationMuted) {
        window.CrComLib.publishEvent('b', '20', false);
        console.log('program unmuted')
    } else{
        window.CrComLib.publishEvent('b', '20', true);
        console.log('program muted')
    }
}
const toggleMicMute = () => {
  setIsMicMuted((prevIsMicMuted) => !(prevIsMicMuted));
  if (isMicMuted) {
      window.CrComLib.publishEvent('b', '23', false);
      console.log('program unmuted')
  } else{
      window.CrComLib.publishEvent('b', '23', true);
      console.log('program muted')
  }
}
const toggleCeilingMicMute = () => {
  setIsCeilingMicMuted((prevIsCeilingMicMuted) => !(prevIsCeilingMicMuted));
  if (isCeilingMicMuted) {
      window.CrComLib.publishEvent('b', '111', false);
      console.log('program unmuted')
  } else{
      window.CrComLib.publishEvent('b', '111', true);
      console.log('program muted')
  }
}
  
  return (
    <div className="BottomBar bg-secondary row py-3 w-100 ml-0">
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
            <CModal show={showPowerModal} onHide={handleClosePowerModal} title='System Off?'>
                <div className='col-10 align-items-center ml-5 mt -5 pl-5 pt-5'>
                  <h5>Are you sure you want to shut down the system?</h5>
                  <div className='d-flex col-10 pt-5 pl-6 ml-5 justify-content-between'>
                    <div className='btn btn-gray-600 rounded-pill px-5 cancelButton text-white ' onClick={handleClosePowerModal}>
                      <h6 className='px-3'> Cancel</h6>
                    </div>
                    <Button className='btn btn-info rounded-pill px-5' onClick={programShutOff}>
                      <h6 className='px-5'>Yes</h6>
                    </Button>
                </div>
                </div>
                
            </CModal>
        </div>
        <div className={`col border border-1 border-top-0 border-bottom-0 border-dark ${showVolumeModal ? 'bg-primary' : ''}`}
          onClick={handleShowVolumeModal}>
            <h5 className='h7 '>Presentation Volume</h5>
            <img
              src={VolumeLogo}
              alt='Volume fill icon'
              className='img-fluid'/>
        </div>
        <CModal show={showVolumeModal} onHide={handleCloseVolumeModal} title='Presentation Volume'>
          <div className='col-10 align-items-center mx-auto pl-5 pt-4 mt-4'>
            <VolumeControl initialVolume={presentationVolume} plusJoin='22' minusJoin='21' isMuted={isPresentationMuted}/>
            <div onClick={togglePresentationMute} className='col-4 mx-auto pl-5'>
              <div className={`rounded-circle muteIcon   ${isPresentationMuted ? 'bg-info' : ''}`}
                style={{backgroundColor: '#e9ecef', width:'90px', height:'90px'}}>
                <img 
                  src={isPresentationMuted ? MicMuteIcon : MicIcon}
                  alt={isPresentationMuted ? 'Microphone Mute icon' : 'Microphone Icon' }
                  className='img-fluid mt-3'/>
              </div>
              <h5 className={`row ${isPresentationMuted ? '' : 'ml-1'}`}>{isPresentationMuted ? 'Unmute' : 'Mute'}</h5>
            </div>
          </div>
          <div className='bg-secondary row mx-auto col-8 mt-5  '>
            <h5 className='col-md-1 bg-info mt-5 mb-5 rounded-circle text-white'><em>i</em></h5>
            <h5 className='col mb-0'>Sound not playing? Be sure to select the correct audio on your device.</h5>
          </div>
              
        </CModal>

        <div className={`col border border-1 border-top-0 border-bottom-0 border-dark ${showMicModal ? 'bg-primary' : ''}`}
          onClick={handleShowMicModal}>
            <h5 className='h7 '>Microphones</h5>
            <img
              src={MicLogo}
              alt='Microphone icon'
              className='img-fluid'/>
        </div>
        <CModal show={showMicModal} onHide={handleCloseMicModal} title='Microphones'>
          <div className='col-10 align-items-center ml-5 mt-2 pl-5 '>
            <h5 className='col-3 mb-3'>Microphones</h5>
            <VolumeControl initialVolume={MicVolume} plusJoin='25' minusJoin='24' isMuted={isMicMuted}/>
            <div onClick={toggleMicMute} className='col-4 mx-auto pl-5'>
              <div className={`rounded-circle muteIcon   ${isMicMuted ? 'bg-info' : ''}`}
                style={{backgroundColor: '#e9ecef', width:'90px', height:'90px'}}>
                <img 
                  src={isMicMuted ? MicMuteIcon : MicIcon}
                  alt={isMicMuted ? 'Microphone Mute icon' : 'Microphone Icon' }
                  className='img-fluid mt-3'/>
              </div>
              <h5 className={`row ${isMicMuted ? '' : 'ml-1'}`}>{isMicMuted ? 'Unmute' : 'Mute'}</h5>
            </div>
            <div>
              <h5 className='col-4'>Ceiling Mics</h5>
              <div onClick={toggleCeilingMicMute} className='col-4 mx-auto pl-5'>
                <div className={`rounded-circle muteIcon   ${isCeilingMicMuted ? 'bg-info' : ''}`}
                  style={{backgroundColor: '#e9ecef', width:'90px', height:'90px'}}>
                  <img 
                    src={isCeilingMicMuted ? MicMuteIcon : MicIcon}
                    alt={isCeilingMicMuted ? 'Microphone Mute icon' : 'Microphone Icon' }
                    className='img-fluid mt-3'/>
                </div>
                <h5 className={`row ${isCeilingMicMuted ? '' : 'ml-1'}`}>{isCeilingMicMuted ? 'Unmute' : 'Mute'}</h5>
              </div>
              
            </div>
          </div>
              
        </CModal>

        <div className="col border border-1 border-top-0 border-bottom-0 border-dark">
            <h5 className='h7'>Camera Controls</h5>
            <img
              src={CameraLogo}
              alt='Camera icon'
              className='img-fluid'/>
        </div>
        <div className="col border border-1 border-top-0 border-bottom-0 border-right-0 border-dark">
            <h5 className='h7 mb-0 ml-0'>Presentation Audio</h5>
            <h5 className='h7 mb-0 ml-0'>Microphones</h5>
            <h5 className='h7 mb-0 ml-0'>Ceiling Mics</h5>
        </div>
     
      
      
    </div>
  );
};

export default BottomBar;
