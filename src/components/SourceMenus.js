import React from 'react';
import { useState, useEffect } from "react";
import WirelessIcon from './Icons/Wireless with Solstice Icon.svg';
import DisplayArea from './DisplayArea';
import './SourceMenus.css';


const SourceMenus = () => {
    const [selectedButton, setSelectedButton] = useState(false);
    const [inputSelected1, setInputSelected1] = useState('');
    const [source1, setSource1] = useState(0);
    const [inputSelected2, setInputSelected2] = useState('');
    const [source2, setSource2] = useState(0);
    const [showDesktop, setShowDesktop] = useState(false);
    const [showLaptop, setShowLaptop] = useState(false);
    const [showWireless, setShowWireless] = useState(false);
    const [showBluray, setShowBluray] = useState(false);
    const [showDocCam, setShowDocCam] = useState(false);
    const [showConfCall, setShowConfCall] = useState(false);

    useEffect(() => {
        window.CrComLib.subscribeState('b', '211', value=> setShowDesktop(value));
        window.CrComLib.subscribeState('b', '212', value=> setShowLaptop(value));
        window.CrComLib.subscribeState('b', '213', value=> setShowWireless(value));
        window.CrComLib.subscribeState('b', '214', value=> setShowBluray(value));
        window.CrComLib.subscribeState('b', '215', value=> setShowDocCam(value));
        window.CrComLib.subscribeState('b', '217', value=> setShowConfCall(value));
        window.CrComLib.subscribeState('n', '51', value => setSource1(value));
        window.CrComLib.subscribeState('n', '52', value => setSource2(value));
        
    }, []);

    const handleSourceSelected1 = (joinNumber,sourceId) => {
        setSelectedButton(true);
        if (joinNumber !== inputSelected1) {
            if (inputSelected1 === ''){
                setInputSelected1(`${joinNumber}`);
                setSource1(sourceId);
                window.CrComLib.publishEvent('b', `${joinNumber}`, true);
                window.CrComLib.publishEvent('b', `${joinNumber}`, false);
                console.log("signal sent to join number:" + `${joinNumber}`)
            } else {
                console.log('transfering signal from: ' +`${inputSelected1}`+ ' to ' + `${joinNumber}` )
                setInputSelected1(`${joinNumber}`);
                setSource1(sourceId);
                window.CrComLib.publishEvent('b', `${joinNumber}`, true);
                window.CrComLib.publishEvent('b', `${joinNumber}`, false);
                console.log("signal sent to join number:" + `${joinNumber}`)   
            }
        } 
    }
    const handleSourceSelected2 = (joinNumber,sourceId) => {
        setSelectedButton(true);
        if (joinNumber !== inputSelected2) {
            if (inputSelected2 === ''){
                setInputSelected2(`${joinNumber}`);
                setSource2(sourceId);
                window.CrComLib.publishEvent('b', `${joinNumber}`, true);
                window.CrComLib.publishEvent('b', `${joinNumber}`, false);
                console.log("signal sent to join number:" + `${joinNumber}`)
            } else {
                console.log('transfering signal from: ' +`${inputSelected2}`+ ' to ' + `${joinNumber}` )
                setInputSelected2(`${joinNumber}`);
                setSource2(sourceId);
                window.CrComLib.publishEvent('b', `${joinNumber}`, true);
                window.CrComLib.publishEvent('b', `${joinNumber}`, false);
                console.log("signal sent to join number:" + `${joinNumber}`)   
            }
        } 
    }

    const toggleDisplay = (display) => {
        window.CrComLib.publishEvent('b', `${display}`, true);
        window.CrComLib.publishEvent('b', `${display}`, false);
        console.log('source sent to projector')
    }    

    return (
        <div className="col-12 d-flex flex-row text-bg-light px-0 bodyContainer">
        {/* Source Select Menu Left */}
        <div className="col-2 d-flex flex-column text-start p-0 sourceSelectMenu">
            {showDesktop &&
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 1) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1('200', 1)}>
                    <i className="bi bi-pc-display me-1"></i> Resident Computer
                </button>}
            {showLaptop &&
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 2) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1('201', 2)}>
                    <i className="bi bi-laptop me-1"></i> Laptop and Other Sources
                </button>}
            {showWireless && 
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 3) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1('202', 3)}>
                    <img className="containter-fluid me-1" src={WirelessIcon} alt='Wireless icon'
                    style={{width:'var(--font-size-3'}}></img> Wireless with Solstice
                </button>}
            {showConfCall && 
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 6) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1('205', 6)}>
                    <i className="bi bi-telephone me-1"></i> Conference Call
                </button>}
            {showDocCam &&
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 5) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1('204', 5)}>
                    <i className="bi bi-journal-text me-1"></i> Document Camera
                </button>}
            {showBluray && 
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 4) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1('203', 4)}>
                    <i className="bi bi-disc me-1"></i> Blu-Ray
                </button>}
        </div>
        
        {/* Display Area Left */}
        <div className="col d-flex flex-column border-end border-dark p-0 m-0 align-items-start">
            <DisplayArea sourceSelected={source1} displayJoin={'253'} side='left'
                showAnnotationJoin='42' showFullScreenJoin='44' annotationJoin='41' fullscreenJoin='43'
                powerOff='251' powerOn='252' upJoin='256' downJoin='255' showDisplayModalJoin='8' closeDisplayModalJoin='39'/>
        </div>

         {/* Display Area Right */}
        <div className="col p-0 m-0">
        <DisplayArea sourceSelected={source2} displayJoin={'260'} side='right' 
                showAnnotationJoin='46' showFullScreenJoin='48' annotationJoin='45' fullscreenJoin='47'
                powerOff='258' powerOn='259' upJoin='263' downJoin='262' showDisplayModalJoin='37' closeDisplayModalJoin='38'/>
        </div>

        {/* Source Select Menu Right */}
        <div className="col-2 d-flex flex-column text-start p-0 sourceSelectMenu" >
            {showDesktop &&
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 1) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2('430', 1)}>
                    <i className="bi bi-pc-display me-1"></i> Resident Computer
                </button>}
            {showLaptop && 
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 2) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2('431', 2)}>
                    <i className="bi bi-laptop me-1"></i> Laptop and Other Sources
                </button>}
            {showWireless &&
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 3) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2('432', 3)}>
                    <img className="containter-fluid me-1" src={WirelessIcon} alt='Wireless icon'
                    style={{width:'var(--font-size-3'}}></img> Wireless with Solstice
                </button>}
            {showConfCall && 
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 6) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2('435', 6)}>
                    <i className="bi bi-telephone me-1"></i> Conference Call
                </button>}
            {showDocCam && 
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 5) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2('434', 5)}>
                    <i className="bi bi-journal-text me-1"></i> Document Camera
                </button>}
            {showBluray &&
                <button type="button"
                    className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 4) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2('433', 4)}>
                    <i className="bi bi-disc me-1"></i> Blu-Ray
                </button>}
        </div>
        </div>
  );
};

export default SourceMenus;
