import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 
import PowerLogo from './Icons/power.svg';
import VolumeLogo from './Icons/volume-up-fill.svg';
import MicLogo from './Icons/mic-fill.svg';
import CameraLogo from './Icons/camera-video-fill.svg';
import CameraSmall from './Icons/camera-video-small.svg';
import CameraSmallWhite from './Icons/camera-video-white.svg';
import './BottomBar.css';
import CModal from './CModal';
import Opad from './Opad';
import VolumeControl from './VolumeControl';
import MicIcon from './Icons/mic-fill2.svg';
import MicMuteIcon from './Icons/mic-mute-fill.svg';
import Dpad from './Icons/dpad-big.svg';
import MinusWhite from './Icons/dashWhite.svg';
import PlusWhite from './Icons/plusWhite.svg';
import Zoom from "./Icons/zoom-in.svg";


function BottomBar () {
  const [showPowerModal, setShowPowerModal] = useState(false);
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [showMicModal, setShowMicModal] = useState(false);
  const [showCamModal, setShowCamModal] = useState(false);
  const [cameraSelected, setCameraSelected] = useState('');
  const [showControls, setShowControls] = useState(false)
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
  const handleShowCamModal = () => {
    console.log("Showing Cam Modal")
    setShowCamModal(true);
    console.log(showVolumeModal);
  }
  const handleCloseCamModal = () => {
    console.log("Closing Cam Modal")
    setShowCamModal(false);
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
const handleCameraClicked = (cameraNum) => {
  setCameraSelected(cameraNum);
  setShowControls(true);
  window.CrComLib.publishEvent('n', '42', true);
  window.CrComLib.publishEvent('n', '42', false);

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
const sendSignal= (joinNumber, action) => {
  window.CrComLib.publishEvent('b', `${joinNumber}`, true);
  window.CrComLib.publishEvent('b', `${joinNumber}`, false);
  console.log(`${action} pressed`);
}
let camNum;
switch (cameraSelected) {
  case 'Camera1':
      camNum = "One"
      break;
  case 'Camera2':
      camNum = "Two"
      break;
} 
  
  return (

    <div className="row w-100 position-absolute bottom-0 p-0 m-0 footerRow">
      <div className="col-12 d-flex flex-row align-items-center text-dark p-0 m-0" style={{ backgroundColor: 'var(--secondary)' }}>
        <button type="button"
          className="col h-100 border-0 border-end border-dark text-center font-size-2 font-size-3-xl" onClick={handleShowPowerModal}>
          <i className="d-block bi bi-power mb-1 mb-xl-3 font-size-4 font-size-5-xl"></i>
          <span className="d-block">System Off</span>
        </button>
        <button type="button"
          className="col h-100 border-0 border-end border-dark text-center font-size-2 font-size-3-xl" onClick={handleShowVolumeModal}>
          <i className="d-block bi bi-volume-up-fill mb-1 mb-xl-3 font-size-4 font-size-5-xl"></i>
          <span className="d-block">Presentation Volume</span>
        </button>
        <button type="button"
          className="col h-100 border-0 border-end border-dark text-center font-size-2 font-size-3-xl" onClick={handleShowMicModal}>
          <i className="d-block bi bi-mic-fill mb-1 mb-xl-3 font-size-4 font-size-5-xl"></i>
          <span className="d-block">Microphones</span>
        </button>
        <button type="button"
          className="col h-100 border-0 border-end border-dark text-center font-size-2 font-size-3-xl" onClick={handleShowCamModal}>
          <i className="d-block bi bi-camera-video-fill mb-1 mb-xl-3 font-size-4 font-size-5-xl"></i>
          <span className="d-block">Camera Controls</span>
        </button>
        {/* Audio Statuses */}
        <div className="col h-100 border-end border-dark pt-1 pt-xl-4 px-1">
          <div className="d-flex justify-content-between mb-xl-1">
            <div className="col-9 font-size-0 font-size-1-xl fw-bold">Presentation Audio</div>
            <div className="col-1 font-size-1-xl">
              <div
                className={`border-0 rounded-circle mx-auto mb-0 mb-xl-1  ${isPresentationMuted ? 'bg-warning' : 'bg-success'}`} style={{ width: '13px', height: '13px' }}>
              </div>
              <div className={`font-size-0 font-size-1-xl ${isPresentationMuted ? '' : ''}`}>{isPresentationMuted ? "Muted" : 'On'}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-xl-1">
            <div class="col-6 font-size-0 font-size-1-xl fw-bold">
              Microphones
            </div>
            <div className="col-1 font-size-1-xl">
              <div
                className={`border-0 rounded-circle mx-auto mb-0 mb-xl-1  ${isMicMuted ? 'bg-warning' : 'bg-success'}`} style={{ width: '13px', height: '13px' }}>
              </div>
              <div className={`font-size-0 font-size-1-xl ${isMicMuted ? '' : ''}`}>{isMicMuted ? "Muted" : 'On'}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-xl-1">
            <div className="col-6 font-size-0 font-size-1-xl fw-bold">
              Ceiling Mics
            </div>
            <div className="col-1 font-size-1-xl">
              <div
                className={`border-0 rounded-circle mx-auto mb-0 mb-xl-1  ${isCeilingMicMuted ? 'bg-warning' : 'bg-success'}`} style={{ width: '13px', height: '13px' }}>
              </div>
              <div className={`font-size-0 font-size-1-xl ${isPresentationMuted ? '' : ''}`}>{isCeilingMicMuted ? "Muted" : 'On'}</div>
            </div>
          </div>
        </div>
        {/* /Audio Statuses */}
      </div>
      {/* /Row */}

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

        <CModal show={showCamModal} onHide={handleCloseCamModal} title="Camera Controls">
          <h5>Select Camera:</h5>
          <div className='col-10 d-flex flex-row justify-content-between mx-auto py-4'>
            <div className={`col-4 rounded-pill mx-auto d-flex flex-row justify-content-center py-2`}
              style={{backgroundColor:(cameraSelected === 'Camera1') ? "#007FA4" : "#dee2e6"}}
              onClick={() => handleCameraClicked('Camera1')}>
              <img 
                src={(cameraSelected === 'Camera1') ? CameraSmallWhite : CameraSmall}
                alt='Camera Icon'
                className=' img-fluid pr-2'/>
                <h5 className={`h6 ${(cameraSelected === 'Camera1') ? 'text-white' : ''}`}>Camera 1</h5>
            </div>
            <div className={`col-4 rounded-pill mx-auto d-flex flex-row justify-content-center py-2`}
              style={{backgroundColor:(cameraSelected === 'Camera2') ? "#007FA4" : "#dee2e6"}}
              onClick={() => handleCameraClicked('Camera2')}>
              <img 
                src={(cameraSelected === 'Camera2') ? CameraSmallWhite : CameraSmall}
                alt='Camera Icon'
                className='img-fluid pr-2'/>
                <h5 className={`h6 ${(cameraSelected === 'Camera2') ? 'text-white' : ''}`}>Camera 2</h5>
            </div>
          </div>
          {showControls && (
            <div className='pt-4'>
              <h5 className='pb-3'>Camera {camNum}</h5>
              <div className='d-flex flex-row justify-content-between'>
                <div className='pt-4 pl-4'>
                  <Opad upJoin='241' downJoin='242' leftJoin='243' rightJoin='244'/>
                </div>
                <div className='d-flex flex-column pt-5 ml-5'>
                    <div className='d-flex flex-row ml-3'>
                      <img 
                      
                        src={Zoom}
                        alt='Zoom-in Icon'
                        className='img-fluid pr-2'/>
                      <h6>Zoom</h6>
                    </div>
                    <div className='d-flex bg-info rounded-pill justify-content-between px-2'
                    style={{width:'140px'}}>
                      <div onClick={() => sendSignal('74', 'Zoom Out')}>
                          <img 
                              src={MinusWhite}
                              alt='Minus Icon'
                              className='img-fluid'/>
                      </div>
                      <div onClick={() => sendSignal('75', 'Zoom In')}>
                          <img 
                              src={PlusWhite}
                              alt='Plus Icon'
                              className='img-fluid'/>
                      </div>
                    </div>
                </div>
                <div className='d-flex flex-column pl-0 pr-3'>
                  <div className='d-flex flex-row py-3'>
                    <Button className='btn btn-info rounded-pill mr-4 '>Preset 1</Button>
                    <Button className='btn btn-info rounded-pill'>Preset 2</Button>
                  </div>
                  <div className='d-flex flex-row py-3'>
                    <Button className='btn btn-info rounded-pill mr-4'>Preset 3</Button>
                    <Button className='btn btn-info rounded-pill'>Preset 4</Button>
                  </div>
                  <div className='d-flex flex-row py-3'>
                    <Button className='btn btn-info rounded-pill mr-4'>Preset 5</Button>
                    <Button className='btn btn-info rounded-pill'>Preset 6</Button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </CModal>
        {/* Old */}
        {/* <div className="col border border-1 border-top-0 border-bottom-0 border-right-0 border-dark">
          <div className=' d-flex flex-row justify-content-between'>
            <h5 className='h8 mb-0 ml-0'>Presentation Audio</h5>
            <div className={`d-flex flex-column pt-1 ${isPresentationMuted ? 'pl-1' : ''}`}>
              <div className={`rounded-circle  ${isPresentationMuted ? 'bg-warning ml-4' : 'bg-success ml-2'}`}
                style={{width:'10px', height: '10px'}}></div>
              <h6 className={`h9 ${isPresentationMuted ? '' : 'pl-1'}`}>{isPresentationMuted ? "Muted" : 'On'}</h6>
            </div>
          </div>
          <div className='d-flex flex-row justify-content-between'>
            <h5 className='h8 mb-0 ml-0'>Microphones</h5>
            <div className={`d-flex flex-column pt-1 ${isMicMuted ? 'pl-0' : ''}`}>
              <div className={`rounded-circle  ${isMicMuted ? 'bg-warning ml-4' : 'bg-success ml-2'}`}
                style={{width:'10px', height: '10px'}}></div>
              <h6 className={`h9 ${isMicMuted? '' : 'pl-1'}`}>{isMicMuted ? "Muted" : 'On'}</h6>
            </div>
          </div>
          <div className='d-flex flex-row justify-content-between '>
            <h5 className='h8 mb-0 ml-0'>Ceiling Mics</h5>
            <div className={`d-flex flex-column pt-1 ${isCeilingMicMuted ? 'pl-3' : ''}`}>
              <div className={`rounded-circle  ${isCeilingMicMuted  ? 'bg-warning ml-4 ' : 'bg-success ml-2'}`}
                style={{width:'10px', height: '10px'}}></div>
              <h6 className={`h9 ${isCeilingMicMuted  ? '' : 'pl-1'}`}>{isCeilingMicMuted  ? "Muted" : 'On'}</h6>
            </div>
          </div>
        </div> */}
        {/* /Old */}
     
      
      
    </div>
  );
};

export default BottomBar;
