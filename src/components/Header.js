import React, { useEffect, useState } from 'react';
import './Header.css'
import logo from "./Icons/Northwestern_WHITE.svg"
function Header(){
    const [classRoom, setClassRoom] = useState("");
    useEffect(() =>{
        window.CrComLib.subscribeState('s','1', value=> setClassRoom(value));
    }, [])
    
    return(
        <div className='pb-0 px-4 bg-primary text-white row align-items-center header w-100'>
            
                    <div className="col-md-3 pl-0">
                        <img
                            src={logo}
                            alt="Northwestern Logo"
                            className='img-fluid'/>
                    </div>
                    <div className="col-md-3 align-items-center">
                        <h5 className='h6 mb-0'>{classRoom ? {classRoom} : 'Room ABCD'}</h5>
                    </div>
                    <div className="col-md-4 ">
                        <div className="row">
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
                    <div className="rounded-circle  bg-info help-button ml-1">
                        <div className='row helpButton'>
                            <h6 className='h7 col-md-12 mb-0'>?</h6>
                            <h6 className='h7 col-md-12 mb-0'>Help</h6>
                        </div>
                        
                    </div>

              
        </div>
    );

}


export default Header;