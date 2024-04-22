import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './Header.css'
import logo from "./Icons/Northwestern_WHITE.svg"
import { useNavigate } from 'react-router-dom';


function Header(){
    const [classRoom, setClassRoom] = useState("");
    const [configRoomName, setConfigRoomName] = useState('')
    const [configIpAdd, setConfigIpAdd] = useState('');
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [pwValue, setPwValue] = useState('');
    const [textFieldsNum, setTextFieldsNum] = useState(0);
    const [textFields, setTextFields] = useState([])
    const [textFieldsValues, setTextFieldsValues] = useState([]);
    const [toggleButtons, setToggleButtons] = useState([]);
    const [toggleButtonsNum, setToggleButtonsNum] = useState(0);
    const [toggleButtonsStates, setToggleButtonsStates] = useState([])
    const [tempField, setTempField] = useState('');
    const [tempValue, setTempValue] = useState(0);
    const [tempToggleText, setTempToggleText] = useState('');
    const [tempToggleState, setTempToggleState] = useState(false)
    const holdTimeoutRef = useRef(null);

    const navigate = useNavigate();
    useEffect(() =>{
        window.CrComLib.subscribeState('s','1', value=> setClassRoom(value));
        // window.CrComLib.subscribeState('s','5', value=> setConfigRoomName(value));
        window.CrComLib.subscribeState('s','6', value=> setConfigIpAdd(value));
        window.CrComLib.subscribeState('b', '93', value=> setShowAdminModal(value));
        window.CrComLib.subscribeState('s','25', value => setPwValue(value));
        window.CrComLib.subscribeState('n','22', value => setTextFieldsNum(value));
        window.CrComLib.subscribeState('n','21', value => setToggleButtonsNum(value));
        setTextFields(Array(textFieldsNum).fill('').map((_, index) =>{
            let value;
            window.CrComLib.subscribeState('s', `${index + 71}`, incomingValue => {
              value = incomingValue;
              setTempField(value)
            //   console.log('temp field', tempField)
            });
            return value;
          }));
          
        setTextFieldsValues(Array(textFieldsNum).fill('').map((_, index) =>
            {
            let value;
            window.CrComLib.subscribeState('n', `${index + 23}`, incomingValue => {
                value = incomingValue;
                setTempValue(value)
                // console.log('temp value', tempValue)
            });
            return value;
            }));
        setToggleButtons(Array(toggleButtonsNum).fill('').map((_, index) =>{
            let value;
            window.CrComLib.subscribeState('s', `${index + 51}`, incomingValue => {
                value = incomingValue;
                setTempToggleText(value)
                // console.log('temp field', tempToggleText)
            });
            return value;
            }));
        setToggleButtonsStates(Array(toggleButtonsNum).fill('').map((_, index) =>{
            let value;
            window.CrComLib.subscribeState('b', `${index + 331}`, incomingValue => {
                value = incomingValue;
                setTempToggleState(value)
                // console.log('temp state', tempToggleState)
            });
            return value;
            }));
        
        // console.log('num of text fields', textFieldsNum)
        // console.log('num of toggle buttons', toggleButtonsNum)
        // console.log('array of text fields', textFields)
        // console.log('array of text fields values', textFieldsValues)
        // console.log('array of toggle buttons', toggleButtons)
        console.log('room name is', configRoomName);
        // console.log('ipadd is', configIpAdd)
    }, [pwValue, textFieldsNum, toggleButtonsNum, textFieldsValues, toggleButtonsStates])
    const handleShowHelpModal = () => {
        console.log("Showing Help Modal")
        setShowHelpModal(true);
        window.CrComLib.publishEvent('b', '150', true);
        window.CrComLib.publishEvent('b', '150', false);
      }
    const handleCloseHelpModal = () => {
        console.log("Closing Help Modal")
        setShowHelpModal(false);
        window.CrComLib.publishEvent('b', '151', true);
        window.CrComLib.publishEvent('b', '151', false);
      }
    const handleShowAdminModal = () => {
        window.CrComLib.publishEvent('b', '130', true);
        window.CrComLib.publishEvent('b', '130', false)
     }
    const handleCloseAdminModal = () => {
        
        window.CrComLib.publishEvent('b', '123', true);
        window.CrComLib.publishEvent('b', '123', false);
        navigate('/HomePage');
    }

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
        window.CrComLib.publishEvent('b', '122', true);
        window.CrComLib.publishEvent('b', '122', false);
        console.log('Closing Password Modal')
    }

    const handleAdminLongPress = () => {
        // setShowAdminModal(true);
        setShowPasswordModal(true);
        window.CrComLib.publishEvent('b', '120', true);
        window.CrComLib.publishEvent('b', '120', false);
      };
    const handlePwKeyPres = (joinNumber) => {
        window.CrComLib.publishEvent('b', `${joinNumber}`, true);
        window.CrComLib.publishEvent('b', `${joinNumber}`, false);
        console.log('pw key pressed', joinNumber)
    };
    const handleSaveConfig = () => {
        window.CrComLib.publishEvent('b', '124', true);
        window.CrComLib.publishEvent('b', '124', false);
    };
    const handleResetConfig = () => {
        window.CrComLib.publishEvent('b', '125', true);
        window.CrComLib.publishEvent('b', '125', false);
    }
    const handleIncreaseOrDecrease = (joinNumber, currIdx) => {
        window.CrComLib.publishEvent('b', `${joinNumber}`, true);
        window.CrComLib.publishEvent('b', `${joinNumber}`, false);
        console.log('join pressed', joinNumber)
        console.log('current index is', currIdx)
    }
    const handleRoomNameChange = (event) => {
        console.log("input is",event.target.value)
        setConfigRoomName(event.target.value);
        window.CrComLib.publishEvent('s', '5', configRoomName)
    }
    const handleIpChange = (event) => {
        setConfigIpAdd(event.target.value);
        window.CrComLib.publishEvent('s', '6', configIpAdd)
    }
    const handleToggleStateChange = (joinNumber) => {
        window.CrComLib.publishEvent('b', `${joinNumber}`, true);
        window.CrComLib.publishEvent('b', `${joinNumber}`, false);
        console.log('toggle state changed', joinNumber)
    }

    return(
        <div className='row p-0 m-0 headerRow'>
            <div className="col-12 d-flex flex-row justify-content-around align-items-center bg-primary font-size-3 font-size-4-xl p-0">
                    <div className="col-3">
                        <img
                            src={logo}
                            alt="Northwestern Logo"
                            className='img-fluid'
                            style={{width:'12em', height:'auto'}}/>
                    </div>
                    <div className="col-1 text-center p-0">
                        <div className="text-primary py-3 py-xl-5 font-size-1"
                        // onMouseDown={() => {
                        //     holdTimeoutRef.current = setTimeout(() => handleAdminLongPress(), 500);
                        //   }}
                        //   onMouseUp={() => clearTimeout(holdTimeoutRef.current)}
                        //   onTouchStart={() => {
                        //     holdTimeoutRef.current = setTimeout(() => handleAdminLongPress(), 500);
                        //   }}
                        //   onTouchEnd={() => clearTimeout(holdTimeoutRef.current)}
                        //   onMouseLeave={() => clearTimeout(holdTimeoutRef.current)}
                          onMouseDown={() => {
                            holdTimeoutRef.current = setTimeout(() => handleAdminLongPress(), 500);
                          }}
                          onMouseUp={() => clearTimeout(holdTimeoutRef.current)}
                          onTouchStart={() => {
                            holdTimeoutRef.current = setTimeout(() => handleAdminLongPress(), 500);
                          }}
                          onTouchEnd={() => clearTimeout(holdTimeoutRef.current)}
                          onMouseLeave={() => clearTimeout(holdTimeoutRef.current)}
                        >
                        admin button
                        </div>
                    </div>
                    <div className="col-2 text-center text-white">
                        <span>{(classRoom == "") ? 'Room' : classRoom}</span>
                    </div>
                    <div className="col-3 text-center text-white">
                                <span className="d-block mb-2">
                                    <ch5-datetime 
                                        displaytype="date" 
                                        styleForDate="MMMM d, yyyy">
                                    </ch5-datetime>
                                </span>    
                                <span className='d-inline-block'>
                                    <ch5-datetime 
                                        displaytype="time">
                                    </ch5-datetime>
                                </span>
                    </div>
                    <div className="col-1 text-white text-center">
                    <button
                        className="btn btn-info d-flex align-items-center rounded-circle mx-auto text-white font-size-4 font-size-5-xl circleIcon" onClick={handleShowHelpModal}>
                        <i className="d-inline-block bi bi-question-lg mx-auto"></i>
                    </button>
                    </div>
                <div>

                    {/* Help Modal */}
                    <Modal show={showHelpModal} onHide={handleCloseHelpModal} fullscreen={fullscreen}>
                        <Modal.Header className="pb-0">
                            <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                                <h1 className="font-size-5 font-size-6-xl">
                                    <button type="button" className="border-0 text-dark"
                                        onClick={handleCloseHelpModal}><i class="bi bi-arrow-left"></i></button>Help</h1>
                                <button type="button" className="border-0 text-muted"
                                    onClick={handleCloseHelpModal}><i class="bi bi-x-lg"></i></button>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="font-size-4 font-size-5-xl p-4 p-xl-5">
                            <div className='container-fluid text-center'>
                                    <p>Please use the number below to call our support team for assistance.</p>
                                    <span className="d-block text-info fw-bold mt-5">7-ROOM</span>
                                    <span className="d-block text-muted mb-5">(847-467-7666)</span>
                                    <p>You are currently in room:</p>
                                    <span className='text-info fw-bold'>
                                    {(classRoom == "") ? 'Room' : classRoom}
                                </span>
                            </div>
                        </Modal.Body>
                    </Modal>

                     {/* Password Modal Placeholder */}
                     <Modal show={showPasswordModal} fullscreen={fullscreen}>
                        <Modal.Header className="pb-1">
                            <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                                <h1 className="font-size-5 font-size-6-xl">
                                    <button type="button" className="border-0 text-dark"
                                        onClick={handleClosePasswordModal}><i class="bi bi-arrow-left"></i></button>Password Required</h1>
                                <button type="button" className="border-0 text-muted font-size-3 font-size-5-xl"
                                    onClick={handleClosePasswordModal}><i class="bi bi-x-lg"></i></button>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="font-size-4 font-size-5-xl p-0 pt-1">
                            <div className='container-fluid overflow-y-auto'>
                            <div className="d-flex flex-wrap col-4 justify-content-around pt-3 pt-xl-5 mx-auto">
                                <div className="d-flex flex-row col-12 justify-content-center align-items-center">
                                <div className="col-9">
                                    <input className="form-control border-0 rounded-pill bg-gray-300 text-muted text-center font-size-1 font-size-3-xl p-3 mb-3"
                                    placeholder='' 
                                    value={pwValue}/>
                                </div>
                                <div className="col-2 text-center p-0">
                                    <i className="bi bi-backspace-fill"></i>
                                </div>
                                </div>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('131')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">1</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('132')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">2</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('133')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">3</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('134')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">4</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('135')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">5</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('136')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">6</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('137')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">7</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('138')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">8</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('139')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">9</span>
                                </Button>
                                <Button className="btn btn-gray rounded-circle border-0 p-0 mb-2 mb-xl-3 mx-2 dialpadButton"
                                    onClick={() => handlePwKeyPres('140')}>
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl">0</span>
                                </Button>
                                <Button className="btn btn-gray col-8 rounded-pill border-0 p-0 mb-2 mb-xl-3">
                                    <span className="d-block fw-bold font-size-4 font-size-5-xl" onClick={handleShowAdminModal}>Enter</span>
                                </Button>
                            </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    
                    {/* Admin Modal */}
                    <Modal show={showAdminModal} onHide={handleCloseAdminModal} fullscreen={fullscreen}>
                        <Modal.Header className="pb-1">
                            <Modal.Title className="col-12 d-flex flex-row justify-content-between">
                                <h1 className="font-size-5 font-size-6-xl">
                                    <button type="button" className="border-0 text-dark"
                                        onClick={handleCloseAdminModal}><i class="bi bi-arrow-left"></i></button>Admin</h1>
                                {/* <h2 className="align-self-center font-size-2 font-size-4-xl text-center">
                                    <strong>Project file:</strong> placeholder.ch5z
                                </h2> */}
                                <button type="button" className="border-0 text-muted font-size-3 font-size-5-xl"
                                    onClick={handleCloseAdminModal}><i class="bi bi-x-lg"></i></button>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="font-size-4 font-size-5-xl p-0 pt-1">
                            <div className='container-fluid overflow-y-auto'>
                                <div className="row flex-wrap align-items-start justify-content-around pt-xl-3 my-4">
                                    <div className="col-5 d-flex flew-row align-items-center p-0 mb-2 mb-xl-2">
                                        <FloatingLabel
                                            controlId="roomName"
                                            label="Room Name"
                                            className="col text-muted font-size-1 font-size-2-xl p-0"
                                            
                                        >
                                            <Form.Control type="text/input" placeholder={classRoom} className="font-size-1 font-size-2-xl pt-2 pb-0 pt-xl-5 pb-xl-4" 
                                                value={configRoomName}
                                                onChange={handleRoomNameChange}/>
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-5 d-flex flew-row align-items-center p-0 mb-2 mb-xl-2">
                                        <FloatingLabel
                                            controlId="wirelessAddress"
                                            label="Wireless Address"
                                            className="col text-muted font-size-1 font-size-2-xl p-0"
                                        >
                                            <Form.Control type="text" placeholder="Wireless Address" className="font-size-1 font-size-2-xl pt-2 pb-0 pt-xl-5 pb-xl-4" 
                                                value={configIpAdd}
                                                onChange={handleIpChange}/>
                                        </FloatingLabel>
                                    </div>
                                </div>
                                {/* HDMI Switcher row */}
                                <div className="row flex-wrap mt-1 mb-4 font-size-2 font-size-4-xl">
                                    <h3 className="text-center fw-bold mb-4 font-size-2 font-size-4-xl">Enter input # of HDMI switcher or 0 for none</h3>
                                    {/* HDMI Switcher */}
                                    
                                    {Array.from({ length: textFieldsNum }, (_, index) => (
                                        <div className="col-6 h-100">
                                            <div key={index} className="d-flex flex-row align-items-center mb-2 mb-xl-3">
                                                <div className="col-6 text-center">
                                                    <span>{textFields[index]}</span>
                                                    <span className="fw-bold">:{textFieldsValues[index]}</span>
                                                </div>
                                                <div className="col-6 text-center">
                                                    <div className="btn-group mb-1" role="group" aria-label="Zoom buttons">
                                                        <button type="button" className="btn btn-info border-0 rounded-end-pill text-white px-3 px-xl-4 py-1  font-size-2 font-size-3-xl"
                                                            onClick={() => handleIncreaseOrDecrease(`${index * 2 + 361}`, index)}><i className="bi bi-plus-circle-fill"></i></button>
                                                        <button type="button" className="btn btn-info border-0 rounded-start-pill text-white px-3 px-xl-4 py-1 font-size-2 font-size-3-xl"
                                                            onClick={() => handleIncreaseOrDecrease(`${index * 2 + 361 + 1}`, index)}><i className="bi bi-dash-circle-fill"></i></button>
                                                        
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    ))}
                                </div>
                                {/* /HDMI button row */}
                                <div className="row flex-nowrap overflow-y-auto adminPresetButtonRow p-0 px-3 mt-1 my-4 mx-2">
                                    {Array.from({ length: toggleButtonsNum }, (_, index) => (
                                        <button key={index} className={`btn btn-info rounded-pill border-0 px-3 me-2 mb-3 presetButton
                                            ${(toggleButtonsStates[index]) ? 'btn-info text-white' : 'btn-gray text-black'}`}
                                            onClick={() => handleToggleStateChange(`${index + 331}`)}>
                                            {toggleButtons[index]}
                                        </button>
                                    ))}
                                    
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="p-1">
                            <Button variant="secondary" className="font-size-2 font-size-4-xl mx-2" onClick={handleCloseAdminModal}><i className="bi bi-x-circle me-1"></i> Cancel</Button>
                            <Button variant="info" className="font-size-2 font-size-4-xl mx-2" onClick={handleResetConfig}><i className="bi bi-arrow-clockwise me-1"></i>Reset</Button>
                            <Button variant="primary" className="font-size-2 font-size-4-xl mx-2" onClick={handleSaveConfig}> <i className="bi bi-floppy-fill me-1"></i>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>

           </div>   
        </div>
    );

}


export default Header;
