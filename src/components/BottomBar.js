import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, InputGroup, FormControl, Modal } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Icon from '@mdi/react';
import { mdiBroadcastOff } from '@mdi/js';
import { mdiBroadcast } from '@mdi/js';
import './BottomBar.css';
import CModal from './CModal';
import Opad from './Opad';
import VolumeControl from './VolumeControl';


function BottomBar ({programStarted, setProgramStarted}) {
  const [showPowerModal, setShowPowerModal] = useState(false);
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [showMicModal, setShowMicModal] = useState(false);
  const [showCamModal, setShowCamModal] = useState(false);
  const [cameraSelected, setCameraSelected] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasCeilingMics, setHasCeilingMics] = useState(true);
  const [hasMics, setHasMics] = useState(true)
  const [presentationVolume, setPresentationVolume] = useState(0);
  const [MicVolume, setMicVolume] = useState(0);
  const [isPresentationMuted, setIsPresentationMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCeilingMicMuted, setIsCeilingMicMuted] = useState(false);
  const [isPrivacyModeEnabled, setIsPrivacyModeEnabled] = useState(false);
  const [configPrivacyMode, setConfigPrivacyMode] = useState(false);
  const [numCameras, setNumCameras] = useState(0);
  const [numOfPresets, setNumOfPresets] = useState(0);
  const [presetRenameMode, setpresetRenameMode] = useState(false);
  const [presetNames, setPresetNames] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [newPresetName, setNewPresetName] = useState('');
  const [camNames, setCamNames] = useState([]);
  const [tempCamName, setTempCamName] = useState('');
  const [tempPresetName, setTempPresetName] = useState('');
  const [camRenameMode, setCamRenameMode] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [newCamName, setNewCamName] = useState('');
  const holdTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const [fullscreen, setFullscreen] = useState(true);

  const CrSignalName = {
    'PresentationVolume' : '1',
    'MicVolume' : '2',
    'NumberOfCameras' : '41',
    'NumberOfPresets' : '46',
    'CameraSelected' : '42',
    'PresetSelected': '47',
    'PresentationMuted' : '20',
    'MicMuted' : '23',
    'CeilingMicMuted' : '111',
    'HasCeilingMics' : '112',
    'HasMics' : '9',
    'ShowVolumeModal' : '95',
    'ShowPowerModal' : '6',
    'ShowMicModal' : '97',
    'ShowCamModal' : '88',
    'ConfigPrivacyMode' : '79',
    'IsPrivacyModeEnabled' : '103',
    'PresetNameBaseIdx' : 101,
    'CameraNameBaseIdx' : 91,
    'PowerOff': '30',
    'HandleShowPowerModal' : '5',
    'ClosePowerModal' : '31',
    'CloseVolumeModal' : '96',
    'CloseMicModal' : '98',
    'CloseCamModal' : '89',
    'PresetLongPress' : '48',
    'CameraLongPress' : '43',
    'SaveNewNameAnalog' : '40',
    'SaveNewNameDigital' : '190',
    'PresentationVolumeUp': '22',
    'PresentationVolumeDown': '21',
    'MicVolumeUp': '25',
    'MicVolumeDown': '24',
    'Camera_Up': '241',
    'Camera_Down': '242',
    'Camera_Left': '243',
    'Camera_Right': '244',
  }
  const CrSignalType = {
    'Boolean' : 'b',
    'Number' : 'n',
    'String': 's'
}

  useEffect(() => {
    window.CrComLib.subscribeState(CrSignalType.Number, CrSignalName.PresentationVolume, value=> setPresentationVolume(value));
    window.CrComLib.subscribeState(CrSignalType.Number, CrSignalName.MicVolume, value=> setMicVolume(value));
    window.CrComLib.subscribeState(CrSignalType.Number, CrSignalName.NumberOfCameras, value=> setNumCameras(value));
    window.CrComLib.subscribeState(CrSignalType.Number, CrSignalName.NumberOfPresets, value=> setNumOfPresets(value));
    window.CrComLib.subscribeState(CrSignalType.Number, CrSignalName.CameraSelected, value=> setCameraSelected(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.PresentationMuted, value => setIsPresentationMuted(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.MicMuted, value => setIsMicMuted(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.CeilingMicMuted, value => setIsCeilingMicMuted(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.HasCeilingMics, value => setHasCeilingMics(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.HasMics, value => setHasMics(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.ShowPowerModal, value => setShowPowerModal(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.ShowVolumeModal, value => setShowVolumeModal(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.ShowMicModal, value => setShowMicModal(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.ShowCamModal, value => setShowCamModal(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.ConfigPrivacyMode, value=> setConfigPrivacyMode(value));
    window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalName.IsPrivacyModeEnabled, value=> setIsPrivacyModeEnabled(value));

    setPresetNames(Array(numOfPresets).fill('').map((_, index) =>{
      let value;
      window.CrComLib.subscribeState(CrSignalType.String, `${index + CrSignalName.PresetNameBaseIdx}`, incomingValue => {
        value = incomingValue;
        setTempPresetName(value)
      });
      return value;
    }));
    
    setCamNames(Array(numCameras).fill('').map((_, index) =>
    {
      let value;
      window.CrComLib.subscribeState(CrSignalType.String, `${index + CrSignalName.CameraNameBaseIdx}`, incomingValue => {
        value = incomingValue;
        setTempCamName(value);
      });
      return value;
    }));
    
  }, [numCameras, numOfPresets, tempCamName, tempPresetName])

  const programShutOff = () => {
    setProgramStarted(!programStarted)
    // navigate('/WelcomePage');
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.PowerOff, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.PowerOff, false);
    
    console.log("program shut off")
}
  const handleShowPowerModal = () => {
    console.log("Showing Power Modal")
    setShowPowerModal(true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.HandleShowPowerModal, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.HandleShowPowerModal, false);
  }
  const handleClosePowerModal = () => {
    setShowPowerModal(false);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.ClosePowerModal, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.ClosePowerModal, false);
  }

  const handleShowVolumeModal = () => {
    console.log("Showing Volume Modal")
    setShowVolumeModal(true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.ShowVolumeModal, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.ShowVolumeModal, false);
  }
  const handleCloseVolumeModal = () => {
    console.log("Closing Volume Modal")
    setShowVolumeModal(false);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.CloseVolumeModal, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.CloseVolumeModal, false);
  }
  const handleShowMicModal = () => {
    console.log("Showing Microphones Volume Modal")
    setShowMicModal(true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.ShowMicModal, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.ShowMicModal, false);
  }
  const handleCloseMicModal = () => {
    setShowMicModal(false);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.CloseMicModal, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.CloseMicModal, false);
  }
  const handleShowCamModal = () => {
    console.log("Showing Cam Modal")
    setShowCamModal(true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.ShowCamModal, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.ShowCamModal, false);
    
  }
  const handleCloseCamModal = () => {
    console.log("Closing Cam Modal")
    setShowCamModal(false);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.CloseCamModal, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.CloseCamModal, false);
  }
  const togglePresentationMute = () => {
    setIsPresentationMuted((prevIsPresentationMuted) => !(prevIsPresentationMuted));
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.PresentationMuted, true);
    window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.PresentationMuted, false);
    
}

const handleCameraClicked = (cameraNum) => {
  setCameraSelected(cameraNum);
  setShowControls(true);
  window.CrComLib.publishEvent(CrSignalType.Number, CrSignalName.CameraSelected, cameraNum);
  console.log(`${camNames[cameraNum - 1]}clicked` )
}
const handlePresetClicked = (presetNum) => {
  setSelectedPreset(presetNum);
  window.CrComLib.publishEvent(CrSignalType.Number, CrSignalName.PresetSelected, presetNum);
  console.log(`Preset ${presetNum} pressed`)
}
const toggleMicMute = () => {
  setIsMicMuted((prevIsMicMuted) => !(prevIsMicMuted));
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.MicMuted, true);
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.MicMuted, false);
  
}
const toggleCeilingMicMute = () => {
  setIsCeilingMicMuted((prevIsCeilingMicMuted) => !(prevIsCeilingMicMuted));
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.CeilingMicMuted, true);
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.CeilingMicMuted, false);
  
}
const togglePrivacyMode = () => {
  setIsPrivacyModeEnabled(!isPrivacyModeEnabled);
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.IsPrivacyModeEnabled, true);
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.IsPrivacyModeEnabled, false);
}
const sendSignal= (joinNumber, action) => {
  window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
  window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
  console.log(`${action} pressed`);
}
const handlePresetLongPress = (presetNumber) => {
  setSelectedPreset(presetNumber);
  setpresetRenameMode(true);
  window.CrComLib.publishEvent(CrSignalType.Number, CrSignalName.PresetLongPress, presetNumber);
  console.log(`Long press on preset ${presetNumber}`);
};

