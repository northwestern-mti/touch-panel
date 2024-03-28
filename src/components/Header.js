import React, { useEffect, useState } from 'react';
import './Header.css'
import logo from "./Icons/Northwestern_WHITE.svg"
import CModal from './CModal';


function Header(){
    const [classRoom, setClassRoom] = useState("");
    const [showHelpModal, setShowHelpModal] = useState(false);
    const handleShowHelpModal = () => {
        console.log("Showing Modal")
        setShowHelpModal(true);
      }
      const handleCloseHelpModal = () => {
        setShowHelpModal(false);
      }
    useEffect(() =>{
        window.CrComLib.subscribeState('s','1', value=> setClassRoom(value));
        console.log(classRoom)
    }, [])
    
    
    return(
        <div className='pb-0 px-4 bg-primary  row align-items-center w-100 m-0'>
            
                    <div className="col-md-4 pl-0">
                        <img
                            src={logo}
                            alt="Northwestern Logo"
                            className='img-fluid'/>
                    </div>
                    <div className="col-md-3 align-items-center">
                        <h5 className='h6 mb-0 text-white'>{(classRoom == "") ? 'Room ABCD' : classRoom}</h5>
                    </div>
                    <div className="col-md-4 ">
                        <div className="row text-white ">
                            <div className="col-md-12 mb-0">
                                <h5 className='h7 mb-0'>
                                    <ch5-datetime 
                                        displaytype="date" 
                                        styleForDate="MMMM d, yyyy">
                                    </ch5-datetime>
                                </h5>    
                            </div>
                            <div className="col-md-12">
                                <h5 className='h7 mb-0'>
                                    <ch5-datetime 
                                        displaytype="time">
                                    </ch5-datetime>
                                </h5>
                                
                            </div>
                        </div>
                    </div>
                    <div className="rounded-circle  bg-info help-button ml-1" onClick={handleShowHelpModal}>
                        <div className='row helpButton text-white'>
                            <h6 className='h7 col-md-12 mb-0'>?</h6>
                            <h6 className='h7 col-md-12 mb-0'>Help</h6>
                        </div>
                        
                    </div>
                    <div>
                    <CModal show={showHelpModal} onHide={handleCloseHelpModal} title='Help' className="justify-content-center">
                        <div className='content col-10 align-items-center ml-5 pl-5 pt-5'>
                            <h5 className='align-itesm-center '>Please use the number below to call our support team for assistance</h5>
                            <h5 className='text-info'>847-555-555</h5>
                            <h5>You are currently in room:</h5>
                            <h5 className='text-info'>{(classRoom == "") ? 'Room ABCD' : classRoom}</h5>
                        </div>
                        
                    </CModal>
                    </div>

              
        </div>
    );

}


export default Header;