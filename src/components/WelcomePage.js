import logo from "./Icons/Northwestern_purple.svg"
import Header from './Header';
import React, {useMemo, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage({programStarted, setProgramStarted}) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    setProgramStarted(!programStarted);
    window.CrComLib.publishEvent('b','1', true);
    window.CrComLib.publishEvent('b','1', false);
    console.log("Signal sent to processor");
    // navigate('/HomePage')
};

  return (
    <div>
        <Header/>
        <div className="container-fluid" onClick={handleClick}>
            <div className="row">
                <div className="col-8 mx-auto my-5">
                    <img src={logo} alt='Northwestern Logo' className='img-fluid'/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center mt-5">
                    <h1 className="display-2">Welcome.</h1>
                    <h2 className="display-4">Touch anywhere to get started.</h2>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WelcomePage;
