import React, { useEffect, useState } from 'react';
import './Header.css'
import logo from "./Icons/Northwestern_WHITE.svg"
function Header(){
    const [classRoom, setClassRoom] = useState("");
    useEffect(() =>{
        window.CrComLib.subscribeState('s','1', value=> setClassRoom(value));
    }, [])
    
    return(
        <div className='py-0 pb-0 px-5 bg-primary text-white row align-items-center'>
            
                    <div className="col-md-3 mx-auto pl-1">
                        <img
                            src={logo}
                            alt="Northwestern Logo"
                            className='img-fluid'/>
                    </div>
                    <div className="col-md-4">
                        <h4>{classRoom}</h4>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <ch5-datetime 
                                    displaytype="date" 
                                    styleForDate="MMMM d, yyyy">
                                </ch5-datetime>
                            </div>
                            <div className="col-md-12">
                                <ch5-datetime 
                                    displaytype="time">
                                </ch5-datetime>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-circle col-md-1 bg-info help-button d-flex align-items-center justify-content-center">
                        <p >? Help</p>
                    </div>

              
        </div>
    );

}


export default Header;