// Function to handle saving the new name for the preset
const handleSaveNewPresetName = () => {
  // Handle saving the new name for the preset
  const updatedPresetNames = [...presetNames];
  updatedPresetNames[selectedPreset - 1] = newPresetName;
  console.log(`New name for preset ${selectedPreset}: ${newPresetName}`);
  setPresetNames(updatedPresetNames);
  window.CrComLib.publishEvent(CrSignalType.String, CrSignalName.SaveNewNameAnalog, newPresetName);
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.SaveNewNameDigital, true);
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.SaveNewNameDigital, false);
  setpresetRenameMode(false);
  setNewPresetName('');
};

// Function to handle cancelling the renaming process
const handleCancelPresetRename = () => {
  setpresetRenameMode(false);
  setNewPresetName('');
};

// Function to handle changes in the new preset name input field
const handleNewPresetNameChange = (event) => {
  setNewPresetName(event.target.value);
};
const handleCamLongPress = (camNumber) => {
  setSelectedCamera(camNumber);
  setCamRenameMode(true);
  window.CrComLib.publishEvent(CrSignalType.Number, CrSignalName.CameraLongPress, camNumber);
  console.log(`Long press on Camera ${camNumber}`);
};

// Function to handle saving the new name for the preset
const handleSaveNewCamName = () => {
  // Handle saving the new name for the preset
  const updatedCamNames = [...camNames];
  updatedCamNames[selectedCamera - 1] = newCamName;
  console.log(`New name for camera${selectedCamera}: ${newCamName}`);
  setCamNames(updatedCamNames);
  window.CrComLib.publishEvent(CrSignalType.String, CrSignalName.SaveNewNameAnalog, newCamName);
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.SaveNewNameDigital, true);
  window.CrComLib.publishEvent(CrSignalType.Boolean, CrSignalName.SaveNewNameDigital, false);
  setCamRenameMode(false);
  setNewCamName('');
};

