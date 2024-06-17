import React from 'react';
import { useState, useEffect } from "react";
import WirelessIcon from './Icons/Wireless with Solstice Icon.svg';
import DisplayArea from './DisplayArea';
import { CrSignalNames, CrSignalType } from './CrSignals';
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
    const [hasDisplay2, setHasDisplay2] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowDesktop, value=> setShowDesktop(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowLaptop, value=> setShowLaptop(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowWireless, value=> setShowWireless(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowBluray, value=> setShowBluray(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowDocCam, value=> setShowDocCam(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.ShowConfCall, value=> setShowConfCall(value));
        window.CrComLib.subscribeState(CrSignalType.Number, CrSignalNames.Source_Display1, value => setSource1(value));
        window.CrComLib.subscribeState(CrSignalType.Number, CrSignalNames.Source_Display2, value => setSource2(value));
        window.CrComLib.subscribeState(CrSignalType.Boolean, CrSignalNames.HasDisplay2, value => setHasDisplay2(value))
        
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
          const spinner = document.getElementById('loading-spinner');
          if (spinner) {
            spinner.style.display= 'none'
          }
        }, 2000);
        return () => clearTimeout(timer);
      })

    const handleSourceSelected1 = (joinNumber,sourceId) => {
        setSelectedButton(true);
        if (joinNumber !== inputSelected1) {
            if (inputSelected1 === ''){
                setInputSelected1(`${joinNumber}`);
                setSource1(sourceId);
                window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
                window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
                console.log(`signal sent to join number: ${joinNumber}`)
            } else {
                console.log(`transfering signal from: ${inputSelected1} to ${joinNumber}` )
                setInputSelected1(`${joinNumber}`);
                setSource1(sourceId);
                window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
                window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
                console.log(`signal sent to join number: ${joinNumber}`)   
            }
        } 
    }
    const handleSourceSelected2 = (joinNumber,sourceId) => {
        setSelectedButton(true);
        if (joinNumber !== inputSelected2) {
            if (inputSelected2 === ''){
                setInputSelected2(`${joinNumber}`);
                setSource2(sourceId);
                window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
                window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
                console.log(`signal sent to join number: ${joinNumber}`)
            } else {
                console.log(`transfering signal from: ${inputSelected2} to ${joinNumber}` )
                setInputSelected2(`${joinNumber}`);
                setSource2(sourceId);
                window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, true);
                window.CrComLib.publishEvent(CrSignalType.Boolean, `${joinNumber}`, false);
                console.log(`signal sent to join number: ${joinNumber}`)   
            }
        } 
    }

    // const toggleDisplay = (display) => {
    //     window.CrComLib.publishEvent(CrSignalType.Boolean, `${display}`, true);
    //     window.CrComLib.publishEvent(CrSignalType.Boolean, `${display}`, false);
    //     console.log('source sent to projector')
    // }    

    return (
        <div className='text-bg-light px-0'>
            {!showLaptop ?
                
                <div id="loading-spinner" className="position-absolute top-50 start-50 translate-middle">
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                 :
            <div className="position-relative col-12 d-flex flex-row text-bg-light px-0 bodyContainer text-white">
            {/* Source Select Menu Left */}
            <div className="col-2 d-flex flex-column text-start p-0 sourceSelectMenu text-dark">
                {showDesktop &&
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 1) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1(CrSignalNames.Source_Desktop_Display1, 1)}>
                        <i className="bi bi-pc-display me-1"></i> Resident Computer
                    </button>}
                {showLaptop &&
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 2) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1(CrSignalNames.Source_Laptop_Display1, 2)}>
                        <i className="bi bi-laptop me-1"></i> Laptop and Other Sources
                    </button>}
                {showWireless && 
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 3) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1(CrSignalNames.Source_Wireless_Display1, 3)}>
                        <img className="containter-fluid me-1" src={WirelessIcon} alt='Wireless icon'
                        style={{width:'var(--font-size-3'}}></img> Wireless with Solstice
                    </button>}
                {showConfCall && 
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 6) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1(CrSignalNames.Source_ConfCall_Display1, 6)}>
                        <i className="bi bi-telephone me-1"></i> Conference Call
                    </button>}
                {showDocCam &&
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 5) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1(CrSignalNames.Source_DocCam_Display1, 5)}>
                        <i className="bi bi-journal-text me-1"></i> Document Camera
                    </button>}
                {showBluray && 
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source1 === 4) ? 'sourceSelectActiveLeft' : 'sourceSelectButtonLeft'}`} onClick={() => handleSourceSelected1(CrSignalNames.Source_Bluray_Display1, 4)}>
                        <i className="bi bi-disc me-1"></i> Blu-Ray
                    </button>}
            </div>
            
            {/* Display Area Left */}
            <div className={`col d-flex flex-column  border-dark p-0 m-0 align-items-start text-dark ${hasDisplay2 ? 'border-end' : ''}`}>
                <DisplayArea sourceSelected={source1} displayJoin={CrSignalNames.Mute_Display1} side={hasDisplay2 ? 'left' : ''}
                    showAnnotationJoin={CrSignalNames.ShowAnnotation_Display1} showFullScreenJoin={CrSignalNames.ShowFullScreen_Display1} annotationJoin={CrSignalNames.HandleAnnotation_Display1} fullscreenJoin={CrSignalNames.HandleFullScreen_Display1}
                    powerOff={CrSignalNames.PowerOff_Display1} powerOn={CrSignalNames.PowerOn_Display1} upJoin={CrSignalNames.Screen_Up_Display1} downJoin={CrSignalNames.Screen_Down_Display1} showDisplayModalJoin={CrSignalNames.ShowDisplayModal_Display1} 
                    closeDisplayModalJoin={CrSignalNames.CloseDisplayModal_Display1} electricScreenJoin={CrSignalNames.IsElectricScreen_Display1} displayIsProjectorJoin={CrSignalNames.Is_Projector_Display1}/>
            </div>
            {/* Display Area Right */}
            {hasDisplay2 &&
                <div className="col p-0 m-0 text-dark">
                    <DisplayArea sourceSelected={source2} displayJoin={CrSignalNames.Mute_Display2} side='right' 
                        showAnnotationJoin={CrSignalNames.ShowAnnotation_Display2} showFullScreenJoin={CrSignalNames.ShowFullScreen_Display2} annotationJoin={CrSignalNames.HandleAnnotation_Display2} fullscreenJoin={CrSignalNames.HandleFullScreen_Display2}
                        powerOff={CrSignalNames.PowerOff_Display2} powerOn={CrSignalNames.PowerOn_Display2} upJoin={CrSignalNames.Screen_Up_Display2} downJoin={CrSignalNames.Screen_Down_Display2} showDisplayModalJoin={CrSignalNames.ShowDisplayModal_Display2} 
                        closeDisplayModalJoin={CrSignalNames.CloseDisplayModal_Display2} electricScreenJoin={CrSignalNames.IsElectricScreen_Display2} displayIsProjectorJoin={CrSignalNames.Is_Projector_Display2}/>
                </div>}
            {/* Source Select Menu Right */}
            {
                hasDisplay2 ? 
            <div className="col-2 d-flex flex-column text-start p-0 sourceSelectMenu text-dark" >
                {showDesktop &&
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 1) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2(CrSignalNames.Source_Desktop_Display2, 1)}>
                        <i className="bi bi-pc-display me-1"></i> Resident Computer
                    </button>}
                {showLaptop && 
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 2) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2(CrSignalNames.Source_Laptop_Display2, 2)}>
                        <i className="bi bi-laptop me-1"></i> Laptop and Other Sources
                    </button>}
                {showWireless &&
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 3) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2(CrSignalNames.Source_Wireless_Display2, 3)}>
                        <img className="containter-fluid me-1" src={WirelessIcon} alt='Wireless icon'
                        style={{width:'var(--font-size-3'}}></img> Wireless with Solstice
                    </button>}
                {showConfCall && 
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 6) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2(CrSignalNames.Source_ConfCall_Display2, 6)}>
                        <i className="bi bi-telephone me-1"></i> Conference Call
                    </button>}
                {showDocCam && 
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 5) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2(CrSignalNames.Source_DocCam_Display2, 5)}>
                        <i className="bi bi-journal-text me-1"></i> Document Camera
                    </button>}
                {showBluray &&
                    <button type="button"
                        className={`btn col border-0 border-bottom border-dark font-size-2 font-size-3-xl p-0 py-1 py-xl-2 ${(source2 === 4) ? 'sourceSelectActiveRight' : 'sourceSelectButtonRight'}`} onClick={() => handleSourceSelected2(CrSignalNames.Source_Bluray_Display2, 4)}>
                        <i className="bi bi-disc me-1"></i> Blu-Ray
                    </button>}
            </div> : <div className="col-2 d-flex flex-column text-start p-0 sourceSelectMenu"></div> }
            </div>}
        </div>
  );
};

export default SourceMenus;