// Function to handle cancelling the renaming process
const handleCancelCamRename = () => {
  setCamRenameMode(false);
  setNewCamName('');
};

// Function to handle changes in the new preset name input field
const handleNewCamNameChange = (event) => {
  setNewCamName(event.target.value);
};

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
  
  return (

    <div className="row w-100 position-absolute bottom-0 p-0 m-0 footerRow">
      <div className="col-12 d-flex flex-row align-items-center text-dark p-0 m-0" style={{ backgroundColor: 'var(--bs-secondary)' }}>
        <button type="button"
          className="col h-100 bg-secondary border-0 border-end border-dark text-center font-size-2 font-size-3-xl" onClick={handleShowPowerModal}>
          <i className="d-block bi bi-power mb-1 mb-xl-3 font-size-4 font-size-5-xl"></i>
          <span className="d-block">System Off</span>
        </button>
        <button type="button"
          className="col h-100 bg-secondary border-0 border-end border-dark text-center font-size-2 font-size-3-xl ps-1 pe-1" onClick={handleShowVolumeModal}>
          <i className="d-block bi bi-volume-up-fill mb-1 mb-xl-3 font-size-4 font-size-5-xl"></i>
          <span className="d-block">Presentation Volume</span>
        </button>
        {(hasMics|| hasCeilingMics) &&
          <button type="button"
            className="col h-100 bg-secondary border-0 border-end border-dark text-center font-size-2 font-size-3-xl" onClick={handleShowMicModal}>
            <i className="d-block bi bi-mic-fill mb-1 mb-xl-3 font-size-4 font-size-5-xl"></i>
            <span className="d-block">Microphones</span>
          </button>}
        {(numCameras > 0) &&
          <button type="button"
            className="col h-100 bg-secondary border-0 border-end border-dark text-center font-size-2 font-size-3-xl" onClick={handleShowCamModal}>
            <i className="d-block bi bi-camera-video-fill mb-1 mb-xl-3 font-size-4 font-size-5-xl"></i>
            <span className="d-block">Camera Controls</span>
          </button>}
        {/* Audio Statuses */}
        <div className="col h-100 border-0 pt-2 pb-0 px-1">
          <div className="d-flex col-11 justify-content-start mb-0 mx-auto">
            <div className="col-9 font-size-0 font-size-2-xl m-0 p-0">Presentation Audio</div>
            <div className="col-3 text-center">
              <div
                className={`border-0 rounded-circle mx-auto mb-0 mb-xl-1  ${isPresentationMuted ? 'bg-warning' : 'bg-success'}`} style={{ width: '1vw', height: '1vw' }}>
              </div>
              <div className={`font-size-0 font-size-1-xl ${isPresentationMuted ? '' : ''}`}>{isPresentationMuted ? "Muted" : 'On'}</div>
            </div>
          </div>
          {hasMics &&
          <div className="d-flex col-11 justify-content-start mb-0 mx-auto">
            <div class="col-9 font-size-0 font-size-2-xl p-0 m-0">
              Microphones
            </div>
            <div className="col-3 text-center">
              <div
                className={`border-0 rounded-circle mx-auto mb-0 mb-xl-1  ${isMicMuted ? 'bg-warning' : 'bg-success'}`} style={{ width: '1vw', height: '1vw' }}>
              </div>
              <div className={`font-size-0 font-size-1-xl ${isMicMuted ? '' : ''}`}>{isMicMuted ? "Muted" : 'On'}</div>
            </div>
          </div>}
          {hasCeilingMics && 
          <div className="d-flex col-11 justify-content-start mb-0 mx-auto">
            <div className="col-9 font-size-0 font-size-2-xl p-0 m-0">
              Ceiling Mics
            </div>
            <div className="col-3 text-center">
              <div
                className={`border-0 rounded-circle mx-auto mb-0 mb-xl-1  ${isCeilingMicMuted ? 'bg-warning' : 'bg-success'}`} style={{ width: '1vw', height: '1vw' }}>
              </div>
              <div className={`font-size-0 font-size-1-xl`}>{isCeilingMicMuted ? "Muted" : 'On'}</div>
            </div>
          </div>}
          {configPrivacyMode &&
          <div className="d-flex col-11 justify-content-start mb-0 mx-auto">
            <div className="col-9 font-size-0 font-size-2-xl p-0 m-0">
              Privacy Mode
            </div>
            <div className="col-3 text-center">
              <div
                className={`border-0 rounded-circle mx-auto mb-0 mb-xl-1  ${isPrivacyModeEnabled ? 'bg-success' : 'bg-gray-600'}`} style={{ width: '1vw', height: '1vw' }}>
              </div>
              <div className={`font-size-0 font-size-1-xl`}>{isPrivacyModeEnabled ? "On" : 'Off'}</div>
            </div>
          </div>
          }
        </div>
      
        {/* /Audio Statuses */}
      </div>
      {/* /Row */}

        {/* System Off Modal */}
        <Modal show={showPowerModal} onHide={handleClosePowerModal} fullscreen={fullscreen} animation={false}>
          <Modal.Header className="pb-0">
            <Modal.Title className="col-12 d-flex flex-row justify-content-between">
              <h1 className="font-size-5 font-size-6-xl">
                <button type="button" className="border-0 text-dark"
                  onClick={handleClosePowerModal}><i class="bi bi-arrow-left"></i></button>System Off?</h1>
              <button type="button" className="border-0 text-muted"
                onClick={handleClosePowerModal}><i class="bi bi-x-lg"></i></button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-size-4 font-size-5-xl p-0">
            <div className='container-fluid text-center p-5'>
              <div className="mb-xl-5">Are you sure you want to shut down the system?</div>
              <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-gray-600 col-4 rounded-pill px-5 cancelButton text-white mx-3' onClick={handleClosePowerModal}>
                  Cancel
                </button>
                <button className='btn btn-info col-4 rounded-pill px-5 mx-3' onClick={programShutOff}>
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Presentation Volume Modal */}
      <Modal show={showVolumeModal} onHide={handleCloseVolumeModal} fullscreen={fullscreen} animation={false}>
        <Modal.Header className="pb-0">
          <Modal.Title className="col-12 d-flex flex-row justify-content-between">
            <h1 className="font-size-5 font-size-6-xl">
              <button type="button" className="border-0 text-dark"
              onClick={handleCloseVolumeModal}><i class="bi bi-arrow-left"></i></button>Presentation Volume</h1>
            <button type="button" className="border-0 text-muted"
              onClick={handleCloseVolumeModal}><i class="bi bi-x-lg"></i></button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-size-4 font-size-3-xl p-0">
          <div className='container-fluid text-center pt-3'>
            <div className="my-2 my-xl-5">
            <VolumeControl classNam="mx-auto" initialVolume={presentationVolume} plusJoin={CrSignalName.PresentationVolumeUp} minusJoin={CrSignalName.PresentationVolumeDown}  isMuted={isPresentationMuted} volumeJoin='1' />
            </div>
            <div class="col-12 text-center mb-4">
              <Button type="button"
                className={`btn border-0 rounded-circle text-center mx-auto mb-3 mb-xl-4 muteIcon ${isPresentationMuted ? 'btn-info' : 'btn-gray'}`}
                onClick={togglePresentationMute}>
                <i
                className={`d-inline-block bi font-size-5 font-size-5-xl mx-auto ${isPresentationMuted ? 'bi-mic-mute-fill text-white' : 'bi-mic-fill'}`}
                ></i>
              </Button>
              <div className='font-size-3 font-size-4-xl'>{isPresentationMuted ? 'Unmute' : 'Mute'}</div>
            </div>

            <div className="row">
              <div className="col-8 d-flex justify-content-start bg-secondary py-3 px-5 mx-auto">
                <div className="col-1">
                  <i
                    className={`d-block bi bi-info-circle-fill text-info font-size-4 font-size-5-xl`}
                  ></i>
                </div>
                <div className="col-11 font-size-3 font-size-4-xl">
                  Sound not playing? Be sure to select the correct audio on your device.
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Microphone Modal */}
      <Modal show={showMicModal} onHide={handleCloseMicModal} fullscreen={fullscreen} animation={false}>
        <Modal.Header className="pb-0">
          <Modal.Title className="col-12 d-flex flex-row justify-content-between">
            <h1 className="font-size-5 font-size-6-xl">
              <button type="button" className="border-0 text-dark"
              onClick={handleCloseMicModal}><i class="bi bi-arrow-left"></i></button>Microphones</h1>
            <button type="button" className="border-0 text-muted"
              onClick={handleCloseMicModal}><i class="bi bi-x-lg"></i></button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-size-4 font-size-3-xl p-0 pt-2">
          <div className='container-fluid text-center pt-1'>
          {hasMics && (
            <>
              <div className="my-3 my-xl-5">
              <VolumeControl initialVolume={MicVolume} plusJoin={CrSignalName.MicVolumeUp} minusJoin={CrSignalName.MicVolumeDown} isMuted={isMicMuted} />
              </div>
            </>
            )}
            <div className="col-12 d-flex flex-wrap justify-content-around py-3">
              {hasMics && (
                <div className="col-6">
                  <button type="button"
                    className={`btn d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-3 mb-xl-4 muteIcon ${isMicMuted ? 'btn-info' : 'btn-gray'}`}
                    onClick={toggleMicMute}>
                    <i
                      className={`d-inline-block bi font-size-5 font-size-5-xl mx-auto ${isMicMuted ? 'bi-mic-mute-fill text-white' : 'bi-mic-fill'}`}
                    ></i>
                  </button>
                  <div className='font-size-3 font-size-4-xl'>{isMicMuted ? 'Unmute Wireless Mics' : 'Mute Wireless Mics'}</div>
                </div>
              )}
              {hasCeilingMics &&
                <div className="col-6">
                  <button type="button"
                    className={`btn d-flex align-items-center border-0 rounded-circle text-center mx-auto mb-3 mb-xl-4 muteIcon ${isCeilingMicMuted ? 'btn-info' : 'btn-gray'}`}
                    onClick={toggleCeilingMicMute}>
                    <i
                      className={`d-inline-block bi font-size-5 font-size-5-xl mx-auto ${isCeilingMicMuted ? 'bi-mic-mute-fill text-white' : 'bi-mic-fill'}`}
                    ></i>
                  </button>
                  <div className='font-size-3 font-size-4-xl'>{isCeilingMicMuted ? 'Unmute Ceiling Mics' : 'Mute Ceiling Mics'}</div>
                </div>}
              {configPrivacyMode && 
                <div className="col-3 col-lg-2 position-relative">
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
                  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
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

        {/* Camera Control Modal */}
        <CModal show={showCamModal} onHide={handleCloseCamModal} title="Camera Controls">
        <h2 className="text-center mb-4 font-size-4 font-size-5-xl">Select Camera</h2>
        <div className='row'>
          <div className="col-12 d-flex flex-wrap justify-content-around">
            {Array.from({ length: numCameras }, (_, index) => {
              const camNumber = index + 1
              return (
                <button key={camNumber}
                  className={`btn col-3 rounded-pill border-0 px-2 py-xl-3 mx-2 mb-4 mb-xl-5 font-size-3 font-size-4-xl cameraButton ${(cameraSelected === camNumber) ? 'btn-info' : 'bg-gray-300'}`}
                  onClick={() => handleCameraClicked(index + 1)}
                  onMouseDown={() => {
                    holdTimeoutRef.current = setTimeout(() => handleCamLongPress(camNumber), 500);
                  }}
                  onMouseUp={() => clearTimeout(holdTimeoutRef.current)}
                  onTouchStart={() => {
                    holdTimeoutRef.current = setTimeout(() => handleCamLongPress(camNumber), 500);
                  }}
                  onTouchEnd={() => clearTimeout(holdTimeoutRef.current)}
                  onMouseLeave={() => clearTimeout(holdTimeoutRef.current)}>
                  <i className="bi bi-camera-video-fill me-2"></i>
                  {camNames[camNumber - 1]}
                </button>)
            })}
          </div>
        </div>

          {/* Camera Rename Modal */}
          <Modal show={camRenameMode} onHide={handleCancelCamRename} fullscreen={fullscreen}>
          <Modal.Header>
            <Modal.Title className="col-12 d-flex flex-row justify-content-between">
              <h1 className="font-size-5 font-size-6-xl">
                <button type="button" className="border-0 text-dark"
                  onClick={handleCancelCamRename}><i class="bi bi-arrow-left"></i></button>Rename Camera</h1>
              <button type="button" className="border-0 text-muted"
                onClick={handleCancelCamRename}><i class="bi bi-x-lg"></i></button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-8 pt-5 mx-auto">
              <input
                className="form-control"
                placeholder="Enter a new camera name"
                value={newCamName}
                onChange={handleNewCamNameChange} />
            </div>
          </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancelCamRename}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveNewCamName}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          {/* /Camera Rename Modal */}

          {(cameraSelected !== 0) && (
            <div>
              <div>
              {/* Camera Controls Row */}
              <div className="row align-items-center">
                <h2 className="text-center mb-4 font-size-4 font-size-5-xl">
                  <span className="d-block mx-auto cameraNameHeading">{camNames[cameraSelected - 1]}</span>
                  </h2>
                <div className="col-3">
                <Opad upJoin={CrSignalName.Camera_Up} downJoin={CrSignalName.Camera_Down} leftJoin={CrSignalName.Camera_Left} rightJoin={CrSignalName.Camera_Right}/>
                </div>
                <div className="col-2 text-center">
                  <label className="d-block mb-2 font-size-3 font-size-4-xl"
                    for="Zoom buttons"><i className="bi bi-zoom-in"></i> Zoom</label>
                  <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                    <button type="button" className="btn btn-info border-0 rounded-start-pill p-3 px-4 ps-xl-5 text-white font-size-2 font-size-4-xl" onClick={() => sendSignal('74', 'Zoom Out')}>
                      <i className="bi bi-dash-circle-fill"></i>
                    </button>
                    <button type="button" className="btn bg-info border-0 rounded-end-pill p-3 px-4 pe-xl-5 text-white font-size-2 font-size-4-xl" onClick={() => sendSignal('75', 'Zoom In')}>
                      <i className="bi bi-plus-circle-fill"></i>
                    </button>
                  </div>
                </div>
                <div className="col">
                {Array.from({ length: Math.ceil(numOfPresets / 2) }).map((_, rowIndex) => (
                      <Row key={rowIndex} className="">
                        {Array.from({ length: 2 }, (_, colIndex) => {
                          const presetNumber = rowIndex * 2 + colIndex + 1;
                          return (
                            presetNumber <= numOfPresets && (
                              <div key={presetNumber} className="col-6 text-center pt-2 pt-xl-4 px-4">
                                  <button
                                  className={`btn col-12 rounded-pill border-0 py-3 px-3 me-1 mb-2 mb-xl-3 presetButton ${(selectedPreset === presetNumber) ? 'btn-info' : 'btn-gray'}`}
                                  key={presetNumber}
                                  onClick={() => handlePresetClicked(presetNumber)}
                                  onMouseDown={() => {
                                    holdTimeoutRef.current = setTimeout(() => handlePresetLongPress(presetNumber), 500);
                                  }}
                                  onMouseUp={() => clearTimeout(holdTimeoutRef.current)}
                                  onMouseLeave={() => clearTimeout(holdTimeoutRef.current)}
                                  onTouchStart={() => {
                                    holdTimeoutRef.current = setTimeout(() => handlePresetLongPress(presetNumber), 500);
                                  }}
                                  onTouchEnd={() => clearTimeout(holdTimeoutRef.current)}
                                > 
                                {presetNames[presetNumber - 1]}
                                </button>
                              </div>
                            )
                          );
                        })}
                      </Row>
                    ))}
                </div>
              </div>
                {/* Preset Rename Modal */}
              <Modal show={presetRenameMode} onHide={handleCancelPresetRename} fullscreen={fullscreen}>
                <Modal.Header>
                  <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                    <h1 className="font-size-5 font-size-6-xl">
                      <button type="button" className="border-0 text-dark"
                        onClick={handleCancelPresetRename}><i class="bi bi-arrow-left"></i></button>Rename Preset</h1>
                    <button type="button" className="border-0 text-muted"
                      onClick={handleCancelPresetRename}><i class="bi bi-x-lg"></i></button>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="col-8 pt-5 mx-auto">
                    <input
                      className="form-control"
                      placeholder="Enter a new preset name"
                      value={newPresetName}
                      onChange={handleNewPresetNameChange} />
                  </div>
                </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelPresetRename}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveNewPresetName}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* /Preset Rename Modal */}
              </div>
            </div>
          )}
        </CModal>      
    </div>
  );
};

export default BottomBar;
